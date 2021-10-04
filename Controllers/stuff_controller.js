const stuffModel = require('../model/stuff_model')
const {STATUS_LOST} = require("../helper/constants");
const regex = require('regex')

/* Post Request Post your Stuff */
exports.createPost = async (req, res) => {
  try {
    const postStuff = await stuffModel.create(req.body)
    res.status(201).send({
      message: 'Post Saved Successfully!',
      postStuff
    })
  } catch
      (error) {
    res.status(400).send({
      error: error
    })
  }
}

/* Get Request Get All Stuff */
exports.getAllStuff = async function (req, res,) {
  try {
    const allStuff = await stuffModel.find()
    if (allStuff.length) {
      res.status(200).send({
        message: 'You have retrieved all your stuff!',
        stuff: allStuff
      })
      return
    }
    res.status(200).send({
      message: 'You have not retrieved all your stuff!'
    })

  } catch
      (error) {
    res.status(400).json({
      error: error
    })
  }
}


/* Get Request Get one Stuff by ID */
exports.getOneStuff = async (req, res) => {
  try {
    const stuff = await stuffModel.findOne({_id: req.params.id})
    if (stuff) {
      res.status(200).send({
        message: 'You have retrieved your one stuff',
        stuff
      })
      return
    }
    res.status(404).send({
      message: 'You have not retrieved your one stuff'
    })

  } catch
      (error) {
    res.status(400).send({
      message: 'No stuff found for you',
      error: error
    })
  }
}

exports.getStuffBy = async (req, res, params) => {
  try {
    console.log('params before change', params)
    for (const [key, value] of Object.entries(params)) {
      console.log('key : ' + key + ' /  value : ' + value)

      switch (key) {
        case 'minPrice':
          if (!params.price) {
            params.price = {"$gt": parseFloat(params.minPrice)}
          } else {
            params.price.$gt = parseFloat(params.minPrice)
          }
          delete params.minPrice
          break
        case 'maxPrice':
          if (!params.price) {
            console.log('enter')
            params.price = {"$lt": parseFloat(params.maxPrice)}
          } else {
            params.price.$lt = parseFloat(params.maxPrice)
          }
          delete params.maxPrice
          break
        case 'city':
          console.log("###city")
          console.log(city);
          params.localisation = params.localisation.find({city: /an/})
          break
      }
    }

    console.log('params before request', params)
    const stuff = await stuffModel.find(params)
    if (stuff.length >= 1) {
      res.status(200).send(stuff)
      return
    }
    res.status(404).send()
  } catch (e) {
    console.error(e)
    res.status(400).send(e.toString())
  }
}

/* Put Request Update your Stuff */
/**
 * Update all stuff by criterion
 * @param req
 * @param res
 */
exports.updateAllStuff = async (req, res) => {
  console.log("updateAllStuff")
  try {
    const updateAllStuff = await stuffModel.updateOne({_id: req.params.id}, req.body)
    res.status(201).send({
      message: 'You have updated all your stuff',
      updateAllStuff
    })
  } catch
      (error) {
    res.status(400).send({
      message: 'You have not updated your stuff',
      error
    })
  }
}

/**
 * Put Request Update Stuff Description
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updateOneStuff = async (req, res) => {

  //TODO : improve and change the stuff depending on the body
  try {
    const updateDescriptionStuff = await stuffModel.findOneAndUpdate({_id: req.params.id}, {description: req.body.description}, {new: true})
    // console.log("###description");
    // console.log(req.body.description);
    res.status(201).send({
      message: 'You have updated one stuff',
      updateDescriptionStuff
    })

  } catch
      (error) {
    res.status(400).send({
      message: 'You have not updated your stuff description',
      error
    })
  }
}

/* Delete Request Delete Stuff by Id */
exports.deleteStuff = async (req, res) => {
  try {
    const deleteStuff = await stuffModel.findOneAndUpdate({_id: req.params.id}, {status: STATUS_LOST})
    res.status(200).send({
      message: 'You have deleted your stuff',
      deleteStuff
    })
  } catch
      (error) {
    res.status(400).send({
      message: 'You have not gotten rid of your stuff',
      error
    })
  }
}