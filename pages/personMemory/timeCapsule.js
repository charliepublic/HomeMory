// pages/timeCapsule/timeCapsule.js
// 导入工具包格式化时间
var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    timeCapsuleList: [1, 2, 3, 4],
    isOpen: false,
    clickMessage: "切换到解封的记忆",
    sequence:0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    var DATE = util.formatDate(new Date());
    var openid = getApp().globalData.openid
    var that = this
    this.setData({
      date: DATE,
      //获取当前时间，用于返回后台计算剩余多少天可以打开
      timeCapsuleList: [1, 2, 3, 4],
      //此处要记得修改
      isOpen: false,
      clickMessage: "切换到解封的记忆",
      sequence: 0
    });
    
    this.changeTimeCapsuleList(0)

  },
  // 删除函数
  delet: function(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认要删除此条信息么？',
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

  //新建一个人记忆
  newPersonMemory: function() {
    wx.navigateTo({
      url: '../addPersonMemory/addPersonMemory',
    })
  },
  //  下拉刷新函数
  onReachBottom: function(option) {
    console.log('--------下拉刷新-------')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var  sequence = this.data.sequence + 1
    this.changeTimeCapsuleList(sequence)
  },

  //响应修改函数内容
  changeTimeCapsuleList: function(sequence) {
    var openid = getApp().globalData.openid
    var that = this
    wx.request({
      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'http://192.168.43.130:8777/upload/*******',
      data: {
        openId: openid,
        sequence: sequence,
        isOpen:that.data.isOpen
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var newList = that.data.timeCapsuleList.concat(res.data)
        that.setData({
          timeCapsuleList: newList
        })
        // TODO：！！！！！！！！！！！！！
        console.log(that.data.changeTimeCapsuleList)
      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新

      }
    })
  },

  clickButton: function() {
    this.setData({
      isOpen: !this.data.isOpen
    })
    if (this.data.isOpen == false) {
      this.setData({
        clickMessage: "切换到解封的记忆"
      })
    } else {
      this.setData({
        clickMessage: "切换到未解封的记忆"
      })
    }

    this.changeTimeCapsuleList(0)
  },
})


//计算时间的相差天数
function dateDifference(presentData, openData) {
  var dateSpan, iDays;
  presentData = Date.parse(presentData);
  openData = Date.parse(openData);
  dateSpan = openData - presentData;
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  return iDays
};