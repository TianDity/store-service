const qiniuConfig = require('../config/qiniuConfig')
const qiniu = require('qiniu')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const { JWT } = require('../config/config')

function upToQiniu (filePath, key) {
  const { accessKey, secretKey } = qiniuConfig
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

  const options = {
    scope: qiniuConfig.scope
  }

  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)

  const config = new qiniu.conf.Config()
  config.zone = qiniu.zone.Zone_z0
  const localFile = filePath
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()

  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
      if (respErr) {
        reject(respErr)
      }
      if (respInfo.statusCode == 200) {
        resolve(respBody)
      } else {
        resolve(respBody)
      }
    })
  })
}


function base64ToFile(base64Data) {
  let split = base64Data.split(',')
  let bytes = window.atob(split[1])

  let fileType = split[0].match(/:(.*?);/)[1]
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type: fileType })
}

function returnInfo(msg, data) {
  if (!data) return msg;

  msg.data = data;
  return msg;
}

function getUploadFilePath() {
  const folderPath = path.resolve(__dirname, '../public/upload');

  const isFile = fileName => {
    return fs.lstatSync(fileName).isFile()
  }

  return fs.readdirSync(folderPath).map(fileName => {
    return path.join(folderPath, fileName)
  }).filter(isFile)
}

function generateToken(user) {
  return jwt.sign(user, JWT.jwtSecret, {
    expiresIn: 259200
  })
}

module.exports = {
  upToQiniu,
  base64ToFile,
  returnInfo,
  getUploadFilePath,
  generateToken
}


