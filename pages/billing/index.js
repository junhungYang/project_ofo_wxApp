// pages/billing/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        seconds: 0,
        minutes: 0,
        hours: 0,
        rideState: '正在骑行',
        flag: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            _number: options.number
        })
        let s = 0,
            m = 0,
            h = 0
        this.timer = setInterval(() => {
            if(s < 60) {
                this.setData({
                    seconds: s++
                })
            }else {
                s = 0
                this.setData({
                    seconds: s
                })
                if (m < 59) {
                    this.setData({
                        minutes: ++m
                    })
                } else {
                    m = 0
                    this.setData({
                        minutes: m,
                        hours: ++h
                    })
                }
            }
        }, 1000)
    },
    endride() {
        clearInterval(this.timer)
        this.setData({
            rideState:"本次骑行时间",
            flag: true
        })
    },
    movetoindex() {
        if (this.data.rideState == "本次骑行时间"){
            console.log(1111)
            wx.redirectTo({
                url:'../index/index'
            })
        }else {
            wx.navigateTo({
                url: `../index/index?timer=${this.timer}`
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },
   

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})