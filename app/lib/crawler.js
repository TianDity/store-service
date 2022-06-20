const pt = require('puppeteer');
const { CATEGORY } = require('../config/constants'); 

module.exports = async function (options) {
  const bs = await pt.launch({
    ignoreHTTPSErrors: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ]
  });
  const pg = await bs.newPage();
  const url = options.url;
  let productData = null;

  pg.on('response', async response => {
    if (response.url() == 'https://mcsp.midea.com/api/mcsp_ic/item-application-service/mcsp/item/api-product/message/getProdMessage') {
      try {
        let status = await response.status();
        let json = await response.json();
  
        if (status === 200 && json.data) {
          const { product = {}, pImageList = {}, productPacking = {} } = json.data
          productData = {
            product,
            pImageList,
            productPacking,
          }
        }
      } catch (err) {
        
      }
    }
  })

  await pg.goto(url, {
    waitUntil: 'networkidle2'
  })


  const result = await pg.evaluate(options.callback, productData, options.data, CATEGORY);

  await bs.close();

  process.send(result);

  setTimeout(() => {
    process.exit(0);
  }, 1000);
}
