const { WEIXIN, JWT } = require('../config/config')
const axios = require('axios')
const { generateToken, returnInfo } = require('../utils/tools')
const { addUserData } = require('../services/user')
const { WECHAT } = require('../config/error_config')
const jwt = require('jsonwebtoken')


class Wechat {
  async login(ctx, next) {
    const data = ctx.request.body;
    const queryString = `appid=${WEIXIN.appId}&secret=${WEIXIN.appSecret}&js_code=${data.code}&grant_type=authorization_code`;
    const wxAPI = `${WEIXIN.api}${queryString}`;

    axios.get(wxAPI)
          .then(response => {
            if (response.data.errorcode) {
              ctx.body = returnInfo(WECHAT.LOGIN_INVALID, response.data)
            }

            if (response.data.openid) {
              const openid = response.data.openid;

              let res = {
                openid,
                token: generateToken({ openid, })
              }

              try {
                const result = await addUserData({ openid })

                if (result) {
                  ctx.body = returnInfo(WECHAT.LOGIN_SUCCESS, res)
                } else {
                  ctx.body = returnInfo(WECHAT.LOGIN_FAIL)
                }
              } catch (err) {
                console.log(err)
              }
            }
          }).catch((err) => console.log(err))
  }

  async checkToken(ctx, next) {
    let token = ctx.headers.token;

    if (token) {
      jwt.verify(token, JWT.jwtSecret, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            ctx.body = returnInfo(WECHAT.AUTH_INVALID)
          } else {
            ctx.body = returnInfo(WECHAT.AUTH_FAIL)
          }
        } else {
          ctx.body = returnInfo(WECHAT.AUTH_SUCCESS)
        }
      })
    } else {
      ctx.body = returnInfo(WECHAT.AUTH_MISSING)
    }
  }
} 


module.exports = new Wechat()
