// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  click: function() {
    wx.switchTab({
      url: '/pages/main/main'
    })
  }
})