import express from 'express'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/auth/signin')
  .post(authCtrl.signin)
router.route('/auth/signout')
  .get(authCtrl.signout)
router.route('/api/forgot-password')
  .put(authCtrl.forgotPassword)
router.route('/api/reset-password')
  .put(authCtrl.resetPassword)
router.route('/api/verify-email')
  .put(authCtrl.verifyEmail)

export default router
