// pages/timeMachine/timeMachine.js
var config = require("../../utils/config.js")
Page({

  data: {

  },


  onShow: function() {
    var that = this
    var openid = getApp().globalData.openid
    var homeId = getApp().globalData.homeId
    console.log(homeId)
    wx.request({
      //TODO 
      url: config.host + '',
      data: {
        homeId: homeId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
      }
    })
  },

  quit: function() {
    wx.navigateBack({

    })
  }
})