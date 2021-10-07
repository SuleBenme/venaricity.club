import express from 'express'
import statsCtrl from '../controllers/fifa21'

const router = express.Router()

router.route('/api/stats')
  .get(statsCtrl.list)


 export default router
