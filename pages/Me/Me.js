// pages/Me/Me.js
const app = getApp()
var config = require("../../utils/config.js")
Page({
  /*
   * 页面的初始数据
   */
  data: {
    openid: app.globalData.openid, //用户唯一识别码
    userInfo: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    var that = this
    var userinfo = getApp().globalData.userInfo
    that.setData({
      userInfo: userinfo
    })
    console.log(that.data.userInfo)
    that.setData({
      name: userinfo.nickName,
      homeland: userinfo.country,
      location: userinfo.city,
    })
  },



  //跳转修改用户信息页面
  changeInfo: function() {
    wx.navigateTo({
      url: '../changeInfo/changeInfo',
    })
  }
})