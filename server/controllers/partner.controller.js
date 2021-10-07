import Partner from '../models/partner.model'
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
      console.log("Create Partner:")
      let partner = new Partner(fields)
      console.log(partner)

      if(files.image){
        //console.log(files.image)
        await cloud.uploads(files.image.path).then((result) => {
          partner.image = result.url
        })
      }

      try {
        let result = await partner.save()
        console.log(result)
        return res.json(result)
      } catch (err) {
        return res.status(400).json({error: errorHandler.getErrorMessage(err)})
      }
    })
}

const list = async (req, res) => {
    try {
      let partners = await Partner.find().sort({updated: -1}).exec()
      res.json(partners)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}


const remove = async (req, res) => {
  try {
    const id = req.body.partnerId
    console.log(id)
    let partner = await Partner.findById(id).exec()
    if (!partner)
    return res.status('400').json({
      error: "News not found"
    })
    let deletedPartner = await partner.remove()
    res.json(deletedPartner)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const partnerByID = async (req, res, next, id) => {
  try {
    let partner = await Partner.findById(id)

    if (!partner)
      return res.status('400').json({
        error: "Partner not found"
      })
    req.partner = partner
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve partner"
    })
  }
}

const read = (req, res) => {
  return res.json(req.partner)
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

    let partner = await Partner.findById(fields._id).exec()

    if (!partner)
    return res.status('400').json({
      error: "Partner not found"
    })
    partner = extend(partner, fields)

    if(files.image){
      await cloud.uploads(files.image.path).then((result) => {
        partner.image = result.url
      })
    }
    partner.updated = Date.now()

    console.log(partner)

    try {
      await partner.save()
      res.json(partner)
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }})
}

export default {
    create,
    list,
    remove,
    partnerByID,
    read,
    update
}