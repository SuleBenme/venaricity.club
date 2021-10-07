import express from 'express'
import tournamentCtrl from '../controllers/tournament.controller'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import groupChatCtrl from '../controllers/groupChat.controller'

const router = express.Router()

router.route('/api/admin/tournament')
  .post(authCtrl.requireSignin, userCtrl.isManager, tournamentCtrl.create)
  .get(authCtrl.requireSignin, userCtrl.isManager, tournamentCtrl.list)
  .delete(authCtrl.requireSignin, userCtrl.isManager, tournamentCtrl.remove)
router.route('/api/tournaments')
  .get(tournamentCtrl.list)

router.route('/api/tournaments/prueba')
  .put(tournamentCtrl.addParticipant)

router.route('/api/tournaments/:tournamentId')
  .get(tournamentCtrl.read)

router.route('/api/tournaments/groupChat')
  .get(groupChatCtrl.list)
  .put(groupChatCtrl.comment)

//router.route('/api/create-checkout-session').post(tournamentCtrl.pay)
router.route('/api/tournaments/secret').post(tournamentCtrl.prueba)
router.route('/api/tournaments/confirm-payment').post(tournamentCtrl.confirmPayment)

router.param('tournamentId', tournamentCtrl.tournamentByID)

/*
router.route('/api/admin/news/publish')
  .put(authCtrl.requireSignin, userCtrl.isAdmin, newsCtrl.publish) 

router.route('/api/news/:newsId')
  .get(newsCtrl.read)

router.route('/api/news')
  .get(newsCtrl.listPublished)
  
router.param('newsId', newsCtrl.newsByID)
*/
export default router
