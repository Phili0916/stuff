const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/stuff')
    .then(r => console.log('connected to mongodb'))
    .catch(error => console.error(error.reason, error.message));


const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const stuffRouter = require('./routes/stuff_routes');
const userRouter = require('./routes/user_routes')



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/stuff', stuffRouter);
app.use('/auth', userRouter)

app.use(function(req, res, next){
  res.status(404).send({message : 'route not found'})
})

module.exports = app;
