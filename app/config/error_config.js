module.exports = {
  CRAWLER: {
    CRAWLER_DATA_SUCCESS: {
      error_code: 0,
      error_msg: 'crawler data is success'
    },
    CRAWLER_DATA_FAIL: {
      error_code: -1,
      error_msg: 'crawler data is fail'
    }
  },
  WECHAT: {
    LOGIN_SUCCESS: {
      error_code: 0,
      error_msg: 'login is success'
    },
    LOGIN_FAIL: {
      error_code: 1001,
      error_msg: 'login is fail'
    },
    LOGIN_INVALID: {
      error_code: 1002,
      error_msg: 'code is invalid'
    },
    AUTH_SUCCESS: {
      error_code: 0,
      error_msg: 'auth is success'
    },
    AUTH_FAIL: {
      error_code: 2001,
      error_msg: 'auth is fail'
    },
    AUTH_INVALID: {
      error_code: 2002,
      error_msg: 'auth token is invalid'
    },
    AUTH_MISSING: {
      error_code: 2003,
      error_msg: 'auth token is missing'
    }
  },
  API: {
    GET_DATA_SUCCESS: {
      error_code: 0,
      error_msg: 'get data is success'
    },
    GET_DATA_FAIL: {
      error_code: -1,
      error_msg: 'get data is fail'
    }
  }
}
