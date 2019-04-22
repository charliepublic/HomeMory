// pages/Me/Me.js
const app = getApp()

Page({
  /*
   * 页面的初始数据
   */
  data: {
    openid: "", //用户唯一识别码
    name: "",
    age: "",
    homeland: "",
    location: "",
    record: "",
    picture: "",
    havePicture: getApp().globalData.havePicture
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    // 初始化openid
    var openid = getApp().globalData.openid
    console.log(openid)
    var that = this
    //获取用户信息
    wx.request({
      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'http://192.168.1.101:8777/getInfo',
      data: {
        wyt: "123123",
        openId: openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          age: res.data.age,
          name: res.data.userName,
          homeland: res.data.homeLand,
          location: res.data.location,
          // record: "",
        })
      }
    })
  },

  //跳转修改用户信息页面
  changeInfo: function() {
    wx.navigateTo({
      url: '../changeInfo/changeInfo',
    })
  }
})