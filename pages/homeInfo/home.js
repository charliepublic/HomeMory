// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchTxt:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  setTxt: function (e) {
    this.setData({
      searchTxt: e.detail.value
    })
  },

  input:function(){
    wx.navigateTo({
      url: '../addHomeMemory/addHomeMemory',
    })
  },
})