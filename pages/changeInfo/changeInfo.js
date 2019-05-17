// pages/changeInfo/changeInfo.js
var config = require("../../utils/config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  onShow: function() {
    var openid = getApp().globalData.openid
    this.setData({
      userInfo: getApp().globalData.userInfo
    })
    console.log(this.data.userInfo)
  },


  //提交修改信息函数
  submit: function() {
    var openid = getApp().globalData.openid
    var that = this
    console.log("----------------------------------")
    console.log(openid)
    console.log(that.data)
    console.log("----------------------------------")
    wx.request({
      url: config.host + '/changeInfo',
      method: "POST",
      data: {
        openId: openid,
        age: that.data.userInfo.age,
        userName: that.data.userInfo.nickName,
        location: that.data.userInfo.city,
        homeLand: that.data.userInfo.country
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        wx.showToast({
          title: '修改信息成功',
          icon: 'success',
          duration: 1500 //持续的时间
        })
        wx.navigateBack({})
      },
      fail: function(res) {
        console.log(res)
        console.log("----------上传失败----------")
      }
    })

  },




  /////////////组件绑定函数/////////////////
  setLocation: function(e) {
    this.setData({
      'userInfo.city': e.detail.value
    })
  },

  setHomeland: function(e) {
    this.setData({
      "userInfo.country": e.detail.value
    })
  },

  setName: function(e) {
    this.setData({
      "userInfo.nickName": e.detail.value
    })
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      "userInfo.age": e.detail.value
    })
  },

  /////////////组件绑定函数结束/////////////////

})