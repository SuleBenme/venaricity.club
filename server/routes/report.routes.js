import express from 'express'
import taskCtrl from '../controllers/report.controller'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/report')
  .post(taskCtrl.create)
  .get(taskCtrl.list)
  .delete(taskCtrl.remove)

router.route('/api/report/complete')
  .put(taskCtrl.complete) 

export default router