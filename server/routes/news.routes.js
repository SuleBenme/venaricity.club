import express from 'express'
import newsCtrl from '../controllers/news.controller'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/admin/news')
  .post(authCtrl.requireSignin, userCtrl.isManager, newsCtrl.create)
  .get(authCtrl.requireSignin, userCtrl.isManager, newsCtrl.list)
  .delete(authCtrl.requireSignin, userCtrl.isManager, newsCtrl.remove)

router.route('/api/admin/news/publish')
  .put(authCtrl.requireSignin, userCtrl.isManager, newsCtrl.publish) 

router.route('/api/news/:newsId')
  .get(newsCtrl.read)

router.route('/api/news')
  .get(newsCtrl.listPublished)
  
router.param('newsId', newsCtrl.newsByID)

export default router
