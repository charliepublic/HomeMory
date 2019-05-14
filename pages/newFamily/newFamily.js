// pages/newFamily/newFamily.js

var config = require("../../utils/config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rippleStyle: '',
    homeName: ""
  },


  goBack: function(options) {
    var openid = getApp().globalData.openid
    var that = this

    console.log("----------------------------------")
    console.log(openid)
    console.log(that.data.homeName)
    console.log("----------------------------------")
    wx.request({
      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: config.host + '/family/createfamily',
      data: {
        openId: openid,
        homeName: that.data.homeName
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        getApp().globalData.homeId = res.data
        console.log(getApp().globalData.homeId)
        wx.showToast({
          title: '创建家庭成功',
          icon: 'success',
          duration: 1500 //持续的时间
        })
        wx.navigateBack({})
      },
      fail: function(res) {
        wx.showToast({
          title: '创建家庭失败',
          icon: 'none',
          duration: 1500 //持续的时间
        })
      }

    })


  },

  // 波纹效果
  containerTap: function (res) {
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
  //绑定home的name
  homeName(e) {
    this.setData({
      homeName: e.detail.value
    })
  },
})