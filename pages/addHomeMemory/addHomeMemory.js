// pages/addHomeMemory/addHomeMemory.js

var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  upload:function(){
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            user: 'test'
          },
          success(res) {
            const data = res.data
            // do something
          }
        })
      }
    })
  },

  submit: function () {
    var openid = getApp().globalData.openid
    var that = this
    wx.request({

      // TODO：！！！！！！！！！！！！！
      // 修改url

      url: 'www.baidu.com',
      data: {
        // TODO：！！！！！！！！！！！！！
        //添加其他相对应键值对
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        var Time = util.formatTime(new Date());
        console.log(Time)
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1500//持续的时间
        })
        wx.navigateBack({

        })
      }
    })
  }
})