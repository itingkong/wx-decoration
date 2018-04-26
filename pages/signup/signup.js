let app = getApp()
let msgBox = require('../../components/msg-box/msg-box')    //引入消息提醒暴露的接口

const DEVURL = 'qatest'        // 测试环境
const PRODUCTIONURL = 'www'    // 生产环境
const USEURL = PRODUCTIONURL          // 当前使用环境
const VERIFYCODEURL = `https://${USEURL}.icolor.com.cn/captcha/getVerifyCodeToWebChat?d=`   // 验证码url
const SIGNUPURL = `https://${USEURL}.icolor.com.cn/htmlForm/signUpForm`            // 报名接口url

Page({
  data: {
    // 报名参数
    name: '',
    phone: '',
    code: '',
    // 报名能否提交状态
    nameStatus: false,
    phoneStatus: false,
    codeStatus: false,
    // 报名错误信息提示
    nameMsg: '您的称呼不能为空!',
    phoneMsg: '您的手机号码不能为空!',
    codeMsg: '验证码不能为空!',
    // 验证码链接
    verifyCode: '',
    sessionId: '',
    // msgBox
    msgBox: {text: '123', status: true}
  },
  onLoad: function () {
    this._refreshVerifyCode()

    wx.showShareMenu({
      withShareTicket: true
    })
  },
  // 关闭消息提示框
  hidePopup: function () {
    msgBox.hideMsgBox()
  },
  // 姓名验证
  _nameFun: function (e) {
    let tip = e.currentTarget.dataset.placeholder

    this.setData({
      name: e.detail.value
    })

    let reg = this.isNull('name')

    if (reg) {
      this.setData({
        nameStatus: true
      })
    } else {
      this.setData({
        nameStatus: false,
        nameMsg: `${tip}不能为空!`
      })
      msgBox.showMsgBox({
        text: this.data.nameMsg
      })
    }
  },
  // 手机号码验证
  _phoneFun: function (e) {
    let tip = e.currentTarget.dataset.placeholder
    let regPhone = /^1[3|4|5|8][0-9]\d{4,8}$/

    this.setData({
      phone: e.detail.value
    })

    let reg = this.isNull('phone')

    // 非空性验证
    if (reg) {
      this.setData({
        phoneStatus: true
      })
    } else {
      this.setData({
        phoneStatus: false,
        phoneMsg: `${tip}不能为空!`
      })
      msgBox.showMsgBox({
        text: this.data.phoneMsg
      })
      return
    }

    // 正确性验证
    if (regPhone.test(this.data.phone) && this.data.phone.length === 11) {
      this.setData({
        phoneStatus: true
      })
    } else {
      this.setData({
        phoneStatus: false,
        phoneMsg: `${tip}不正确!`
      })
      msgBox.showMsgBox({
        text: this.data.phoneMsg
      })
    }
  },
  // 验证码验证
  _codeFun: function (e) {
    let tip = e.currentTarget.dataset.placeholder

    this.setData({
      code: e.detail.value
    })

    let reg = this.isNull('code')

    // 非空性验证
    if (reg) {
      this.setData({
        codeStatus: true
      })
    } else {
      this.setData({
        codeStatus: false,
        codeMsg: `${tip}不能为空!`
      })
      msgBox.showMsgBox({
        text: this.data.codeMsg
      })
      return
    }

    // 位数校验
    if (this.data.code.length === 4) {
      this.setData({
        codeStatus: true
      })
    } else {
      this.setData({
        codeStatus: false,
        codeMsg: `${tip}长度不正确!`
      })
      msgBox.showMsgBox({
        text: this.data.codeMsg
      })
    }
  },
  // 验证码刷新
  _refreshVerifyCode: function () {
    let that = this
    let codeURL = VERIFYCODEURL + Math.random()

    wx.request({
      url: codeURL,
      success: function (res) {
        let newData = app.formatRequestData(res)
        let code = newData.src
        let sessionId = newData.sessionId
        that.setData({
          verifyCode: `data:image/png;base64,${code}`,
          sessionId: sessionId
        })
      }
    })
  },
  /*
   * 非空校验
   * 传入需要校验的data
   * target: 验证项
   * */
  isNull: function (target) {
    let val = this.data[target]
    let newVal = val.replace(/(^\s*)|(\s*$)/g, "")

    if (newVal.length > 0) {
      return newVal
    }
    return false
  },
  // 报名数据提交,按钮提交
  signup: function () {
    let that = this
    let status = {
      name: this.data.nameStatus,
      phone: this.data.phoneStatus,
      code: this.data.codeStatus
    }

    if (status.name && status.phone && status.code) {
      /*wx.showLoading({
          title: '正在处理中...',
      })*/
      msgBox.showMsgBox({
        loading: true,
        text: '正在处理中...',
        delay: 10000
      })

      wx.request({
        url: SIGNUPURL,
        data: {
          name: `${this.data.name}-JBFX`,
          mobile: this.data.phone,
          verifyCode: this.data.code,
          device: 'MOB',
          site: 'jzxcx'
        },
        header: {
          "Content-Type": "applciation/json",
          "Cookie": `JSESSIONID=${that.data.sessionId}`
        },
        success: function (res) {
          let data = app.formatRequestData(res)
          let status = data.status
          if (status === 'ok') {
            // wx.hideLoading()
            msgBox.hideMsgBox()
            wx.showModal({
              title: data.msg,
              content: '＊我们已收到您的申请信息，\niColor工作人员将在24小时内与\n您联系，请保持手机畅通。',
              showCancel: false,
              success: function (e) {
                if (e.confirm) {
                  wx.navigateBack()
                }
              }
            })
          } else {
            msgBox.showMsgBox({
              text: data.msg
            })
          }
        }
      })
      return
    }

    // 错误提示信息
    let errMsg = ''
    if (!this.data.nameStatus) {
      errMsg = `${this.data.nameMsg}`
    }
    if (!this.data.phoneStatus) {
      if (!this.data.nameStatus) {
        errMsg += `\n${this.data.phoneMsg}`
      } else {
        errMsg += `${this.data.phoneMsg}`
      }
    }
    if (!this.data.codeStatus) {
      if (!this.data.nameStatus || !this.data.phoneStatus) {
        errMsg += `\n${this.data.codeMsg}`
      } else {
        errMsg += `${this.data.codeMsg}`
      }
    }
    msgBox.showMsgBox({
      text: errMsg,
      delay: 3000
    })
  }
})
