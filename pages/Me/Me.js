// pages/Me/Me.js
const app = getApp()

Page({
  /*
   * 页面的初始数据
   */
  data: {
    age:"",
    homeland:"",
    location:"",
    record:"",
    openid:"",//用户唯一识别码

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    // 初始化openid
    var openid = app.globalData.openid 
    this.setData({
      openid:openid
    })    
    var that = this
    //获取用户信息
    wx.request({
      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'www.baidu.com',
      data: {
        openid:openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        // TODO：！！！！！！！！！！！！！
        // that.setData({
        //   age: "",
        //   homeland: "",
        //   location: "",
        //   record: "",
        // })
      }
    })
  },

  //跳转修改用户信息页面
  changeInfo:function(){
    wx.navigateTo({
      url: '../changeInfo/changeInfo',
    })
  }
})