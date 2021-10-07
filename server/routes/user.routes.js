import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import aboutCtrl from '../controllers/about.controller'
const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.route('/api/users/photo/:userId')
  .get(userCtrl.photo, userCtrl.defaultPhoto)
  
router.route('/api/users/defaultphoto')
  .get(userCtrl.defaultPhoto)

router.route('/api/users/follow')
    .put(authCtrl.requireSignin, userCtrl.addFollowing, userCtrl.addFollower)

router.route('/api/users/unfollow')
    .put(authCtrl.requireSignin, userCtrl.removeFollowing, userCtrl.removeFollower)

router.route('/api/users/findpeople/:userId')
   .get(authCtrl.requireSignin, userCtrl.findPeople)

router.route('/api/contact-us')
  .post(userCtrl.contactUs)

router.route('/api/apply')
  .post(userCtrl.apply)

router.route('/api/verify-human')
  .post(userCtrl.validateHuman)

router.route('/api/about')
  .get(aboutCtrl.list)
  .post(aboutCtrl.create)
  .put(aboutCtrl.update)

router.param('userId', userCtrl.userByID)

export default router
