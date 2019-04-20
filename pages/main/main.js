// pages/main/main.js


const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveFamily: false,
    homeName: "我爱李自成",
    homeNumber: "123456"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取用户的家庭信息
    console.log("传入的option是")
    console.log(options)
    var openid = app.globalData.openid
    var homeNumber
    if (options.invited = true) {
      homeNumber = options.homeNumber
      console.log("homeNumber 在邀请中获取为" + homeNumber)


    } else {
      homeNumber = app.globalData.homeNumber
    }
    if (homeNumber != undefined) {
      this.setData({
        haveFamily: true,
      })
      var that = this
      wx.request({
        // TODO：！！！！！！！！！！！！！
        // 修改url
        url: 'www.baidu.com',
        data: {
          openId: that.openid,
          homeNumber: homeNumber
          // homeNumber作为更新或者进入已有家庭
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          that.setData({
            // TODO：！！！！！！！！！！！！！
            // 显示家庭人员的信息列表
          })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.hideShareMenu()
    const that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '加入我的家庭吧',
      path: '/pages/main/main?homeNumber=' + that.data.homeNumber + '&&invited = true',
      imageUrl: "",
      success: function(res) {

      },
      fail: function(res) {
        // 分享失败
        console.log(res)
      }
    }
  },

  // 删除函数
  delet: function(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认要删除此条信息么？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var list = that.data.timeCapsuleList
          var index = e.currentTarget.dataset.index
          var item = list[index]
          list.splice(index, 1)
          that.setData({
            timeCapsuleList: list
          })

          wx.request({

            // TODO：！！！！！！！！！！！！！
            // 修改url
            url: 'www.baidu.com',
            data: {
              item: item
            },
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1500 //持续的时间
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  //创建家庭
  createNewFamily: function(options) {
    wx.navigateTo({
      url: '../newFamily/newFamily',
    })
  },

  quit: function() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认要退出该家庭么？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.setData({
            haveFamily: false,
            homeNumber: ""
          })
          wx.request({
            // TODO：！！！！！！！！！！！！！
            // 修改url
            url: 'www.baidu.com',
            data: {
              openid: that.data.openid
            },
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1500 //持续的时间
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})