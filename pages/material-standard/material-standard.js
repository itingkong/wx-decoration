let app = getApp();
const LISTURL = 'https://ap.icolor.com.cn/wxjzxcx/test/data/strictGoodsList.json'
const DETAILURL = 'https://ap.icolor.com.cn/wxjzxcx/test/data/strictGoodsData.json'

Page({
	data: {
		imgUrl: app.globalData.imgUrl + 'strictGoods',
		goodsList: [], // 列表信息
		detailList: {}, // 商品详细
		singleDetails: {
			showDetails: false, // 是否显示详细信息弹窗
			pageData: {}, //商品所有信息
			slideList: [] // 推荐商品
		} //单个商品信息
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
		wx.showNavigationBarLoading();

		// 加载列表数据
		wx.request({
			url: LISTURL,
			type: 'GET',
			success: function (res) {
				_this.setData({
					goodsList: res.data
				})
			}
		});

		// 获取商品名称
		wx.request({
			url: DETAILURL,
			success: function (res) {
				_this.setData({
					detailList: res.data.strictSelect
				})
				console.log(res.data.strictSelect)
			}
		})
	},
	onReady: function () {
		// 隐藏导航条加载动画
		wx.hideNavigationBarLoading()
	},
	showDetails: function (e) {
		// 获取点击商品的id
		let _id = e.target.dataset.id,
			result = [];

		/*
			推荐商品里面没有产品自身信息
			这里将自身加进去
			部分商品可能不存在推荐商品 需要判断处理
		 */
		result.push({
			id: _id,
			url: _id + '_1'
		})
		if (this.data.detailList[_id].slideList) {
			for (let i of this.data.detailList[_id].slideList) {
				result.push(i)
			}
		}
		this.setData({
			singleDetails: {
				showDetails: true,
				pageData: this.data.detailList[_id],
				slideList: result
			}
		})
	}
})