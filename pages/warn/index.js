// pages/warn/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      warnList: [{
          value: "私锁私用",
          checked: false,
          color: "#9dd08"
      },
      {
          value: "车牌缺损",
          checked: false,
          color: "#9dd08"
      },
      {
          value: "轮胎坏了",
          checked: false,
          color: "#9dd08"
      },
      {
          value: "车锁坏了",
          checked: false,
          color: "#9dd08"
      },
      {
          value: "违规乱停",
          checked: false,
          color: "#9dd08"
      },
      {
          value: "密码不对",
          checked: false,
          color: "#9dd08"
      },
      {
          value: "刹车坏了",
          checked: false,
          color: "#9dd08"
      },
      {
          value: "其他故障",
          checked: false,
          color: "#9dd08"
      }],
      picUrls: [],
      actionText:"拍摄/相册",
      btnColor: '#f2f2f2',
      inputValue: {
          num: 0,
          desc:""
      }
  },

    warnListChange(e) {
        this.setData({
            bikeWarnList: e.detail.value
        })
        if(e.detail.value.length !== 0) {
            this.setData({
                btnColor:"#b9dd08"
            })
        }else {
            this.setData({
                btnColor:"#f2f2f2"
            })
        }
    },
    clickPhoto() {
        wx.chooseImage({
            success: (res) => {
                let _picUrls = this.data.picUrls
                for(let temp of res.tempFilePaths) {
                    console.log(temp);
                    _picUrls.push(temp)
                }
                this.setData({
                    picUrls: _picUrls,
                    actionText: "+"
                })
            },
        })
    },
    removePic(e) {
        let index = e.currentTarget.dataset.index
        let _picUrls = this.data.picUrls
        _picUrls.splice(index,1)
        this.setData({
            picUrls: _picUrls
        })
        if(_picUrls.length === 0) {
            this.setData({
                actionText: "拍摄/相册"
            })
        }
    },
    changeNum(e) {
        this.setData({
            inputValue: {
                num: e.detail.value,
                desc:this.data.inputValue.desc
            }
        })
        console.log(this.data.inputValue)
    },
    changeDesc(e) {
        this.setData({
            inputValue: {
                num:this.data.inputValue.num,
                desc: e.detail.value
            }
        })
        console.log(this.data.inputValue)
    },
    submit() {
        if (this.data.picUrls.length > 0 && this.data.bikeWarnList.length > 0) {
            wx.request({
                //因为没有后台接收文件，所以暂时用GET替代POST请求
                url: 'http://localhost/warn.json',
                success(res) {
                    wx.showToast({
                        title: res.data.data.success,
                        icon: "success",
                        duration: 1000
                    })
                    wx.navigateBack({
                        delta: 1
                    })
                }
            })
        }else {
            wx.showModal({
                title:"请填写完整的反馈信息",
                content: ".......",
                confirmText:"继续填写",
                cancelText: "不填",
                success:(res) => {
                    if(res.confirm) {

                    }else {
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                }
            })
        }
    }
})