// pages/home/home.js
var config = require("../../utils/config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    searchTxt: "1231432542",
    memoryList: [{
        "homeFileList": [1, 2]
      },
      {
        "homeFileList": [3, 4]
      }
    ],
    homeId: "",
    sequence: 0,
    url: config.host + "/timecapsule/querycapsulefile?uri=", //TOdo 修改请求图片的url
    presentTxt: "", //用于获取当前搜索字 在搜索时传值给searchTxt
    flag: true, //用于保证网络请求
    array: ['家庭历史', '学生时代', '宝宝康乐', '工作成果'],
    type: "全部",

  },


  onLoad() {
    var myDate = new Date();
    var day = myDate.getDate(); //获取当前日(1-31)
    if (day == 1) {
      wx.navigateTo({
        url: '../timeMachine/timeMachine',
      })
    }
  },
  // 加载函数，加载所有的家庭说说信息
  onShow: function(options) {
    if (getApp().globalData.isDebug == false) {
      this.setData({
        sequence: 0,
        memoryList: [],
        homeId: getApp().globalData.homeId,
        searchTxt: "",
        type: "全部",
      })
    }
    var openid = getApp().globalData.openid
    var that = this
    this.changeMemoryList(0)
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
            console.log(item.tag.tag)
            console.log(getApp().globalData.openid)
            console.log("----------------------------------")
            wx.request({
              url: config.host + '/upload/deletememory',
              data: {
                id: item.tag.tag,
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
    console.log(that.data.searchTxt)
    console.log(that.data.type)
    console.log("----------------------------------")
    wx.request({
      url: config.host + '/upload/queryfilelist',
      data: {
        openId: openid,
        homeId: that.data.homeId,
        sequence: sequence,
        searchTxt: that.data.searchTxt,
        type: that.data.type
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var newFlag = true
        if (res.data.length < 1) {
          newFlag = false
        }
        //此处对于返回的每一个内容的处理！！！！！！！！！
        var result = res.data
        for (var i = 0; i < result.length; i++) {
          var list = result[i].homeFileList
          for (var j = 0; j < list.length; j++) {
            var type = list[j].recordType
            if (type == "jpg" || type == "png" || type == "bmp" || type == "gif" || type == "jpeg") {
              list[j]["isPicture"] = true
            } else {
              list[j]["isPicture"] = false
            }
          }
        }
        var newList = result
        console.log(newList)
        that.setData({
          memoryList: newList,
          flag: true
        })
      }
    })
  },


  //-----------------------控件绑定-------start--------------------
  // 单选
  bindPickerChange: function (e) {
 
    var newType = this.data.array[e.detail.value]
    console.log(newType)
    this.setData({
      type: newType
    })
    this.changeMemoryList(0)
  },

  // 添加说说事件绑定
  input: function() {
    if (!Boolean(this.data.homeId)) {
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
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      presentTxt: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      presentTxt: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      presentTxt: e.detail.value
    });
  }
  //-----------------------控件绑定-------end--------------------
})