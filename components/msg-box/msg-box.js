/*
 * text:string,消息提示文本
 * loading:boolean,是否显示loading图标,default:false
 * delay:number,延迟多少时间自动关闭default:2000
 * callback: 回调函数
 * */
let timer = null

function showMsgBox(obj) {
    if (typeof obj === 'object' && obj.text) {
        clearTimeout(timer)

        if (!obj.loading) {
            obj.loading = false
        }
        if (!obj.delay || typeof obj.delay != 'number') {
            obj.delay = 2000
        }
        let that = getCurrentPages()[getCurrentPages().length - 1]
        obj.status = true
        if (obj.delay < 10000) {
            timer = setTimeout(function () {
                obj.status = false
                obj.callback && typeof obj.callback == 'function' && obj.callback()
                that.setData({
                    'showMsgBox.status': obj.status
                })
            }, obj.delay)
        }
        that.setData({
            showMsgBox: obj
        })
    } else {
        console.log('showMsgBox fail:请确保传入的是对象并且text必填')
    }
}
function hideMsgBox() {
    var that = getCurrentPages()[getCurrentPages().length - 1]
    if (that.data.showMsgBox) {
        that.setData({
            'showMsgBox.status': false
        })
    }
}

module.exports = {
    showMsgBox: showMsgBox,
    hideMsgBox: hideMsgBox
}