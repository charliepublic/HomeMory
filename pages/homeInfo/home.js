// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchTxt:"",
    memoryList:[0,1,2,3,4,5,6]
  },
  onLoad: function (options) {
    var openid = getApp().globalData.openid
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
        // 加载以往说说信息即修改memoryList
      }
    })
  },
  setTxt: function (e) {
    this.setData({
      searchTxt: e.detail.value
    })
  },

  input:function(){
    wx.navigateTo({
      url: '../addHomeMemory/addHomeMemory',
    })
  },
  search: function () {
    var openid = getApp().globalData.openid
    var that = this
    wx.request({

      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'www.baidu.com',
      data: {
        openid: openid,
        searchTxt:that.data.searchTxt

      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        // TODO：！！！！！！！！！！！！！
        that.setData({
          // 此处获取返回结果
          // memoryList:""
        })
      }
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
          var list =that.data.memoryList
          var index = e.currentTarget.dataset.index
          var item = list[index]
          list.splice(index, 1)
          that.setData({
            memoryList: list
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