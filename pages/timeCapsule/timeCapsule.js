// pages/timeCapsule/timeCapsule.js
// 导入工具包格式化时间
var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"",
    timeTxt:"",
    timeCapsuleList:[0,1,2,3,4,5,6]
    //此处响应要做修改
      },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DATE = util.formatDate(new Date());
    var openid = getApp().globalData.openid 
    this.setData({
      date: DATE,
      //获取当前时间，用于返回后台计算剩余多少天可以打开
    });

    wx.request({

      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'www.baidu.com',
      data: {
        openid: openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        
         // TODO：！！！！！！！！！！！！！
      // 加载以往时光胶囊信息
      }
    })
  },
  setTimeTxt:function(e){
    this.setData({
      timeTxt:e.detail.value
    })
  },
  submit:function(){
    var openid = getApp().globalData.openid 
    var that = this
    console.log(this.data.timeTxt)
    wx.request({

      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'www.baidu.com',
      data: {
        openid: openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: '提交胶囊成功',
          icon: 'success',
          duration: 1500//持续的时间
        })
        that.setData({
          // timeCapsuleList:
        })
      }
    })
  },
  // 修改页面显示时间
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },




  delet: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认要删除此条信息么？',
      success: function (res) {
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
            success: function (res) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1500//持续的时间
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

})