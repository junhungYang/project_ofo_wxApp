// pages/charge/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindinput(e) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
        this.setData({
            money: e.detail.value
        })
    },200)
  },
  charge() {
    let money = this.data.money
    if(money <= 0 || isNaN(money)) {
        wx.showModal({
            title: '充值失败',
            content: '请正确输入充值金额',
        })
    }else {
        wx.getStorage({
            key: 'chargeMoney',
            success: (res) => {
                console.log(res)
                wx.setStorage({
                    key: 'chargeMoney',
                    data: parseInt(res.data) + parseInt(money),
                })
            },
            fail: () => {
                wx.setStorage({
                    key: 'chargeMoney',
                    data: money
                })
            }
        })
        wx.redirectTo({
            url: '../wallet/index',
        })
    }
  }
})