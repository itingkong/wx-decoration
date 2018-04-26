
let app = getApp()

const CASEURL = 'https://ap.icolor.com.cn/wxjzxcx/test/data/goodsDetails.json'

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

  },
  data: {
    imgUrl: app.globalData.imgUrl,
    name: '姓名:',
    sex: '性别:',
    number: '工号:',
    provice: '所在省份: ',
    city: '所在城市: '
  },
  onLoad: function () {
    console.log(this.data.pageData)
  },
  methods: {
    close: function () {
      this.setData({
        isHide: false,
        pageData: {}
      })
    }
  }
})