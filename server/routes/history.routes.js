import express from 'express'
import historyCtrl from '../controllers/history.controller'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/history')
  .post(authCtrl.requireSignin, userCtrl.isManager, historyCtrl.create)
  .get(historyCtrl.list)
  .put(authCtrl.requireSignin, userCtrl.isManager, historyCtrl.update)
  .delete(authCtrl.requireSignin, userCtrl.isManager, historyCtrl.remove)

router.route('/api/history/:historyId')
  .get(historyCtrl.read)

router.param('historyId', historyCtrl.historyByID)

export default router
