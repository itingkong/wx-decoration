let app = getApp()

Page({
  data: {
    version: app.version(),
    imgUrl: app.globalData.imgUrl,
    commonImg: app.globalData.commonImg,
    commonUrl: app.globalData.commonUrl,
    cityCode:app.globalData.cityCode,
    choose: [],
    vrKitchen: null,
    vrBathroom: null,
    kvSwiper: [
      {
        img: 'banner1.jpg'
      }
    ],
    advantageSwiper: [
      {
        url: 'service-standard',
        img: 'advantage3.jpg',
        title: '优质服务',
        intro: '专人专项省心省力'
      },
      {
        url: 'construct-technology',
        img: 'advantage2.jpg',
        title: '施工工艺',
        intro: '高于行业标准'
      },
      {
        url: 'material-standard',
        img: 'advantage1.jpg',
        title: '严选单品',
        intro: '一线大牌环保健康'
      }
    ],
    team: [
      {
        url: 'team1.jpg',
        title: '高素质施工人员',
        intro: '全方位遮蔽保护，\niColor，让家的改变悄无声息'
      },
      {
        url: 'team2.jpg',
        title: '专业施工督导\n把控施工进程',
        intro: '专业施工督导把控施工进程'
      },
      {
        url: 'team3.jpg',
        title: '安全无小事',
        intro: 'iColor为您扼杀潜在危险，避免\n施工意外'
      },
      {
        url: 'team4.jpg',
        title: '看不见的才最重要',
        intro: 'iColor水电管道多重保护，\n让家无隐患。'
      }
    ],
    standard: [
      {
        url: 'standard1.jpg',
        text: 'iColor独家防水铺贴工艺，由\n表及里不止好看，更实用'
      },
      {
        url: 'standard2.jpg',
        text: '对施工质量高标准严要\n求层层把控，让您放心使用新'
      },
      {
        url: 'standard3.jpg',
        text: '细节决定成败，iColor安装工\n艺让家无可挑剔'
      },
      {
        url: 'standard4.jpg',
        text: '物料清单细致全面，选材明明\n白白，让您一目了然'
      }
    ],
    partner: [
      {url: 'partner1.jpg'},
      {url: 'partner2.jpg'},
      {url: 'partner3.jpg'},
      {url: 'partner4.jpg'},
      {url: 'partner5.jpg'},
      {url: 'partner6.jpg'},
      {url: 'partner7.jpg'},
      {url: 'partner8.jpg'},
      {url: 'partner9.jpg'}
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

    wx.showShareMenu({
      withShareTicket: true
    })

    this.getChoose()
    this.getVrKitchen()
    this.getVrBathroom()
  },
  onReady: function () {
    // 隐藏导航条加载动画
    wx.hideNavigationBarLoading()
  },
  getChoose() {
    let that = this
    let url = `${this.data.commonUrl}/api/v2/icolor/wxma/lives?homePageShow=1`
    wx.request({
      url,
      success(res) {
        that.setData({
          choose: res.data.data
        })
      }
    })
  },
  getVrKitchen() {
    let that = this
    let url = `${this.data.commonUrl}/api/v2/icolor/wxma/experience-halls?homePageShow=1&style=kitchen`
    wx.request({
      url,
      success(res) {
        that.setData({
          vrKitchen: res.data
        })
      }
    })
  },
  getVrBathroom() {
    let that = this
    let url = `${this.data.commonUrl}/api/v2/icolor/wxma/experience-halls?homePageShow=1&style=bathroom`
    wx.request({
      url,
      success(res) {
        that.setData({
          vrBathroom: res.data
        })
      }
    })
  }
})
