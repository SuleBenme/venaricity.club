import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import playerCtrl from '../controllers/player.controller'
import fifaCtrl from '../controllers/fifa21'

const router = express.Router()

router.route('/api/admin/players')
  .post(authCtrl.requireSignin, userCtrl.isManager, playerCtrl.create)
  .get(authCtrl.requireSignin, userCtrl.isManager, playerCtrl.list)
  .put(authCtrl.requireSignin, userCtrl.isManager, playerCtrl.update)
  .delete(authCtrl.requireSignin, userCtrl.isManager, playerCtrl.remove)

router.route('/api/admin/update-players')
  .get(authCtrl.requireSignin, userCtrl.isManager, fifaCtrl.canAddPlayers)
  .post(authCtrl.requireSignin, userCtrl.isManager, fifaCtrl.addPlayers)

router.route('/api/admin/create-player')
  .post(authCtrl.requireSignin, userCtrl.isManager, fifaCtrl.createPlayer)

router.route('/api/players')
  .get(playerCtrl.listPlayers)

router.route('/api/players/:playerName')
  .get(playerCtrl.read)

router.param('playerName', playerCtrl.playerByNAME)

export default router

