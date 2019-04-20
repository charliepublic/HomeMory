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
    wx.navigateBack({})
    wx.request({

      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'www.baidu.com',
      data: {
        openId: openid,
        homeName: that.data.homeName
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        // 提交成功之后更新数据库，在返回main页面时会重新加载，考虑将onload中内容写到onshow,此处需要返回homeId
        getApp().data.homeId = res.data.homeId
        //此处主要对应数据库返回的属性名称homeId!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        wx.showToast({
          title: '创建家庭成功',
          icon: 'success',
          duration: 1500 //持续的时间
        })

      }
    })


  },

})