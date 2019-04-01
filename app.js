//app.js
App({

  globalData:{
    openid:"",
    homeNumber:"",


  },


  onLaunch: function (res) {
    var that = this
    wx.login({
      //获取code
      //d0c5dcd84878c4f42f00c8cca148f546 secrets
      //wx69327bfafa39d94a appId
      success: function (res) {
        var code = res.code //返回code
        var secrete = "d0c5dcd84878c4f42f00c8cca148f546"
        var appid = "wx69327bfafa39d94a"
        
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
    wx.request({

      // TODO：！！！！！！！！！！！！！

      // 修改url
      url: 'www.baidu.com',
      data: {
        openid: that.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          // homeNumber:""

        })
        // TODO：！！！！！！！！！！！！！

      }
    })

    
  },

  // todo:添加检测函数
  checkIsNew: function (openid) {
    return true
  },

})