const express = require('express');
const {body, validationResult} = require('express-validator')
const router = express.Router();
const stuffCtrl = require('../Controllers/stuff_controller')
const auth = require('../middleware/auth')


router.get('/criterion/',
    auth,
    async function (req, res, next) {
        let params = req.query
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

/**
 * Delete stuff (set status to lost)
 */
router.delete('/:id', auth, stuffCtrl.deleteStuff)


module.exports = router;
