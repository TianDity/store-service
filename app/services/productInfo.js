const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class ProductInfoService {
  async addProductInfoData(data) {
    return await prisma.productInfo.create({
      data: data
    })
  }

  async getProductInfoData(data) {
    const { twoCategoryId, brandId } = data;

    return await prisma.productInfo.findMany({
      where: {
        AND: {
          twoCategoryId,
        },
        OR: {
          brandId,
        }
      }
    })
  }

  async getProductDetailData(data) {
    return await prisma.productInfo.findUnique({
      where: {
        productCode: data.productCode
      }
    })
  }
}

module.exports = new ProductInfoService()
