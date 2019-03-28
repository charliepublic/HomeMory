//app.js
App({

  globalData:{
    openid:"",
    userInfo: null
  },

  onLaunch: function () {
    
    wx.login({
      //获取code
      //d0c5dcd84878c4f42f00c8cca148f546 secrets
      //wx69327bfafa39d94a appId
      success: function (res) {
        var code = res.code //返回code
        var secrete = "d0c5dcd84878c4f42f00c8cca148f546"
        var appid = "wx69327bfafa39d94a"
        var that  = this
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secrete + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var openid = res.data.openid //返回openid
            var app = getApp();
            app.globalData.openid = openid
          }
        })
      }
    })
  },

})