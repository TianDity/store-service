const crawler = require('../lib/crawler');

process.on('message', (data) => {
  crawler({
    url: data.url,
    data,
    callback(productData, data, category) {
      const { price, cost } = data;
      const { product, pImageList } = productData;
      const productName = product.productName || '';
      const productPic = pImageList.filter(item => item.imageKind === 1) || [];
      const productDetail = pImageList.filter(item => item.imageKind === 2) || [];
      const productSubtitle = product.productDesc !== product.productName ? product.productDesc : '';
      const productModel = product.productModel || '';
      const twoCategoryId = product.productType || product.prodName;
      const brandId = product.brand || 'MIDEA';
      const oneCategoryId = category.filter(item => item.includes(twoCategoryId)).flat()[0] || '大家电';
      const productCode = encodeURI(`${twoCategoryId}_${productName}_${productModel}`);

      return {
        productCode,
        productName,
        productSubtitle,
        productModel,
        productPic,
        productDetail,
        oneCategoryId,
        twoCategoryId,
        brandId,
        price: Number(price),
        cost: Number(cost),
        onlyShow: 1
      }
    }
  })
})


