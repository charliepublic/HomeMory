// pages/home/home.js
var config = require("../../utils/config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchTxt: "",
    memoryList: [1, 2, 3, 4],
    homeId: "",
    sequence: 0,
    presentTxt: "", //用于获取当前搜索字 在搜索时传值给searchTxt
    flag: true, //用于保证网络请求
    items: [{
        name: 'all',
        value: '全部',
        checked: true
      },
      {
        name: 'people',
        value: '发布人'
      },
      {
        name: 'content',
        value: '内容'
      },
      {
        name: 'time',
        value: '时间'
      },
    ],
    value: "all"
  },


  // 加载函数，加载所有的家庭说说信息
  onShow: function(options) {
    this.setData({
      sequence: 0,
      memoryList: [],
      homeId: getApp().globalData.homeId,
      searchTxt: ""
    })
    var openid = getApp().globalData.openid
    var that = this
    this.changeMemoryList(0)
  },

  //-----------------------控件绑定---------------------------
  setTxt: function(e) {
    this.setData({
      presentTxt: e.detail.value
    })
  },

  // 单选
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      value: e.detail.value
    })
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
  //-----------------------控件绑定---------------------------


  // 进行查找
  search: function() {
    this.setData({
      sequence: 0,
      memoryList: [],
      searchTxt: this.data.presentTxt
    })
    var openid = getApp().globalData.openid
    var that = this
    this.changeMemoryList(0)
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
          console.log("说说是" + item)
          //---------此处进行权限认证--------
          if (item.openid != that.data.openid) {
            wx.showToast({
              title: '您无权删除该项说说',
              icon: 'none',
              duration: 1500 //持续的时间
            })
            return
            //-----------------
          } else {
            list.splice(index, 1) //删除功能实现
            that.setData({
              memoryList: list
            })
            console.log("----------------------------------")
            console.log(item.id)
            console.log(getApp().globalData.openid)
            console.log("----------------------------------")
            wx.request({
              url: config.host + '/upload/deletememory',
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
    // 加锁flag
    var that = this
    console.log(that.data.flag)
    if (that.data.flag == true) {
      wx.showNavigationBarLoading() //在标题栏中显示加载
      console.log("11111111111" + that.data.sequence + 1)
      that.setData({
        sequence: that.data.sequence + 1
      })
      console.log("22222222222222" + that.data.sequence + 1)
      that.changeMemoryList(sequence)
    }
  },

  //响应修改函数内容
  changeMemoryList: function(sequence) {
    
    var openid = getApp().globalData.openid
    var that = this
    // 加锁flag
    this.setData({
      flag: false
    })
    console.log("----------------------------------")
    console.log(sequence)
    console.log(openid)
    console.log(that.data.homeId)
    console.log("----------------------------------")
    wx.request({
      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: config.host + '/upload/*******',
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
        var newFlag = true
        if (res.data.length < 1) {
          newFlag = false
        }
        var newList = that.data.memoryList.concat(res.data)
        that.setData({
          memoryList: newList,
          flag: true
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