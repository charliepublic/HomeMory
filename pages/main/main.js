// pages/main/main.js

var config = require("../../utils/config.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveFamily: true,
    homeName: "1111111",
    homeId: "1111111",
    homeMemberList: [1, 2, 3, 4, 11, 12, 13, 14],
    isAdministrator: true,
    hidden: false,
    nocancel: false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    if (getApp().globalData.isDebug == false) {
      this.setData({
        haveFamily: false,
        homeId: app.globalData.homeId,
        homeName: "",
        isAdministrator: false,
        homeMumberList: []
      })
    }


    //获取用户的家庭信息
    console.log("传入的option是" + options)
    var openid = app.globalData.openid
    console.log("main 第一次获取openid      " + openid)
    this.setData({
      openId: openid
    })
    var homeNumber
    if (options != null) {
      homeNumber = options.homeNumber
      console.log("homeNumber 在邀请中获取为" + homeNumber)
      if (homeNumber != "" && homeNumber != undefined) {
        var that = this
        console.log("----------------------------------")
        console.log(that.data.openId)
        console.log(homeNumber)
        console.log("----------------------------------")
        wx.request({
          url: config.host + '/family/joinfamily',
          data: {
            openId: that.data.openId,
            homeId: homeNumber
          },
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res)
          }
        })
      }
    } else {
      homeNumber = app.globalData.homeId
      console.log("homeID "+homeNumber)
    }

    //加载家庭信息
    if (homeNumber != "" && homeNumber != undefined) {
      var that = this
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
    if (this.data.isAdministrator == false) {
      wx.showToast({
        title: '您无权删除该成员',
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
          var list = that.data.homeMemberList
          var index = e.currentTarget.dataset.index
          var item = list[index]
          list.splice(index, 1)
          that.setData({
            homeMemberList: list
          })
          console.log("--------------删除家庭成员-----------------")
          console.log(that.data.homeId)
          console.log(item)
          console.log("----------------------------------")
          wx.request({
            url: config.host + '/family/deletemember',
            data: {
              homeId: that.data.homeId,
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
    var openid = getApp().globalData.openid
    console.log(openid)
    wx.showModal({
      title: '提示',
      content: '确认要退出该家庭么？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log("----------------------------------")
          console.log(openid)
          console.log(that.data.homeId)
          console.log(that.data.isAdministrator)
          console.log("----------------------------------")
          wx.request({
            // TODO：！！！！！！！！！！！！！ c此处响应不正确
            // 修改url 并修改响应函数
            url: config.host + '/family/deletemember',
            data: {
              openId: openid,
              homeId: that.data.homeId,
              isQuit: true
            },
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              //全部清空
              that.setData({
                haveFamily: false,
                homeId: "",
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
    if (getApp().globalData.homeId != undefined && getApp().globalData.homeId != "") {
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
    if (this.data.haveFamily) {
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
        path: '/pages/main/main?homeNumber=' + that.data.homeId + '&&invited = true',

        //TODO 添加对应的分享链接的图片
        imageUrl: "",
        success: function(res) {},
        fail: function(res) {}
      }
    } else {
      return
    }

  },


  cancel: function() {
    this.setData({
      hidden: true
    });
  },
})