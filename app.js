//app.js
App({
  globalData: {
    imgUrl: `https://socialtest.icolor.com.cn/static/images/`,    // 图片链接地址前缀（与移动端路径一致）
    commonImg: `https://socialtest.icolor.com.cn/common/images/`,
    commonUrl: `https://api.icolor.com.cn`
  },
  // 返回并格式化请求数据
  formatRequestData: function (res) {
    let data = res.data
    let newData = data.replace(/\\n/g, '').replace(/^\(/, '')
    let jsonData = newData.substring(0, newData.length - 3)

    return JSON.parse(jsonData)
  },
  // 版本号增加
  version: function () {
    let date = new Date()
    return `?v=${date.getTime()}`
  }
})