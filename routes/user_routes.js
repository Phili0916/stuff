const express = require('express');
const router = express.Router();

const userCtrl = require('../Controllers/user_controllers')
const {body, validationResult} = require('express-validator')
const auth = require("../middleware/auth");
const stuffCtrl = require("../Controllers/stuff_controller");
//const stuffCtrl = require("../Controllers/stuff_controller");

router.post( '/signup',
    userCtrl.signup)


router.post('/login',
    body('email').notEmpty(),
    body('password').notEmpty(),
    (req, res, next) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
      }
      next()
    },
    userCtrl.login)

router.get('/getUser/',
    auth,
    async function (req, res, next) {
      await userCtrl.getUser(req, res)
    }
)

router.get('/getAllUsers',
    auth,
    async function (req, res,next) {
      await userCtrl.getAllUsers(req, res)
    }
)

router.delete('/delete', userCtrl.delete)


module.exports = router
