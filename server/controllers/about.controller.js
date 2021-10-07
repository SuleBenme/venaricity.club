import About from '../models/about.model'
import errorHandler from './../helpers/dbErrorHandler'

const create = async (req, res) => {
  try {
    const about = new About(req.body)
    let result = await about.save()
    res.status(200).json(result)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
    let text = await About.findById('60c34a42db8bd72d34714790').exec()
    if (!text)
        return res.status('400').json({
        error: "About content not found"
    })

    let textUpdated = text
    textUpdated.content = req.body.content
    
    try {
      await textUpdated.save()
      res.json(textUpdated)
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }   
}
  
const list = async (req, res) => {
    try {
      let about = await About.findById('60c34a42db8bd72d34714790')
      res.json(about)
    } catch (err) {
      return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
      })
    }
}

export default {update, list, create}