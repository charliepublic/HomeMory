// pages/main/main.js


const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveFamily : true,

    //由于测试需要改false为true
    homeNumber :""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户的家庭信息
    console.log(options)
    var openid = app.globalData.openid 
    var homeNumber
    if(options.invited = true){
      homeNumber = options.homeNumber
      console.log("homeNumber 在邀请中获取为"+homeNumber)
    }
    else{
      homeNumber = app.globalData.homeNumber
    }
    if(homeNumber != ""){
      this.setData({
        haveFamily: true,
      })
    var that = this
    wx.request({
      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'www.baidu.com',
      data: {
        openid: that.openid,
        homeNumber:homeNumber
        // homeNumber作为更新或者进入已有家庭
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          // TODO：！！！！！！！！！！！！！
          // 显示家庭人员的信息列表
        })
      }
    })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.hideShareMenu()
    const that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '加入我的家庭吧',
      path: '/pages/main/main?homeNumber=1234567&&invited=true',
      imageUrl:"",
      success: function (res) {
        
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