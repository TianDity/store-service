const { upToQiniu } = require('../utils/tools')
const qiniu = require('qiniu')
const fs = require('fs')
const path = require('path')

async function hyxProductInfo(options) {
  const { oneId, twoId, name, subtitle, price, cost, descript, imgPath } = options
  const productCode = encodeURI(`${twoId}_${name}_`);


  let picDep = []

  for (let pat of imgPath) {
    const extName = path.extname(pat);
    const fileName = path.basename(pat, extName);
    const generateKey = `${fileName}-${new Date().getTime()}`;
    try {
      const res = await upToQiniu(pat, generateKey);
      if (res.hash) {
        picDep.push(generateKey);
        fs.unlink(pat, (err) => {
          if (err) throw err;
          console.log(`${pat} was deleted`)
        })
      }
    } catch (err) {

    }
  }

  return {
    productCode,
    productName: name,
    productSubtitle: subtitle,
    descript,
    price: Number(price),
    cost: Number(cost),
    productPic: picDep,
    productDetail: picDep,
    oneCategoryId: oneId,
    twoCategoryId: twoId,
    onlyShow: 1,
  }
} 

module.exports = { 
  hyxProductInfo
}
