let app = getApp()

const CASEURL = 'https://ap.icolor.com.cn/wxjzxcx/test/data/caseList.json'

Page({
  data: {
    imgUrl: app.globalData.imgUrl,
    caseList: {}
  },
  // 分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      success: function (res) {
        console.log(res)
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      }
    }
  },
  onLoad: function (option) {
    // 显示导航条加载动画。
    wx.showNavigationBarLoading()

    this.getData()
  },
  onReady: function () {
    // 隐藏导航条加载动画
    wx.hideNavigationBarLoading()
  },
  // 请求案例列表数据
  getData: function () {
    let that = this

    wx.request({
      url: CASEURL,
      success: function (res) {
        let data = res.data

        that.setData({
          caseList: data.studio
        })

        that.setTopText()
      }
    })
  },
  // 设置顶部标题信息
  setTopText: function () {
    let that = this

    wx.setNavigationBarTitle({
      title: that.data.caseList.topText
    })
  }
})