// pages/changeInfo/changeInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"",
    name:"",
    location:"",
    homeland:""
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

  setLocation:function(e){
    this.setData({
      location:e.detail.value
    })
  },

  setHomeland:function(e){
    this.setData({
      homeland: e.detail.value
    })
  },

  setName:function(e){
    this.setData({
      name: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  submit:function(){
    var openid = getApp().globalData.openid 
    var that = this
    wx.request({
      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'www.baidu.com',
      data: {
        openid: openid,
        date: that.date,
        name: that.name,
        location: that.location,
        homeland: that.homeland

        // TODO：！！！！！！！！！！！！！

        //添加其他相对应键值对
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: '修改信息成功',
          icon: 'success',
          duration: 1500//持续的时间
        })
        wx.navigateBack({

        })
      }
    })
  }
})