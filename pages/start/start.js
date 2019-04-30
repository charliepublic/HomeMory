// pages/start/start.js
var config = require("../../utils/config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onShow: function(res) {
    var that = this
    wx.login({
      //获取code
      // 此处请求openid要交给后台进行请求
      success: function(res) {
        var code = res.code //返回code
        // console.log(code)
        wx.request({
          url: config.host + '',
          data: {
            code:code
          },
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            var openid = res.data.openid //返回openid
            getApp().globalData.openid = openid
            // console.log(openid)
            wx.request({
              // TODO：！！！！！！！！！！！！！
              // 修改url
              url: config.host + '/family/gethomeid',
              data: {
                openId: openid
              },
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                getApp().globalData.homeId = res.data.homeId
              }
            })
          }
        })
      },
      fail: function() {}
    })
  },

  click: function() {

    wx.switchTab({
      url: '/pages/main/main'
    })
  }
})