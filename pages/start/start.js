// pages/start/start.js
//导入对于服务器的配置
var config = require("../../utils/config.js")
Page({
  data: {
    rippleStyle: ''
  },
  onShow: function(res) {
    var that = this
    wx.login({
      success: function(res) {
        var code = res.code //返回code  
        var host = config.host + '/openid/getopenid'
        // console.log("----------------------------------")
        // console.log(code)
        // console.log(config.host)
        // console.log(host)
        // console.log("----------------------------------")
        wx.request({
          url: config.host + '/openid/getopenid',
          data: {
            code: code
          },
          header: {
            'content-type': 'application/json'
          },      
          success: function(res) {
            console.log(res)
            var openid = res.data //返回openid
            getApp().globalData.openid = openid
            console.log(openid)
            wx.request({
              url: config.host + '/family/gethomeid',
              data: {
                openId: openid
              },
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                console.log(res)
                if(res.data == -1){
                  getApp().globalData.homeId = null
                }else{
                  getApp().globalData.homeId = res.data
                }
                console.log(" homeID   " +getApp().globalData.homeId)
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