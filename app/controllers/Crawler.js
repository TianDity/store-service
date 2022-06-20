const fs = require('fs')
const { startProcess } = require('../lib/utils')
const path = require('path')
const { returnInfo, getUploadFilePath } = require('../utils/tools')
const { hyxProductInfo } = require('../helpers/hyxProductInfo')
const { addProductInfoData } = require('../services/productInfo')
const { CRAWLER } = require('../config/error_config')


class Crawler {
  async crawlerDetail (ctx, next) {
    const data = await ctx.request.body;

    if (data.type === 'meidi') {
      startProcess({
        path: 'detailData',
        data: data,
        async message(data) {
          try {
            const result = await addProductInfoData(data);

            if (result) {
              ctx.body = returnInfo(CRAWLER.CRAWLER_DATA_SUCCESS)
              console.log('Data create success')
            } else {
              ctx.body = returnInfo(CRAWLER.CRAWLER_DATA_FAIL)
              console.log('Data create fail')
            }
          } catch(err) {
            console.log(err)
          }
        },
        async exit(code) {
          console.log(code)
        },
        async error(err) {
          console.log(err)
        }
      })
    }

    if (data.type === 'huoyixia') {
      const { type, ...args } = data;
      const paths = getUploadFilePath();

      try {
        const data = await hyxProductInfo({...args, imgPath: paths})
        const result = await addProductInfoData(data)

        if (result) {
          ctx.body = returnInfo(CRAWLER.CRAWLER_DATA_SUCCESS)
          console.log('Data create success')
        } else {
          ctx.body = returnInfo(CRAWLER.CRAWLER_DATA_FAIL)
          console.log('Data create fail')
        }
      } catch (err) {
        console.log(err)
      }
    }
    
  }
}


module.exports = new Crawler();
