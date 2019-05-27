// pages/Me/Me.js
const app = getApp()
var config = require("../../utils/config.js")
Page({
  /*
   * 页面的初始数据
   */
  data: {
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
  },

})