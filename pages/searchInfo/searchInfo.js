let app = getApp();

const commonUrl = 'https://ap.icolor.com.cn/wxjzxcx/test/data/userList.json'
const DETAILURL = 'https://ap.icolor.com.cn/wxjzxcx/test/data/userData.json'

Page({
	data: {
		imgUrl: app.globalData.imgUrl,
		searchList: {
			isHide: false,
			info: null
		}, // 弹窗数据
		searchDetail: null, // 列表页面 缓存数据
		Detail: null, // 列表页面 查询数据
		inputValue: null
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
		let _this = this;
		// 显示导航条加载动画。
		wx.showNavigationBarLoading()

		// 加载数据
		wx.request({
			url: DETAILURL,
			success: function (res) {

				_this.setData({
					searchDetail: res.data.userData,
					Detail: res.data.userData,
				})
			}
		})
	},
	onReady: function () {
		// 隐藏导航条加载动画
		wx.hideNavigationBarLoading()
	},
	showDetails: function (e) {
		let _id = e.target.dataset.id;
    this.setData({
      searchList: {
        isHide: true,
        info: this.data.searchDetail[_id]
      }
    });
	},
	bindKeyInput: function (e) {
		this.setData({
			inputValue: e.detail.value
		})
	},
	search: function () {
		let result = []
		let data = this.data.searchDetail
		let _val = this.data.inputValue;
		let dataList = Object.keys(this.data.searchDetail)

		dataList.forEach((id) => {
			let name = data[id].name
			if (name.indexOf(_val) > -1) {
				result.push(data[id])
			}
		})

		if (result.length < 1 && !_val) {
			this.setData({
				Detail: this.data.searchDetail
			})
			return
		}

		this.setData({
			Detail: result
		})

	}
})