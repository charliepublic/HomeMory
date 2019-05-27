// pages/home/home.js
var a = false;
var homeId
var config = require("../../utils/config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memoryList: [
    ],
    sequence: 0,
    url: config.host + "/timecapsule/querycapsulefile?uri=", 
    presentTxt: "",
    flag: true, 
    array: ["全部",'家庭历史', '学生时代', '宝宝康乐', '工作成果'],
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
    homeId=getApp().globalData.homeId
    if(a){
      a = false
      return
    }
    if (getApp().globalData.isDebug == false) {
      this.setData({
        sequence: 0,
        memoryList: [],
        type: "全部",
      })
    }
    if (!Boolean(getApp().globalData.homeId)) {
      return
    }
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
          var list = that.data.memoryList
          var index = e.currentTarget.dataset.index
          var item = list[index]
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
            // console.log("----------------------------------")
            // console.log(item.tag.tag)
            // console.log(getApp().globalData.openid)
            // console.log("----------------------------------")
            wx.request({
              url: config.host + '/upload/deletememory',
              data: {
                tag: item.tag.tag,
                openId: getApp().globalData.openid
              },
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                // console.log(res)
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1500 //持续的时间
                })
              }
            })
          }
        } else if (res.cancel) {
  
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
    // console.log("----------------------------------")
    // console.log(sequence)
    // console.log(openid)
    // console.log(homeId)
    // console.log(that.data.type)
    // console.log("----------------------------------")
    wx.request({
      url: config.host + '/upload/queryfilelist',
      data: {
        openId: openid,
        homeId:homeId,
        sequence: sequence,
        searchTxt: "",
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
          var time = result[i].tag.time
          result[i].tag.time = time.substring(0,10)
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
        that.setData({
          memoryList: newList,
          flag: true
        })
      }
    })
  },


  //-----------------------控件绑定-------start--------------------

  previewImage: function (e) {
    var that = this
    a = true
    var list =[]
    list.push(e.currentTarget.id)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  },

  // 单选
  bindPickerChange: function (e) {
    var newType = this.data.array[e.detail.value]
    this.setData({
      type: newType
    })
    this.changeMemoryList(0)
  },

  // 添加说说事件绑定
  input: function() {
    if (!Boolean(homeId)) {
      wx.showModal({
        title: '提示',
        content: '请先创建你的家庭',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../newFamily/newFamily',
            })
          } else if (res.cancel) {
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../addHomeMemory/addHomeMemory',
      })
    }
  },
  //-----------------------控件绑定-------end--------------------
})