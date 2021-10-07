import express from 'express'
import partnerCtrl from '../controllers/partner.controller'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/partners')
  .post(authCtrl.requireSignin, userCtrl.isManager, partnerCtrl.create)
  .get(partnerCtrl.list)
  .delete(authCtrl.requireSignin, userCtrl.isManager, partnerCtrl.remove)
  .put(authCtrl.requireSignin, userCtrl.isManager, partnerCtrl.update)

router.route('/api/partners/:partnerId')
  .get(partnerCtrl.read)

  
router.param('partnerId', partnerCtrl.partnerByID)

export default router
