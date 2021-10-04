const express = require('express');
const router = express.Router();
const mv = require('mv')
//const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png'
}

router.post('/images', async(req, res) =>{
  try {
    if(!req.files) {
      return res.status(404).json ({
        message: 'No File Uploaded'
      })
    } else {
      const file = req.files.file
      mv('../images', file.name)
    }

  }
  catch (e) {
    console.error(error)
  }
})
//const storage = multer.diskStorage({
  //destination: async (req, file) => {
    //await (null, 'images')
  //},
//   filename: async (req, file) => {
//     const name = file.originalname.split(' ').join('_')
//     const extension = MIME_TYPES[file.mimetype]
//     await (null, name + Date.now() + '.' + extension )
//   }
// })

module.exports = multer({storage: storage}).single('image')