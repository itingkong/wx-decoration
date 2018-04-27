let app = getApp();

Page({
  data: {
    imgUrl: app.globalData.imgUrl,
    commonImg: app.globalData.commonImg,
    cityCode:app.globalData.cityCode,
    option: null,
    query: null,
    tabData: null,
    package: {}, // ajax  请求的数据
    details: {},  // 缓存ajax 请求的数据
    pageData: {},  // 缓存页面数据
    result: {},
    tab1: '素雅生活',
    tab2: '百变空间',
    tab3: ' 恬淡雅居',
    tab: false,
    showTag: 1,
  },
  switchTab(e) {  // tab切换  选择 百变空间 && 素雅生活
    let _tag = e.target.dataset.tag,
      _type = e.target.dataset.type;
    this.setData({
      showTag: _tag,
      result: this.data.details[_type]
    })
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
  onLoad: function (options) {
    let _that = this;
    console.log(options)
    _that.setData({
      option: options
    })
    // if (options.type === 'bathroom') {
    //   _that.setData({
    //     tab: true
    //   })
    // } else {
    //   _that.setData({
    //     tab: false
    //   })
    // }
    // 显示导航条加载动画。
    wx.showNavigationBarLoading();

    this.getQuery()
    //ajax请求套餐列表数据列表数据
    wx.request({
      url: `${this.data.commonImg}/api/v2/icolor/wxma/experience-halls?query=${this.data.option.query}&cityCode=${this.data.cityCode}`,
      success: function (res) {
        // _that.setData({
        //   details: res.data[options.type],
        //   pageData: res.data[options.type].life
        // });
        // wx.setNavigationBarTitle({
        //   title: _that.data.details.name
        // })

        // if (options.type === 'bathroom') {
        //   _that.setData({
        //     result: res.data[options.type].life
        //   })
        // } else {
        //   let result = {}
        //   let life = res.data[options.type].life
        //   let space = res.data[options.type].space
        //   result.text = `${life.text}·${space.text}`
        //   result.kv = life.kv
        //   console.log(result.kv)
        //   result.caseList = Object.assign(life.caseList, space.caseList)
        //   console.log(result)
        //   _that.setData({
        //     result: result
        //   })
        // }

        _that.setData({
          result: res.data
        })
      }
    });
  },
  onReady: function () {
    // 隐藏导航条加载动画
    wx.hideNavigationBarLoading()
  },
  getQuery: function(){
    // 获取query

    let that = this;
    wx.request({
      url: `${this.data.commonImg}/api/v2/icolor/wxma/juzhuangsiteconfig?cityCode=${this.data.cityCode}`,
      success: function (res) {
        let styleTags = res.data.styleTags;
        // console.log(styleTags)
        const query = that.data.option.query
        // console.log(query)
        styleTags.map(item => {
          let iType = item.juZhuangType.toLowerCase()
          let supportStyleTags = item.supportStyleTags
          console.log(iType)
          if (query === iType) {
            that.setData({
              query: supportStyleTags
            });
            console.log(that.data.query)
            // this.tabList = item.supportStyleTags
            // this.setBgImage = `${this.tabList[0].code} ${this.type}`
            // this.kvText = this.tabList[0].name
            return false
          }
        })
        // styleTags.map(item => {
        //   let iType = item.juZhuangType.toLowerCase()
        //   if (this.data.option.query === iType) {
        //     this.tabList = item.supportStyleTags
        //     this.setBgImage = `${this.tabList[0].code} ${this.type}`
        //     this.kvText = this.tabList[0].name
        //     return false
        //   }
        // });
        _that.setData(
          // option
        )
      }
    })
  }
})