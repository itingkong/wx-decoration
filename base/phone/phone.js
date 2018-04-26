let app = getApp();

Component({
  data: {
    commonImg: app.globalData.commonImg,
    src: 'service.png',
    phone: '4009210248'
  },
  methods: {
    call: function () {
      wx.makePhoneCall({
        phoneNumber: this.data.phone
      })
    }
  }
})