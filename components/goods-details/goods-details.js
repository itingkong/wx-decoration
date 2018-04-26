let app = getApp()

const CASEURL = 'https://ap.icolor.com.cn/wxjzxcx/test/data/goodsDetails.json'

Component({
  properties: {
    targetId: { // 商品id
      type: String,
      value: '',
      observer: function () {
        let _id = this.data.targetId,
          _that = this;
        wx.request({
          url: CASEURL,
          success: function (res) {
            _that.setData({
              pageData: res.data.goods[_id]
            })
          }
        })
      }
    },
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
    }
  },
  data: {
    imgUrl: app.globalData.imgUrl,
    brand: '品牌: ',
    specifications: '规格: ',
    code: '型号: ',
    colors: '颜色: ',
    thumbList: '可选组合',
  },
  methods: {
    changeGood(e) {
      let _newId = e.target.dataset.id;

      if (_newId === this.data.targetId) {
        return
      }

      this.setData({
        targetId: _newId
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