// pages/main/main.js


const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveFamily : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    //获取用户的家庭信息
    var openid = app.globalData.openid 
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
        if(res != ""){
            that.setData({
              haveFamily: true
            })
        }

        // TODO：！！！！！！！！！！！！！

        //针对获取的信息对于家庭信息的一个管理
      }
    })
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

  createNewFamily:function(options){
    wx.navigateTo({
      url: '../newFamily/newFamily',
    })
  }
})