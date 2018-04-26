let app = getApp();

Page({
  data: {
    imgUrl: app.globalData.imgUrl,
    swiperInfoOne: [
      {
        src: 'standard/s1-1.jpg',
        text: '从与iColor专属家居顾问的初次见面与微笑开始，打\n开新家的大门。不断沟通，深度了解您的各种生活细\n节需求。'
      },
      {
        src: 'standard/s1-2.jpg',
        text: '任何时间，任何方式，任何地点，iColor家居顾问都\n为你而在,随时在线待命。全程竭力服务，为你开启\n崭新生活。'
      }
    ],
    swiperInfoTwo: [
      'standard/s2-1.jpg',
      'standard/s2-2.jpg'
    ]
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
  onLoad: function () {
    // 显示导航条加载动画。
    wx.showNavigationBarLoading()
  },
  onReady: function () {
    // 隐藏导航条加载动画
    wx.hideNavigationBarLoading()
  }
})