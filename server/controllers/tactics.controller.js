import Tactics from '../models/tactics.model'
import errorHandler from './../helpers/dbErrorHandler'
import extend from 'lodash/extend'


const list = async (req, res) => {
    try {
      let rules = await Tactics.find()
      res.json(rules)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}

const update = async (req, res) => {
    console.log(req.body)
    const id = req.body._id
    let rule = await Tactics.findById(id).exec()
    if (!rule)
    return res.status('400').json({
      error: "Rule not found"
    })

    let ruleUpdated = rule
    console.log(ruleUpdated[req.body.position])
    
    ruleUpdated[req.body.position][req.body.index].content = req.body.content
    ruleUpdated[req.body.position][req.body.index].specific_position = req.body.specific_position
    console.log(ruleUpdated)

    try {
      await ruleUpdated.save()
      res.json(ruleUpdated)
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}

export default {
    update,
    list
}