import express from 'express'
import tacticsCtrl from '../controllers/tactics.controller'

const router = express.Router()

router.route('/api/tactics')
  .get(tacticsCtrl.list)
  .put(tacticsCtrl.update)


 export default router
