let app = getApp()

const DETAILURL = 'https://ap.icolor.com.cn/wxjzxcx/test/data/strictGoodsData.json'

Component({
  properties: {
    isHide: { // 是否隐藏
      type: Boolean,
      value: false
    },
    pageData: { // 页面数据
      type: Object,
      value: {}
    },
    slideList: {
      type: Array,
      value: []
    },
    targetId: {
      type: String,
      value: ''
    }
  },
  data: {
    imgUrl: app.globalData.imgUrl + 'strictGoods',
    brand: '品牌: ',
    specifications: '规格: ',
    code: '型号: ',
    price: '单价: ',
    des: '商品描述',
    thumbList: '商品推荐'
  },
  methods: {
    changeGood(e) {
      let _newId = e.target.dataset.id,
        _data = null,
        _this = this;

      if (_newId === this.data.targetId) {
        return
      }

      wx.request({
        url: DETAILURL,
        success: function (res) {
          _data = res.data.strictSelect[_newId];

          _this.setData({
            targetId: _newId,
            pageData: _data
          })
        }
      })


    },
    closeDetails: function () {
      this.setData({
        pageData: {},
        isHide: false
      })
    }
  }
})