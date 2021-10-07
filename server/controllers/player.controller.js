import Player from '../models/player.model'
import errorHandler from './../helpers/dbErrorHandler'
import extend from 'lodash/extend'
import formidable from 'formidable'
//IMPORT CLOUDINARY CONFIG HERE
import cloud from './../helpers/upload'

const create = async (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }
    let player = new Player(fields)
    
    if(fields.country){
      player.country = JSON.parse(fields.country)
    }
    if(files.image){
      console.log(files.image)
      await cloud.uploads(files.image.path).then((result) => {
        player.image = result.url
      })
    }
    if(fields.specificPosition){
      player.specificPosition = JSON.parse(fields.specificPosition)
    }
    try {
      let result = await player.save()
      console.log(result)
      return res.json(result)
    } catch (err) {
      return res.status(400).json({error: errorHandler.getErrorMessage(err)})
    }
  })
}

const update = async (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }
    console.log(fields)

    let id = fields._id
    let user = await Player.findById(id).exec()
    if (!user)
    return res.status('400').json({
      error: "Player not found"
    })
    let player = user
    //console.log(user)
    player = extend(user, fields)
  
    if(player.country){
      player.country = JSON.parse(fields.country)
    }
    
    if(fields.specificPosition){
      player.specificPosition = JSON.parse(fields.specificPosition)
    }

    if(files.image){
      console.log(files.image)
      await cloud.uploads(files.image.path).then((result) => {
        player.image = result.url
      })
    }
    player.updated = Date.now()
    try {
      await player.save()
      res.json(player)
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }})
  }

  const list = async (req, res) => {
    try {
      let players = await Player.find().select()
      res.json(players)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }

  const listPlayers = async (req, res) => {
    try {
      let players = await Player.find().select()
      res.json(players)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }

const remove = async (req, res) => {
  try {
    let id = req.body.playerId
    let user = await Player.findById(id).exec()
    if (!user)
    return res.status('400').json({
      error: "User not found"
    })
    let player = user
    let deletedPlayer = await player.remove()
    res.json(deletedPlayer)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const playerByNAME = async (req, res, next, name) => {
  try {
    let player = await Player.findOne({name: name})

    if (!player)
      return res.status('400').json({
        error: "Player not found"
      })
    req.player = player
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve player"
    })
  }
}

const read = (req, res) => {
  return res.json(req.player)
}

export default {
    create,
    list,
    update,
    remove,
    listPlayers,
    playerByNAME,
    read
}