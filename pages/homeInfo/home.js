// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchTxt: "",
    memoryList: [1, 2, 3, 4],
    homeId: "1",
    sequence: 0,
    presentTxt: ""
    //编译需要改homeId "" 为1
  },

  // 加载函数，加载所有的家庭说说信息
  onShow: function(options) {
    this.setData({
      sequence: 0,
      // memoryList : []
      searchTxt: ""
    })
    var openid = getApp().globalData.openid
    var that = this
    wx.request({
      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'http://192.168.43.130:8777/upload/testquery',
      data: {
        openId: openid,
        homeId: that.data.homeId,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var newList = that.data.memoryList.concat(res.data)
        that.setData({
          memoryList: newList
        })
        // TODO：！！！！！！！！！！！！！
        // 加载以往说说信息即修改memoryList
        console.log(that.data.memoryList)
      }
    })
  },

  // 控件绑定
  setTxt: function(e) {
    this.setData({
      presentTxt: e.detail.value
    })
    console.log(this.data.searchTxt)
  },


  // 添加说说事件绑定
  input: function() {
    if (this.data.homeId == "") {
      wx.showModal({
        title: '提示',
        content: '请先创建你的家庭',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url: '../newFamily/newFamily',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../addHomeMemory/addHomeMemory',
      })
    }
  },

  // 进行查找
  search: function() {
    this.setData({
      sequence: 0,
      memoryList: [],
      searchTxt: this.data.presentTxt
    })
    var openid = getApp().globalData.openid
    var that = this
    wx.request({
      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'http://192.168.43.130:8777/upload/*****',
      data: {
        openId: openid,
        homeId: that.data.homeId,
        searchTxt: that.data.searchTxt
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var newList = that.data.memoryList.concat(res.data)
        that.setData({
          memoryList: newList
        })
        // TODO：！！！！！！！！！！！！！
        // 加载以往说说信息即修改memoryList
        console.log(that.data.memoryList)
      }
    })
  },

  // 删除说说，要进行权限验证
  delet: function(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认要删除此条信息么？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var list = that.data.memoryList
          var index = e.currentTarget.dataset.index
          var item = list[index]

          //此处进行权限认证
          if (item.openid != that.data.openid) {
            wx.showToast({
              title: '您无权删除该项说说',
              icon: 'none',
              duration: 1500 //持续的时间
            })
            return
          } else {
            list.splice(index, 1) //删除功能实现
            that.setData({
              memoryList: list
            })
            wx.request({
              // TODO：！！！！！！！！！！！！！
              // 修改url deletememory
              url: 'http://192.168.43.130:8777/upload/deletememory',
              data: {
                id: item.id,
                openId: getApp().globalData.openid
              },
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                console.log(res)
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1500 //持续的时间
                })
              }
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //  下拉刷新函数
  onReachBottom: function(option) {
    console.log('--------下拉刷新-------')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.changeMemoryList()
  },

  //响应修改函数内容
  changeMemoryList: function(option) {
    var sequence = this.data.sequence + 1
    var openid = getApp().globalData.openid
    var that = this
    wx.request({
      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'http://192.168.43.130:8777/upload/*******',
      data: {
        openId: openid,
        homeId: that.data.homeId,
        sequence: sequence,
        searchTxt: this.data.searchTxt
        //如果searchTxt为""则显示所有，否则显示对应的内容
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var newList = that.data.memoryList.concat(res.data)
        that.setData({
          memoryList: newList
        })
        // TODO：！！！！！！！！！！！！！
        // 加载以往说说信息即修改memoryList
        console.log(that.data.memoryList)
      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新

      }
    })
  }
})