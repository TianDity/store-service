const { returnInfo } = require('../utils/tools')
const { API } = require('../config/error_config')
const { getProductCategoryData, getHotCategoryData } = require('../services/productCategory')
const { getProductInfoData, getProductDetailData } = require('../services/productInfo')

class Shop {
  async getProductCategoryList(ctx, next) {
    try {
      const data = await getProductCategoryData();

      if (data) {
        ctx.body = returnInfo(API.GET_DATA_SUCCESS, data)
      } else {
        ctx.body = returnInfo(API.GET_DATA_FAIL)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async getProductHotCategoryList(ctx, next) {
    try {
      const data = await getHotCategoryData();

      if (data) {
        ctx.body = returnInfo(API.GET_DATA_SUCCESS, data)
      } else {
        ctx.body = returnInfo(API.GET_DATA_FAIL)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async getProductInfoList(ctx, next) {
    try {
      const query = ctx.request.query;

      if (query) {
        const data = await getProductInfoData(query)

        if (data) {
          ctx.body = returnInfo(API.GET_DATA_SUCCESS, data)
        } else {
          ctx.body = returnInfo(API.GET_DATA_FAIL)
        }
      }     
    } catch (err) {
      console.log(err)
    }
  }

  async getProductDetailList(ctx, next) {
    try {
      const query = ctx.request.query;

      if (query) {
        const data = await getProductDetailData(query)
  
        if (data) {
          ctx.body = returnInfo(API.GET_DATA_SUCCESS, data)
        } else {
          ctx.body = returnInfo(API.GET_DATA_FAIL)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
}


module.exports = new Shop()
