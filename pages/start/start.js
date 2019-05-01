// pages/start/start.js
var config = require("../../utils/config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rippleStyle: ''
  },

  onShow: function(res) {
    var that = this
    wx.login({
      //获取code
      // 此处请求openid要交给后台进行请求
      success: function(res) {
        var code = res.code //返回code
        console.log(code)
        // console.log(config.host)
        var host = config.host + '/openid/getopenid'
        console.log(host)
        wx.request({
          url: config.host + '/openid/getopenid',
          data: {
            code: code
          },
          header: {
            'content-type': 'application/json'
          },      
          success: function(res) {
            var openid = res.data //返回openid
            getApp().globalData.openid = openid
            console.log(openid)
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

  // 波纹效果
  containerTap: function (res) {
    // console.log("111111111111111")
    var that = this
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;
    this.setData({
      rippleStyle: ''
    });
    setTimeout(function () {
      that.setData({
        rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
      });
    }, 200)
  },

  click: function() {
    wx.switchTab({
      url: '/pages/main/main'
    })
  }
})