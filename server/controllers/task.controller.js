import Task from '../models/task.model'
import errorHandler from './../helpers/dbErrorHandler'
import extend from 'lodash/extend'

const create = async (req, res) => {
    try {
      const task = new Task(req.body)
      let result = await task.save()
      res.status(200).json(result)
    } catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}

const update = async (req, res) => {
  console.log(req.body)
  const id = req.body._id
  let task = await Task.findById(id).exec()
  if (!task)
  return res.status('400').json({
    error: "Task not found"
  })
  let taskUpdated = task
  //console.log(user)
  taskUpdated = extend(task, req.body)
  try {
    await taskUpdated.save()
    res.json(taskUpdated)
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
    
}

const list = async (req, res) => {
    try {
      let tasks = await Task.find({}).sort({completed:1, created:-1})
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
      let task = await Task.findById(id).exec()
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
      let result = await Task.findByIdAndUpdate(id , {completed: req.body.completed}, {new: true})
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
    update
}