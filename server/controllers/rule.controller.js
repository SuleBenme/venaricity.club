import Rule from '../models/rule.model'
import errorHandler from './../helpers/dbErrorHandler'
import extend from 'lodash/extend'
/*
const create = async (req, res) => {
    try {
      const rule = new Rule(req.body)
      let result = await rule.save()
      res.status(200).json(result)
    } catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}

const sort = async  (req, res) => {
  console.log(req.body)
  
  let firstRule = await Rule.findById(req.body.first).exec()
  let secondRule = await Rule.findById(req.body.second).exec()

  firstRule.index = req.body.firstIndex
  secondRule.index = req.body.secondIndex
  console.log(firstRule)
  console.log(secondRule)

  try {
    await firstRule.save()
    await secondRule.save()

    res.json([firstRule, secondRule])
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }

}
*/
const update = async (req, res) => {
  console.log(req.body)
  let rule = await Rule.findById('6022d8e18a035c1304b67a2e').exec()
  if (!rule)
  return res.status('400').json({
    error: "Rule not found"
  })
  let ruleUpdated = rule
  ruleUpdated.content = req.body.content
  
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

const list = async (req, res) => {
    try {
      let rules = await Rule.findById('6022d8e18a035c1304b67a2e')
      res.json(rules)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}
/*
const remove = async (req, res) => {
    console.log(req.body)
    try {
      let rule = await Rule.findById(req.body.ruleId).exec()
      if (!rule)
      return res.status('400').json({
        error: "Rule not found"
      })
      let deletedRule = await rule.remove()
      res.json(deletedRule)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}
*/
export default {
    //create, 
    list,
    //remove,
    update,
    //sort
}