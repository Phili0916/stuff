const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')
const modelUser = require("../model/user_model");
const {PASSWORD_SALT} = require("../helper/constants");


exports.signup = async (req, res) => {
  try {
    const encryptedPassword =  await bcrypt.hash(req.body.password, PASSWORD_SALT)
    const newUser = await modelUser.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: encryptedPassword
    })

    res.status(201).send({
      message: 'User saved successfully',
      newUser
    })

  } catch
      (error) {
    res.status(500).send({
      error: error.toString()
    })
  }
}

/* User Login */
exports.login = async function (req, res) {

  try {
    const user = await modelUser.findOne({email: req.body.email})
    if (!user) {
      res.status(404).send({message: "user not found"})
      return
    }

    const isGoodPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isGoodPassword) {
      res.status(403).send({message: "bad password"})
      return
    }
    const token = jsonWebToken.sign(
        {userId: user._id},
        'Random_Token_Secret',
        {expiresIn: '24h'})
    res.status(200).send({
      userId: user._id,
      token: token
    })
  } catch (e) {
    res.status(500).send({error: e.toString()})
  }
}

/*Get User */

exports.getUser = async (req, res) => {
  let params = req.query
  console.log(params)
  try {
    const user = await modelUser.findOne({_id: req.query.id || ''})

    if (!user) {
      res.status(404).send({message: "user not found"})
      return
    }

    user.password =''
    res.status(200).send({
      message: 'User has been found',
      user : user
    })
  } catch (error) {
    res.status(400).send({
      message: 'No user found',
      error: error.toString()
    })
  }

}

/* Delete User */

exports.delete = async function (req, res) {
  try {
    const deleteUser = await modelUser.deleteOne({_id: req.params.id})
    const userHasBeenDeleted = await res.status(200).send({
      message: 'User has been deleted',
      deleteUser
    })
    return userHasBeenDeleted
  } catch (error) {
    res.status(400).send({
      message: 'You have not deleted the user',
      error
    })
  }
}


