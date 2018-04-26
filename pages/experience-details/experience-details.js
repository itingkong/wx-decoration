let app = getApp();

const CASEURL = 'https://ap.icolor.com.cn/wxjzxcx/test/data/caseDetails.json'

Page({
    data: {
        imgUrl: app.globalData.imgUrl,
        dots: {
            show: true,
            color: '#fff',
            atColor: '#00cacf',
        },
        btn: '立即预约',
        detailsTitle: '物料明细',
        pageInfo: {} // 页面需展示的案例信息
    },
    // 分享
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            success: function(res) {
                console.log(res)
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
                console.log(res)
            }
        }
    },
    onLoad: function (options) {
        // 在当前页面显示导航条加载动画。
        wx.showNavigationBarLoading();
        /*
        * 接收两个信息
        * type: 标明 厨房(kitchen) 还是 卫浴(bathroom)
        * case: 标明 第几套案例，默认按列表顺序排序
        * */

        let _type = options.type,
            _case = options.case;

        this.getData(_type,_case)
    },
    onReady: function () {
        // 隐藏导航条加载动画。
        wx.hideNavigationBarLoading()
    },
    getData: function (_type, _case) { // 请求数据
        let _that = this;
        wx.request({
            url: CASEURL,
            success: function (res) {
                _that.setData({
                    pageInfo: res.data[_type][_case]
                })
            }
        })
    }
})