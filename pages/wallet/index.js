// pages/wallet/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chargeMoney: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
        key: 'chargeMoney',
        success: (res) => {
            this.setData({
                chargeMoney: res.data
            })
        },
    })
  },
  charge() {
      wx.redirectTo({
          url: '../charge/index',
      })
  }
})