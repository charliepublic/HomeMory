// pages/main/main.js


const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveFamily: false,
    homeName: "我爱李自成",
    homeId: "123456",
    homeMumberList: [1, 2, 3, 4],
    isAdministrator: false
  },


  onLoad: function() {
    console.log("--------------------")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    this.setData({
      haveFamily: false,
      homeId: "",
      homeName: "",
      homeMumberList: []
    })
    //获取用户的家庭信息
    console.log("传入的option是")
    console.log(options)
    var openid = app.globalData.openid
    console.log(openid)
    var homeNumber
    if (options != null) {
      homeNumber = options.homeNumber
      console.log("homeNumber 在邀请中获取为" + homeNumber)
    } else {
      homeNumber = app.globalData.homeId
    }
    if (homeNumber != "" && homeNumber != undefined) {
      this.setData({
        haveFamily: true,
      })
      var that = this
      wx.request({
        // TODO：！！！！！！！！！！！！！
        // 修改url
        url: 'www.baidu.com',
        data: {
          openId: that.openid,
          homeId: homeNumber
          // homeNumber作为更新或者进入已有家庭
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          that.setData({
            // TODO：！！！！！！！！！！！！！
            // 显示家庭人员的信息列表
            // haveFamily: true,
            // homeName: res.data,
            // homeId: res.data,
            // homeMemberList: res.data,
            // isAdministrator: res.data
          })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
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
      imageUrl: "",
      success: function(res) {

      },
      fail: function(res) {
        // 分享失败
        console.log(res)
      }
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
          var list = that.data.timeCapsuleList
          var index = e.currentTarget.dataset.index
          var item = list[index]
          list.splice(index, 1)
          that.setData({
            timeCapsuleList: list
          })

          wx.request({

            // TODO：！！！！！！！！！！！！！
            // 修改url
            url: 'www.baidu.com',
            data: {
              item: item
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

  //创建家庭
  createNewFamily: function(options) {
    if (getApp().globalData.homeId != "" && getApp().globalData.homeId != undefined) {
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

  quit: function() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认要退出该家庭么？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')

          wx.request({
            // TODO：！！！！！！！！！！！！！
            // 修改url
            url: 'www.baidu.com',
            data: {
              openid: that.data.openid,
              isAdministrator: that.data.isAdministrator
            },
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              that.setData({
                haveFamily: false,
                homeId: "",
                homeName: "",
                homeMumberList: []
              })
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
  }
})