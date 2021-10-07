import express from 'express'
import ruleCtrl from '../controllers/rule.controller'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/manager/rules')
  //.post(authCtrl.requireSignin, userCtrl.isManager, ruleCtrl.create)
  .get(ruleCtrl.list)
  .put(authCtrl.requireSignin, userCtrl.isManager, ruleCtrl.update)
  //.delete(authCtrl.requireSignin, userCtrl.isManager, ruleCtrl.remove)

router.route('/api/manager/rules/sort')
  //.put(authCtrl.requireSignin, userCtrl.isManager, ruleCtrl.sort)

export default router
