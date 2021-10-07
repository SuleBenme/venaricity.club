import express from 'express'
import taskCtrl from '../controllers/task.controller'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()
/*
router.route('/api/manager/tasks')
  .post(authCtrl.requireSignin, userCtrl.isManager, taskCtrl.create)
  .get(authCtrl.requireSignin, userCtrl.isManager, taskCtrl.list)
  .delete(authCtrl.requireSignin, userCtrl.isManager, taskCtrl.remove)
*/
  
router.route('/api/manager/tasks')
.post(taskCtrl.create)
.get(taskCtrl.list)
.put(taskCtrl.update)
.delete(taskCtrl.remove)

router.route('/api/manager/tasks/complete')
  .put(authCtrl.requireSignin, userCtrl.isManager, taskCtrl.complete) 

export default router
