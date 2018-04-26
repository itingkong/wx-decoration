let app = getApp();

Page({
    data: {
        title: '超强施工团队 / 超高施工标准 / 一体化施工流程',
        mianTitle: '让您0操心，100%放心 !',
        imgUrl: app.globalData.imgUrl,
        construct: [
            {
                src: 'construct/team-1.jpg',
                title: '高素质施工人员，全方位遮蔽保护，iColor让家的改变悄无声息 ',
                des: '15项文明施工规范： 6项成品遮蔽保护标准 ／ 4项材料管理规范 / 施工人员上岗规范 ／ 工地卫生标准   '
            },
            {
                src: 'construct/team-2.jpg',
                title: '专业施工督导把控施工进程，现场交底，确保每个环节顺利进',
                des: '3项工地交底管理规范： 施工前现场交接检查 11项 ／ 现场拆除新建 交底管理3项 ／ 成品保护交底     '
            },
            {
                src: 'construct/team-3.jpg',
                title: '安全无小事，iColor为您扼杀潜在危险，避免施工意外  ',
                des: '19项施工安全管理规范： 施工人员安全管理制度 ／ 安全施工设备标准 ／ 安全作业管理规范 ／ 工地每日巡检     '
            },
            {
                src: 'construct/team-4.jpg',
                title: '看不见的才最重要，iColor水电管道多重保护，让家无隐患 ',
                des: '13项隐蔽工程施工标准： 5大电路施工标准 ／ 6大水路施工标准 ／ 水电隐蔽工程质量拍摄管理 ／ 下水管静音处理工艺      '
            },
            {
                src: 'construct/standard-1.jpg',
                title: 'iColor独家防水铺贴工艺，由表及里，不止好看，更实用  ',
                des: '5项铺贴施工标准： 淋浴房混凝土止水带工艺 ／ 门槛石防潮止水带工艺  ／ 防水施工工序6道 ／ 瓷砖胶施工标准6项 ／ 美缝剂施工标准6项  '
            },
            {
                src: 'construct/standard-2.jpg',
                title: '细节决定成败，iColor安装工艺，让家无可挑剔 ',
                des: '5项安装施工标准： 五金件安装标准 ／ 不锈钢水槽、洁具安装标准 ／  木门安装标准 ／ 地板、踢脚线安装标准 ／ 窗安装标准 '
            },
            {
                src: 'construct/standard-3.jpg',
                title: 'iColor对施工质量高标准严要求，层层把控，让您放心使用新家  ',
                des: '6道施工质量验收: 水电交底验收 / 水压试压验收  /  防水蓄水验收  / 水电隐蔽工程验收15项 / 工程中期质量验收4项 / 铺贴交底验收2项'
            },
            {
                src: 'construct/standard-4.jpg',
                title: '物料清单细致全面，选材明明白白，让您一目了然 ',
                des: '8项竣工物料验收：集成吊顶验收 ／ 浴霸、灯具验收 ／ 淋浴房验收 ／  木门验收 ／ 橱柜验收 ／ 开关面板验收 ／ 洁具、五金验收 / 电器验收'
            }
        ]
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
    onLoad() {
        // 隐藏导航条加载动画
        wx.hideNavigationBarLoading()
    },
    onReady: function () {
        // 隐藏导航条加载动画
        wx.hideNavigationBarLoading()
    }
})