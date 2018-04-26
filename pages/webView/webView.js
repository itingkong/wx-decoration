Page({
    data: {
        type: '',
        style: '',
        case: ''
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
    onLoad(options) {
        // 显示导航条加载动画。
        wx.showNavigationBarLoading()
        
        this.setData({
            type: options.type,
            style: options.style,
            case: options.case
        })

        wx.showShareMenu({
            withShareTicket: true
        })
    },
    onReady: function () {
        // 隐藏导航条加载动画
        wx.hideNavigationBarLoading()
    }
})