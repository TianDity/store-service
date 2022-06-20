const router = require('koa-router')()
const wechatController = require('../controllers/Wechat')

router.prefix('/wechat')

router.post('/login', wechatController.login)
router.post('/auth', wechatController.checkToken)

module.exports = router
