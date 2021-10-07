import History from '../models/history.model'
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
      
      let history = new History(fields)
      console.log(history)

      if(files.image){
        //console.log(files.image)
        await cloud.uploads(files.image.path).then((result) => {
          history.image = result.url
        })
      }

      try {
        let result = await history.save()
        console.log(result)
        return res.json(result)
      } catch (err) {
        return res.status(400).json({error: errorHandler.getErrorMessage(err)})
      }
    })
}

const list = async (req, res) => {
    try {
      let history = await History.find().sort("-created")
      res.json(history)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}


const remove = async (req, res) => {
  try {
    let id = req.body.historyId
    let history = await History.findById(id).exec()
    if (!history)
    return res.status('400').json({
      error: "News not found"
    })
    let deletedHistory = await history.remove()
    res.json(deletedHistory)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
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

    let history = await History.findById(fields._id).exec()

    if (!history)
    return res.status('400').json({
      error: "History not found"
    })
    history = extend(history, fields)

    if(files.image){
      await cloud.uploads(files.image.path).then((result) => {
        history.image = result.url
      })
    }
    history.updated = Date.now()

    try {
      await history.save()
      res.json(history)
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }})
}

const historyByID = async (req, res, next, id) => {
  try {
    let history = await History.findById(id)

    if (!history)
      return res.status('400').json({
        error: "history not found"
      })
    req.history = history
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve history"
    })
  }
}

const read = (req, res) => {
  return res.json(req.history)
}

export default {
    create,
    list,
    remove,
    update,
    historyByID,
    read
}