const bcrypt = require('bcrypt')

const jsonWebToken = require('jsonwebtoken')
const modelUser = require("../model/user_model");

exports.signup = async (req, res) => {
  try {
    const signUp = await bcrypt.hash(req.body.password, 10)
       const hash = (hash) => {
          modelUser.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
          })
        }
    const hashUser = await res.status(201).send({
      message: 'User saved successfully',
      signUp
    })
    return hashUser
  } catch
      (error) {
        res.status(500).send({
          error: error
        })
  }
}

/* User Login */

exports.login = async function (req, res) {
  try {
    console.log(req.body.email)
    console.log(modelUser)
    // const user = await modelUser.findOne({email: req.body.email})
    const user = await modelUser.find({})
    console.log(user);
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
  }
  catch (e) {
    console.error(e)
    res.status(500).send({error : e.toString()})
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