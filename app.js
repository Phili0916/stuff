const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose')

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user:process.env.DB_USER,
  pass: process.env.DB_PASS,
  dbName: 'stuff'
};

const uri = 'mongodb://localhost:27017/stuff?connectTimeoutMS=1000'

mongoose.connect(uri)
    .then(r => console.log('test1'))
    .catch(error => console.error(error.reason, error.message));

console.log('test')

const stuffRouter = require('./routes/stuff_routes');
const userRouter = require('./routes/user_routes')


const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', stuffRouter);
app.use('/auth', userRouter)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(function(req, res, next){
  res.status(404).send({message : 'route not found'})
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({error:'error'});
});

module.exports = app;
