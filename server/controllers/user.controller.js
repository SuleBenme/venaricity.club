import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import profileImage from './../../client/assets/images/profile-pic.png'
import config from './../../config/config'
import sendEmail from './../helpers/sendEmail'
import template from './../helpers/template'
import renderBody from './../helpers/renderBody'
import cloud from './../helpers/upload'
import jwt from 'jsonwebtoken'
import axios from 'axios'

const create = async (req, res) => {
  const user = new User(req.body)
  
  // generate a token with user id and secret
  const emailToken = jwt.sign(
    {email: user.email, iss: "NODEAPI" },
    config.jwtSecret
  )

  user.verifyEmailLink = emailToken

  const emailData = {
    from: "noreply@node-react.com",
    to: user.email,
    subject: "Welcome to Venari City. Verify email!",
    html: renderBody(template(`Welcome ${user.name} to Venari City!`, 
      `Thanks for signing up to keep in touch with us. From now on, you 
    will get regular updates on tournaments and events. 
    Please use the following link to verify your email: http://${req.get('host')}/verify-email/${emailToken}`))
  }

  try {
    await user.save()
    await sendEmail(emailData);
    
    return res.status(200).json({
      message: "Successfully signed up!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

/**
 * Load user and append to req.
 */
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id).exec()
    if (!user)
      return res.status('400').json({
        error: "User not found"
      })
    req.profile = user
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve user"
    })
  }
}

const read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

const list = async (req, res) => {
  try {
    let users = await User.find().select('name photo email updated created')
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      })
    }
    let user = req.profile
    user = extend(user, fields)
    user.updated = Date.now()
    if(files.photo){
      await cloud.uploads(files.photo.path).then((result) => {
        user.photo = result.url
      })
    }
    try {
      await user.save()
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const remove = async (req, res) => {
  try {
    let user = req.profile
    let deletedUser = await user.remove()
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(deletedUser)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const photo = (req, res, next) => {
  if(req.profile.photo.data){
    res.set("Content-Type", req.profile.photo.contentType)
    return res.send(req.profile.photo.data)
  }
  next()
}

const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd()+profileImage)
}

const addFollowing = async (req, res, next) => {
  try{
    await User.findByIdAndUpdate(req.body.userId, {$push: {following: req.body.followId}}) 
    next()
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const addFollower = async (req, res) => {
  try{
    let result = await User.findByIdAndUpdate(req.body.followId, {$push: {followers: req.body.userId}}, {new: true})
                            .populate('following', '_id name')
                            .populate('followers', '_id name')
                            .exec()
      result.hashed_password = undefined
      result.salt = undefined
      res.json(result)
    }catch(err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }  
}

const removeFollowing = async (req, res, next) => {
  try{
    await User.findByIdAndUpdate(req.body.userId, {$pull: {following: req.body.unfollowId}}) 
    next()
  }catch(err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
const removeFollower = async (req, res) => {
  try{
    let result = await User.findByIdAndUpdate(req.body.unfollowId, {$pull: {followers: req.body.userId}}, {new: true})
                            .populate('following', '_id name')
                            .populate('followers', '_id name')
                            .exec() 
    result.hashed_password = undefined
    result.salt = undefined
    res.json(result)
  }catch(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }
}

const findPeople = async (req, res) => {
  let following = req.profile.following
  following.push(req.profile._id)
  try {
    let users = await User.find({ _id: { $nin : following } }).select('name')
    res.json(users)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isAdmin = (req, res, next) => {
  const isAdmin = req.auth && req.auth.educator
    if (!isAdmin) {
    return res.status('403').json({
      error: "User is not an admin"
    })
  }
  next()
}

const isManager = (req, res, next) => {
  //console.log(req.auth)
  const isManager = req.auth && req.auth.manager
    if (!isManager) {
    return res.status('403').json({
      error: "User is not an admin"
    })
  }
  next()
}


const contactUs = async (req, res) => { 
  //console.log(req.body)
  const emailData = {
    from: "noreply@node-react.com",
    to: "venaricity@gmail.com",
    subject: "Someone has sent a contact request",
    html: renderBody(template("Message sent from " + req.body.email , req.body.message ))
  }
  try {
    await sendEmail(emailData);
    
    return res.status(200).json({
      message: "The message was sent successfully!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const apply = async (req, res) => { 
  //console.log(req.body)
  //TO DO ¨
  //I need to create a function that is able to take a object and translate it to string
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      })
    }

    let image;
   
    if(files.image){
      await cloud.uploads(files.image.path).then((result) => {
        image = result.url
        //console.log(result.url)
      })
    }

    const array_result = (Object.entries(fields))

    //console.log(array_result)

    const emailData = {
      from: "noreply@node-react.com",
      to: "venaricity@gmail.com",
      subject: "Someone has sent a trial request",
      html: renderBody(template("Trial request from : " + fields.psn, array_result, image))
    }

    try {
      await sendEmail(emailData);
      
      return res.status(200).json({
        message: "The message was sent successfully!"
      })
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const validateHuman = async (req, res) => {  
  const RECAPTCHA_SERVER_KEY = "6Ld5zCQaAAAAANCMmRJbIEATMgTb5axIorAvE-2G"
  
  const humanKey = req.body.key

  const config = {
    url: 'https://www.google.com/recaptcha/api/siteverify',
    method: 'post',
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "https://www.google.com",
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    },
    params: { secret: RECAPTCHA_SERVER_KEY, response: humanKey}
  }

  console.log(config)


  await axios.request(config)
  .then((response) => {
    if (humanKey === null || !response.data.success) {
      return res.status('400').json({
        error: "YOU ARE NOT A HUMAN."
      })
    }
    console.log(response.data)
    return res.status(200).json({
      message: response.data.success
    })
  })
  .catch(err => {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err.message)
    })
  })
  /*
  // Validate Human
  const isHuman = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    },
    body: `secret=${RECAPTCHA_SERVER_KEY}&response=${humanKey}`
  })
    .then(res => res.json())
    .then(json => json.success)
    .catch(err => {
      throw new Error(`Error in Google Siteverify API. ${err.message}`)
    })
  
  if (humanKey === null || !isHuman) {
    throw new Error(`YOU ARE NOT A HUMAN.`)
  }
  */
  
  // The code below will run only after the reCAPTCHA is succesfully validated.
  /*
  console.log("SUCCESS!")
  try {
    await sendEmail(emailData);
    
    return res.status(200).json({
      message: "The message was sent successfully!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
  */
  
  }
  

export default {
  create,
  userByID,
  read,
  list,
  remove,
  update,
  photo,
  defaultPhoto,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeople,
  isAdmin,
  isManager,
  contactUs,
  validateHuman,
  apply
}
