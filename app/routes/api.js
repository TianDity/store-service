const router = require('koa-router')()
const shopController = require('../controllers/Shop')

router.prefix('/api')

router.get('/product_category_data', shopController.getProductCategoryList)
router.get('/product_hotcategory_data', shopController.getProductHotCategoryList)
router.get('/product_info_data', shopController.getProductInfoList)
router.get('/product_detail_data', shopController.getProductDetailList)

module.exports = router
