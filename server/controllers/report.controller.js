import Report from '../models/report.model'
import errorHandler from './../helpers/dbErrorHandler'


const create = async (req, res) => {
    try {
      const task = new Report(req.body)
      let result = await task.save()
      res.status(200).json(result)
    } catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}

const update = async (req, res) => {

}

const list = async (req, res) => {
    try {
      let tasks = await Report.find({}).sort({completed:1, created:-1})
      res.json(tasks)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}

const remove = async (req, res) => {
    console.log(req.body)
    try {
      let id = req.body.taskId
      let task = await Report.findById(id).exec()
      if (!task)
      return res.status('400').json({
        error: "Task not found"
      })
      let deletedTask = await task.remove()
      res.json(deletedTask)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}

const complete = async (req, res) => {
    console.log(req.body)
    try {
      let id = req.body.taskId
      let result = await Report.findByIdAndUpdate(id , {completed: req.body.completed}, {new: true})
                              .exec()
      res.json(result)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }

export default {
    create, 
    list,
    remove,
    complete,
} 