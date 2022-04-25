//环境变量 MTMC_COOKIE
let cookies = [
];

// 判断环境变量里面是否有ck
if (process.env.MTMC_COOKIE) {
  if (process.env.MTMC_COOKIE.indexOf('&') > -1) {
      console.log(`您的cookie选择的是用&隔开\n`)
      cookies = process.env.MTMC_COOKIE.split('&');
  } else if (process.env.MTMC_COOKIE.indexOf('\n') > -1) {
      console.log(`您的cookie选择的是用换行隔开\n`)
      cookies = process.env.MTMC_COOKIE.split('\n');
  } else {
      cookies = [process.env.MTMC_COOKIE];
  }
}

module.exports = cookies;