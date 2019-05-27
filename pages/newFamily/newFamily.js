// pages/newFamily/newFamily.js

var config = require("../../utils/config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeName: ""
  },


  goBack: function(options) {
    console.log(getApp().globalData.isDebug)
    if (getApp().globalData.isDebug == true) {
      wx.switchTab({
        url: '/pages/main/main'
      })
      return
    } else {

      var openid = getApp().globalData.openid
      var that = this
      // console.log("----------------------------------")
      // console.log(openid)
      // console.log(that.data.homeName)
      // console.log("----------------------------------")
      wx.request({
        url: config.host + '/family/createfamily',
        data: {
          openId: openid,
          homeName: that.data.homeName
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res)
          getApp().globalData.homeId = res.data
          getApp().globalData.manager = openid
          console.log(getApp().globalData.homeId)
          wx.showToast({
            title: '创建家庭成功',
            icon: 'success',
            duration: 1500 //持续的时间
          })
          wx.switchTab({
            url: '/pages/main/main'
          })
        },
        fail: function(res) {
          wx.showToast({
            title: '创建家庭失败',
            icon: 'none',
            duration: 1500 //持续的时间
          })
        }

      })
    }



  },

  //绑定home的name
  homeName(e) {
    this.setData({
      homeName: e.detail.value
    })
  },
})