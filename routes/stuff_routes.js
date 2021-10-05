const express = require('express');
const {body, validationResult} = require('express-validator')
const router = express.Router();
const stuffCtrl = require('../Controllers/stuff_controller')
const auth = require('../middleware/auth')
const ModelStuff = require("../model/stuff_model");


// TODO : GET BY criterion
router.get('/criterion/',
    auth,
    async function (req, res, next) {
        let params = req.query
      console.log("###params");
      console.log(params)
       await stuffCtrl.getStuffBy(req, res, params)
    }
)



/* GET All the Stuff. */
router.get('/',
    auth,
    stuffCtrl.getAllStuff);


/* GET One Stuff */
router.get('/:id',
    auth,
    body('options').isObject(),
    stuffCtrl.getOneStuff)


/* POST Your Stuff */
router.post('/',
    auth,
    body('type').notEmpty(),
    body('title').notEmpty(),
    body('price').notEmpty().isNumeric(),
    (req, res, next) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
      }
      next()
    },
    stuffCtrl.createPost)

router.put('/all/:id', auth, stuffCtrl.updateAllStuff)

/**
 * Update one stuff by its id
 */
router.put('/:id',
    auth,
    // body('options').isObject(),
    (req, res, next) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
      }
      next()
    },
    stuffCtrl.updateOneStuff)

router.delete('/:id', auth, stuffCtrl.deleteStuff)


module.exports = router;
