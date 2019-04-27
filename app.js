//app.js
App({
  globalData: {
    openid: "",
    homeId: "",
    havePicture: false
  },


  onShow: function(res) {
    var that = this
    wx.login({
      //获取code
      // 此处请求openid要交给后台进行请求
      success: function(res) {
        var code = res.code //返回code
        console.log(code)
        var secrete = "d0c5dcd84878c4f42f00c8cca148f546"
        var appid = "wx69327bfafa39d94a"
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secrete + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            var openid = res.data.openid //返回openid
            that.globalData.openid = openid
            console.log(openid)
            wx.request({
              // TODO：！！！！！！！！！！！！！
              // 修改url
              url: 'http://10.132.50.248:8777/family/gethomeid',
              data: {
                openId: openid
              },
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                that.globalData.homeId = res.data.homeId
                that.globalData.havePicture = res.data.havePicture
              }
            })
          }
        })
      },
      fail: function() {}
    })

  }


})