// pages/newFamily/newFamily.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  homeName(e){
    this.setData({
      homeName:e.detail.value
    })
  },

  goBack: function (options){
    var openid = getApp().globalData.openid 
    var that = this
    wx.request({

      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'www.baidu.com',
      data: {
        openid: openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res != "") {
          that.setData({
            haveFamily: true
          })
        }
        wx.showToast({
          title: '创建家庭成功',
          icon: 'success',
          duration: 1500//持续的时间
        })
        wx.navigateBack({

        })
      }
    })
    

  },

})