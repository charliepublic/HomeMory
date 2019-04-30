// pages/Me/Me.js
const app = getApp()
var config = require("../../utils/config.js")
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
    picture: "",
    havePicture:false//用于判断用户是否上传图片到服务器
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    // 初始化openid
    var openid = getApp().globalData.openid
    var that = this
    // console.log(openid)
    


    //获取用户信息
    wx.request({
      url: config.host + '/getInfo',
      data: {
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
          //此处对于用户的进行其他键值对的添加
          // picture: "",
          // havePicture: false
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