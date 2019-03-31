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
    
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log('shareMenu share success')
        console.log('分享' + res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    })


    // TODO：！！！！！！！！！！！！！
      // 修改条件
    if (true) {
      wx.request({
        // TODO：！！！！！！！！！！！！！
      // 修改url
        url: "",
        method: 'POST',
        data: {

        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
      })
    }


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
  onShareAppMessage: function (res) {
    const that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '加入我的家庭吧',
      path: '/pages/main/main',

      success: function (res) {
        console.log('res.shareTickets[0]' + res.errMsg)
        wx.getShareInfo({
          shareTicket: res.errMsg,
          success: function (res) { 'success' + console.log(res) },
          fail: function (res) { 'fail' + console.log(res) },
          complete: function (res) { 'complete' + console.log(res) }
        })
        
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },

  
  createNewFamily:function(options){
    wx.navigateTo({
      url: '../newFamily/newFamily',
    })
  }
})