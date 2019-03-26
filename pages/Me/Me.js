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
    openid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var openid = app.globalData.openid 
    if(openid ==""){
      var that = this
      wx.login({
        //获取code
        //d0c5dcd84878c4f42f00c8cca148f546 secrets
        //wx69327bfafa39d94a appId
        success: function (res) {
          var code = res.code //返回code
          var secrete = "d0c5dcd84878c4f42f00c8cca148f546"
          var appid = "wx69327bfafa39d94a"
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secrete + '&js_code=' + code + '&grant_type=authorization_code',
            data: {},
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var openid = res.data.openid //返回openid
              var app = getApp();
              app.globalData.openid = openid
              that.openid = openid
              that.setData({
                openid : openid
              })
            }
          })
        },
        fail:function(res){
          console.error("未能获取openid in Me.js")
        }
      })
    }
    //获取用户信息
    wx.request({
      // 修改url
      url: 'www.baidu.com',
      data: {
        openid:openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
      
      }
    })
  },
  /*
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  changeInfo:function(){
    console.log(app.globalData.openid)
  }
})