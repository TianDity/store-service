const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class productCategoryService {
  async getProductCategoryData() {
    let data = await prisma.productCategory.findMany();

    let res = data.filter(item => item.categoryLevel === 1)
                  .reduce((pre, cur) => {
                    let id = cur.id;
                    pre[id] = cur;

                    return pre
                  }, {});
    
    data.filter(item => item.categoryLevel === 2)
        .forEach(item => {
          let id = item.parentId;

          if (!res[id]) return;

          if (!res[id].children) {
            res[id].children = []
          }

          res[id].children.push(item)
        })

    return res;
  }

  async getHotCategoryData() {
    return await prisma.productCategory.findMany({
      where: {
        isHot: 1
      }
    })
  }
}

module.exports = new productCategoryService()
