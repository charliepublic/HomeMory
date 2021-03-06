var config = require("../../utils/config.js")
var flag = false
var option = ""
Page({
  data: {
    rippleStyle: '',

  },


  onLoad: function(opt) {
    var count = Object.keys(opt).length;
    if (count == 0) {
      option = ""
    } else {
      option = opt.homeId
    }



  },



  onShow: function(res) {
    var that = this
    wx.login({
      success: function(res) {
        var code = res.code
        wx.request({
          url: config.host + '/openid/getopenid',
          data: {
            code: code
          },
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            // console.log(res)
            var openid = res.data.openId
            var isNew = !Boolean(res.data.tag)
            getApp().globalData.openid = openid
            getApp().globalData.isNew = isNew
            that.gethomeId(openid)


          }
        })
      },
      fail: function() {}
    })
  },


  gethomeId: function(openId) {
    var that = this
    wx.request({
      url: config.host + '/family/gethomeid',
      data: {
        openId: openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (!Boolean(res.data.homeName)) {
          getApp().globalData.homeId = null
          if (Boolean(option)) {
            that.joinFamily(option)
          }
        } else {
          getApp().globalData.homeId = res.data.homeId
          getApp().globalData.homeName = res.data.homeName
          getApp().globalData.manager = res.data.manager
          if (Boolean(option)) {
            wx.showToast({
              title: "如要加入新的家庭请退出当前家庭",
              icon: 'none',
              duration: 1000
            })
          }

        }
        flag = true
      },
      fail: function(res) {

      }
    })
  },

  bindGetUserInfo: function(e) {
    var that = this
    if (flag == true || getApp().globalData.isDebug == true) {
      if (e.detail.userInfo) {
        var userinfo = e.detail.userInfo
        userinfo["age"] = "1008-10-12"
        if (getApp().globalData.isNew == true) {
          that.addUser(userinfo)
        } else {
          userinfo = that.loadUser(userinfo)
        }
        getApp().globalData.userInfo = userinfo
        if (Boolean(getApp().globalData.homeId)) {
          wx.switchTab({
            url: '/pages/main/main'
          })
        } else {
          wx.navigateTo({
            url: '../newFamily/newFamily',
          })
        }
      } else {
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function(res) {}
        });
      }
    }
  },

  loadUser: function(userinfo) {
    wx.request({
      url: config.host + '/getInfo',
      data: {
        openId: getApp().globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        userinfo.age = res.data.age
        userinfo.nickName = res.data.userName
        userinfo.location = res.data.location
        userinfo.country = res.data.homeLand
      }
    })
    return userinfo
  },

  addUser: function(userinfo) {
    var that = this
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
      success: function(res) {},
      fail: function(res) {}
    })
  },

  joinFamily: function(homeId) {
    var that = this
    var homeNumber = homeId
    wx.request({
      url: config.host + '/family/joinfamily',
      data: {
        openId: getApp().globalData.openid,
        homeId: homeNumber
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        if (res.data == "failture") {
          wx.showToast({
            title: "该家庭已解散",
            icon: 'none',
            duration: 1000
          })
          return
        } else {
          getApp().globalData.homeId = homeId
        }
      }
    })

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