import News from '../models/news.model'
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
      let player = new News(fields)

      console.log(player)

      if(files.image){
        //console.log(files.image)
        await cloud.uploads(files.image.path).then((result) => {
          player.image = result.url
        })
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

const list = async (req, res) => {
    try {
      let news = await News.find().sort({created: -1})
      res.json(news)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}

const listPublished = async (req, res) => {
  try {
    let news = await News.find({published: true}).sort({created: -1})
    res.json(news)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const publish = async (req, res) => {
  try {
    let id = req.body._id
    let result = await News.findByIdAndUpdate(id , {published: req.body.published, date: new Date()}, {new: true})
                            .exec()
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


const remove = async (req, res) => {
  try {
    let id = req.body.newsId
    let news = await News.findById(id).exec()
    if (!news)
    return res.status('400').json({
      error: "News not found"
    })
    let deletedNews = await news.remove()
    res.json(deletedNews)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

/**
 * Load course and append to req.
 */
const newsByID = async (req, res, next, id) => {
  try {
    let course = await News.findById(id)

    if (!course)
      return res.status('400').json({
        error: "News not found"
      })
    req.course = course
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve news"
    })
  }
}

const read = (req, res) => {
  return res.json(req.course)
}

export default {
    create,
    list,
    publish,
    remove,
    newsByID,
    read,
    listPublished
}