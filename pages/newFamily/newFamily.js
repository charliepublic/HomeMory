// pages/newFamily/newFamily.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeName: ""
  },
  homeName(e) {
    this.setData({
      homeName: e.detail.value
    })
  },

  goBack: function(options) {
    var openid = getApp().globalData.openid
    var that = this


    wx.request({
      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'http://10.132.50.248:8777/family/createfamily',
      data: {
        openId: openid,
        homeName: that.data.homeName
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        // 提交成功之后更新数据库，在返回main页面时会重新加载，考虑将onload中内容写到onshow,此处需要返回homeId
        getApp().globalData.homeId = res.data.homeId
        console.log(getApp().globalData.homeId)
        //此处主要对应数据库返回的属性名称homeId!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        wx.showToast({
          title: '创建家庭成功',
          icon: 'success',
          duration: 1500 //持续的时间
        })
        wx.navigateBack({})
      },
      fail: function(res) {
        wx.showToast({
          title: '创建家庭失败',
          icon: 'none',
          duration: 1500 //持续的时间
        })
      }

    })


  },

})