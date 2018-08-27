//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        flag: true
    },
    //页面开始加载时触发
    onLoad(options) {
        this.timer = options.timer
        //获取地理位置API
        wx.getLocation({
            success: (res) => {
                //在小程序内必须通过this.setData对数据进行改写页面才会重新渲染
                this.setData({
                    latitude: res.latitude,
                    longitude: res.longitude
                })
            },
        })
        //获取设备信息，以设置控件位置
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    //设置地图上的空间
                    controls:[{
                        id:1,
                        iconPath:"/images/location.png",
                        clickable:true,
                        position: {
                            width: 50,  //单位为px
                            height: 50,
                            left: 20,
                            top: res.windowHeight - 80
                        }
                    },{
                        id:2,
                        iconPath:"/images/use.png",
                        clickable: true,
                        position: {
                            width:80,
                            height:80,
                            left: res.windowWidth/2 - 40,
                            top:res.windowHeight - 100
                        }
                    },{
                        id:3,
                        iconPath:"/images/warn.png",
                        clickable: true,
                        position: {
                            width:50,
                            height:50,
                            left: res.windowWidth - 20 - 50,
                            top: res.windowHeight - 80
                        }
                    },{
                        id:4,
                        iconPath:"/images/avatar.png",
                        clickable: true,
                        position: {
                            width: 50,
                            height: 50,
                            left: res.windowWidth - 20 - 50,
                            top: res.windowHeight - 150
                        }
                    },{
                        id:5,
                        iconPath:"/images/marker.png",
                        position: {
                            width: 34,
                            height:50,
                            left:res.windowWidth/2 - 17,
                            top: res.windowHeight/2 - 50
                        }
                    }]
                })
            },
        })
    },
    onShow() {
        //获取map上下文，用于点击location控件时返回当前定位点
        this.mapctx = wx.createMapContext("ofo-map")
    },
    //控件点击回调
    bindcontroltap(e) {
        switch(e.controlId) {
            case 1: 
                this.moveToCenter();
                break;
            case 2:
                //扫码API
                if(this.timer) {
                    wx.navigateBack({
                        url:'../billing/index',
                    })
                    break;
                }
                wx.scanCode({
                    success: () => {
                        //loading框
                        wx.showLoading({
                            title: '正在获取密码',
                        }),
                        //扫码成功后发送ajax,获取后台返回的一个密码
                        wx.request({
                            url:'http://localhost/password.json',
                            success: (res) => {
                                //数据获取成功，取消loading框
                                console.log(res)
                                wx.hideLoading();
                                wx.redirectTo({
                                    url:`../scanResult/index?password=${res.data.data.password}&number=${res.data.data.number}`,
                                    success: () => {
                                        //弹窗API
                                        wx.showToast({
                                            title: '获取密码成功',
                                            duration: 1000
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
                break;
            case 3:
                wx.navigateTo({
                    url: '../warn/index'
                })
                break;
            case 4:
                wx.navigateTo({
                    url: '../my/index',
                })
        }
    },
    //返回当前定位点函数
    moveToCenter() {
        this.mapctx.moveToLocation()
    }
})