const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class UserService {
  async addUserData(data) {
    const res = await prisma.user.findUnique({
      where: {
        openId: data.openid
      }
    })

    if (res) return;

    return await prisma.user.create({
      data: {
        openId: data.openid
      }
    })
  }
}

module.exports = new UserService()
