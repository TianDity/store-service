const router = require('koa-router')();
const crawlerController = require('../controllers/Crawler')

router.prefix('/crawler')

router.post('/detail_data', crawlerController.crawlerDetail)

module.exports = router;
