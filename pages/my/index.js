// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginState:"登录",
    btnType: "primary",
    userMsg: {
        nickName:'未登录',
        userUrl: ''
    }
  },
    login() {
        if(this.data.loginState === "登录"){
            wx.login({
                success: (res) => {
                    wx.getUserInfo({
                        success: (res) => {
                            this.setData({
                                loginState: "退出登录",
                                btnType:'warn',
                                userMsg: {
                                    nickName: res.userInfo.nickName,
                                    userUrl: res.userInfo.avatarUrl
                                }
                            })
                            wx.setStorage({
                                key: 'userInfo',
                                data: {
                                    nickName: res.userInfo.nickName,
                                    userUrl: res.userInfo.avatarUrl
                                }
                            })
                        }
                    })  
                }
            })
        }else {
            wx.removeStorageSync('userInfo');
            this.setData({
                loginState: "登录",
                btnType: "primary",
                userMsg: {
                    nickName: '未登录',
                    userUrl: ''
                }
            })
        }
    },
    myWallet() {
        wx.navigateTo({
            url: '../wallet/index',
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _userInfo = wx.getStorageSync('userInfo')
    console.log(_userInfo)
    if(_userInfo) {
        this.setData({
            loginState: "退出登录",
            btnType: 'warn',
            userMsg: {
                nickName: _userInfo.nickName,
                userUrl: _userInfo.userUrl
            }
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