// pages/start/start.js
//导入对于服务器的配置
var config = require("../../utils/config.js")

Page({
  data: {
    rippleStyle: '',
    flag: false
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
                if (res.data == -1) {
                  getApp().globalData.homeId = null
                } else {
                  getApp().globalData.homeId = res.data
                }
                console.log(" homeID  " + getApp().globalData.homeId)
                that.setData({
                  flag: true
                })
              }
            })
          }
        })
      },
      fail: function() {}
    })
  },




  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      // console.log("用户的信息如下：");
      // console.log(e.detail.userInfo);
      getApp().globalData.userInfo = e.detail.userInfo
      // console.log("用户的信息如下：");
      // console.log(getApp().globalData.userInfo)
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      if (this.data.flag == true || getApp().globalData.isDebug == true) {
        wx.switchTab({
          url: '/pages/main/main'
        })
      }
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },


  // 波纹效果
  containerTap: function(res) {
    var that = this
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;
    this.setData({
      rippleStyle: ''
    });
    setTimeout(function() {
      that.setData({
        rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
      });
    }, 200)
  },
})