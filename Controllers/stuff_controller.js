const stuffModel = require('../model/stuff_model')
const {STATUS_LOST} = require("../helper/constants");

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
    for (const [key, value] of Object.entries(params)) {
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

        case 'address':
        case 'zipcode':
        case 'city':
          params['localisation.' + key] = {$regex: value, $options: 'i'}
          delete params[key]
          break

        case 'description':
          params[key] = {$regex: value, $options: 'i'}
          break

        case 'type':
          params[key] = value
          break

        case 'status':
          params.status = {}
          if (value) {
            params.status.$in = value.split(',')
          }

          if (Object.keys(params.status).length === 0) {
            delete params.status
          }
          break
        case 'category':
          params.category = {}
          if (value) {
            params.category.$in = value.split(',')
          }

          if (Object.keys(params.category).length === 0) {
            delete params.category
          }
          break
        default:
          break
      }
    }

    console.log('params before request', params)
    const stuff = await stuffModel.find(params)
    if (stuff.length >= 1) {
      res.status(200).send({
        message: "Here is your stuff",
        stuff: stuff
      })
      return
    }
    res.status(404).send({stuff: []})
  } catch (e) {
    console.error(e)
    res.status(400).send(e.toString())
  }
}

/**
 * Put Request Update Stuff Description
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updateOneStuff = async (req, res) => {
  try {
    for (const [key, value] of Object.entries(req.body)) {
      switch (key) {
        case 'city':
        case 'zipCode':
        case 'address':
          req.body['localisation.' + key] = value
          break
      }
    }
    const updateStuff = await stuffModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    res.status(201).send({
      message: 'You have updated one stuff',
      updateStuff
    })

  } catch (error) {
    res.status(400).send({
      message: 'You have not updated your stuff description',
      error: error.toString()
    })
  }
}

/* Delete Request Delete Stuff by Id : set status to lost*/
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
