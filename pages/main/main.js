// pages/main/main.js
var config = require("../../utils/config.js")
const app = getApp();
var homeId 
var openid 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveFamily: true,
    homeName: "",
    homeMemberList: [],
    isAdministrator: true,
    nocancel: false
  },



  onShow: function(options) {
    if (getApp().globalData.isDebug == false) {
      this.setData({
        haveFamily: false,
        homeName: "",
        isAdministrator: Boolean(app.globalData.openid == app.globalData.manager),
        homeMumberList: []
      })
      homeId = app.globalData.homeId
      openid = getApp().globalData.openid
    }
    //获取用户的家庭信息
    this.loadFamliy()


  },

  loadFamliy: function() {
    var that = this
    var homeNumber = app.globalData.homeId
    //加载家庭信息
    if (Boolean(homeNumber)) {
      this.setData({
        haveFamily: true,
      })
      wx.request({
        url: config.host + '/family/getfamilymembers',
        data: {
          homeId: homeNumber
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          console.log(res)
          that.setData({
            homeMemberList: res.data
          })
        }
      })
    }
  },


  // 删除函数
  delet: function(e) {
    var that = this
    var list = that.data.homeMemberList
    var index = e.currentTarget.dataset.index
    var item = list[index]
    console.log(item)
    if (openid == item.openId) {
      wx.showToast({
        title: '您不能删除您自己',
        icon: 'none',
        duration: 1500 //持续的时间
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '确认要删除此家庭成员么？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')

          list.splice(index, 1)
          that.setData({
            homeMemberList: list
          })
          console.log("--------------删除家庭成员-----------------")
          console.log(homeId)
          console.log(item)
          console.log("----------------------------------")
          wx.request({
            url: config.host + '/family/deletemember',
            data: {
              homeId: homeId,
              openId: item.openid,
              isQuit: false
              // TODO： 此处可能有bug
            },
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1500 //持续的时间
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  quit: function() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认要退出该家庭么？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log("----------------------------------")
          console.log(openid)
          console.log(homeId)
          console.log("----------------------------------")
          wx.request({
            url: config.host + '/family/deletemember',
            data: {
              openId: openid,
              homeId: homeId,
              isQuit: true
            },
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              //全部清空
              that.setData({
                haveFamily: false,
                homeName: "",
                homeMumberList: []
              })
              app.globalData.homeId = ""
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1500 //持续的时间
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //创建家庭
  createNewFamily: function(options) {
    if (Boolean(getApp().globalData.homeId)) {
      wx.showToast({
        title: '请退出当前家庭',
        icon: 'none',
        duration: 1500 //持续的时间
      })
      return
    }
    wx.navigateTo({
      url: '../newFamily/newFamily',
    })
  },

  /**
   * 用户点击右上角分享
   */

  onShareAppMessage: function(res) {
    const that = this
    if (this.data.haveFamily) {
      wx.showShareMenu({
        withShareTicket: true
      })
      wx.hideShareMenu()
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '加入我的家庭吧',
        path: '/pages/start/start?homeNumber=' + homeId,
        //TODO 添加对应的分享链接的图片
        imageUrl: "",
        success: function(res) {},
        fail: function(res) {}
      }
    } else {
      return
    }

  },

})