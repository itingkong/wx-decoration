let app = getApp();

Page({
	data: {
		imgUrl: app.globalData.imgUrl,
		btn: "立即预约",
		title: {
			details: "套餐物料明细",
			configure: "个性升级配置",
			system: "施工管理体系",
			comment: "用户评论"
		},
		page: {},  // ajax 请求数据
		case: {}, // 本地缓存数据  全部信息
		caseDetails: {},  // 相对应的案例信息
		goodsList: {}, //物料明细
		goodsDetails: [], // 物料详细信息
		goodsAlert: {  //物料明细弹窗
			id: '',
			isHide: false,
			pageData: {},
			slideList: []
		},
		optionsData: {},
		vrType: '',
		vrStyle: '',
		vrCase: ''
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
		// 显示导航条加载动画。
		wx.showNavigationBarLoading();

		let _that = this,
			_type = options.type, // 区分厨房还是卫浴
			_style = options.style,// 区分百变空间 还是素雅生活
			_case = options.case; // 获取详细的case 信息

		// 更新VR参数
		this.setData({
			vrType: _type,
			vrStyle: _style,
			vrCase: _case
		})

		// 根据传递的参数 请求套餐列表数据列表数据
		wx.request({
			url: 'https://ap.icolor.com.cn/wxjzxcx/test/data/packageDetails.json',
			success: function (res) {
				_that.setData({
					case: res.data[_type],
					caseDetails: res.data[_type][_style][_case]
				});

				// 动态设置标题
				wx.setNavigationBarTitle({
					title: _that.data.caseDetails.name
				})
			}
		})

		// 物料明细列表信息
		wx.request({
			url: 'https://ap.icolor.com.cn/wxjzxcx/test/data/goodsList.json',
			success: function (res) {
				_that.setData({
					goodsList: res.data[_type][_style][_case]
				});
			}
		})
		// 物料明细对应商品的详细信息
		wx.request({
			url: 'https://ap.icolor.com.cn/wxjzxcx/test/data/goodsDetails.json',
			success: function (res) {
				let result = [];
				for (let i of _that.data.goodsList) {
					result.push(res.data.goods[i.id])
				}
				_that.setData({
					goodsDetails: result
				});
			}
		})

		// 个性配置列表信息
		wx.request({
			url: 'https://ap.icolor.com.cn/wxjzxcx/test/data/options.json',
			success: function (res) {
				_that.setData({
					optionsData: res.data.goods
				});
			}
		})
	},
	onReady: function () {
		// 隐藏导航条加载动画
		wx.hideNavigationBarLoading()

	},
	showOptionsDetails(e) {
		let id = e.target.dataset.id
		let data = this.data.optionsData
		let result = [];
		result.push({
			id: data[id].id,
			url: data[id].id + '_1'
		})
		this.setData({
			goodsAlert: {
				id: id,
				isHide: true,
				pageData: data[id],
				slideList: result
			}
		})
	},
	showDetails: function (e) {
		let _id = e.target.dataset.id
		let _that = this
		wx.request({
			url: 'https://ap.icolor.com.cn/wxjzxcx/test/data/goodsDetails.json',
			success: function (res) {
				let result = [];
				result.push({
					id: res.data.goods[_id].id,
					url: res.data.goods[_id].id + '_1'
				})

				if (res.data.goods[_id].slideList) {
					for (let i of res.data.goods[_id].slideList) {
						result.push(i)
					}
				}
				_that.setData({
					goodsAlert: {
						id: _id,
						isHide: true,
						pageData: res.data.goods[_id],
						slideList: result
					}
				})
			}
		})
	}
})