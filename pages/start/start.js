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
        var code = res.code
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
            var openid = res.data.openId // //TODO此处需要做调整
            var isNew = !Boolean(res.data.tag)          
            getApp().globalData.openid = openid
            getApp().globalData.isNew = isNew
            // console.log(isNew)
            // console.log(openid)
            wx.request({
              url: config.host + '/family/gethomeid',
              data: {
                openId: openid
              },
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                // console.log(res)
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
    if (this.data.flag == true || getApp().globalData.isDebug == true ){
      if (e.detail.userInfo) {
        var that = this;
        var userinfo = e.detail.userInfo
        userinfo["age"] = "1008-10-12"
        if (getApp().globalData.isNew == true) {
          // console.log("----------------------------------")
          // console.log(getApp().globalData.openid)
          // console.log(userinfo)
          // console.log("----------------------------------")
          wx.request({
            url: config.host + '/changeInfo',
            method: "POST",
            data: {
              openId: getApp().globalData.openid,
              age: userinfo.age,
              userName: userinfo.nickName,
              location: userinfo.city,
              homeLand: userinfo.country,
              avatarUrl: userinfo.avatarUrl
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) { },
            fail: function (res) { }
          })
        } else {

          wx.request({
            url: config.host + '/getInfo',
            data: {
              openId: getApp().globalData.openid
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              userinfo.age = res.data.age
              userinfo.nickName = res.data.userName
              userinfo.location = res.data.location
              userinfo.country = res.data.homeLand
            }
          })
        }
        getApp().globalData.userInfo = userinfo
        console.log("用户的信息如下：");
        console.log(getApp().globalData.userInfo)
        var openid = getApp().globalData.openid
        var that = this


        //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
        if (this.data.flag == true || getApp().globalData.isDebug == true) {
          wx.switchTab({
            url: '/pages/main/main'
          })
        }
      } else {
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function (res) {
            // 用户没有授权成功，不需要改变 isHide 的值
            if (res.confirm) {
              console.log('用户点击了“返回授权”');
            }
          }
        });
      }
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