// 导入工具包格式化时间
var util = require("../../utils/util.js")
var config = require("../../utils/config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    timeCapsuleList: [1, 2, 3, 4],
    tempTimeCapsuleList: [1, 2, 3, 4],

    sequence: 0,
    tempsequence: 0,

    clickMessage: "切换到解封的记忆",
    url: "",

    isOpen: false,
    flag: true,
    isFirstClick: true
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    var DATE = util.formatDate(new Date());
    var openid = getApp().globalData.openid
    var that = this
    if (getApp().globalData.isDebug == false) {
      this.setData({
        date: DATE,
        tempTimeCapsuleList: [],
        timeCapsuleList: [],
        isOpen: false,
        clickMessage: "切换到解封的记忆",
        sequence: 0
      });
    }


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
          console.log("----------------------------------")
          console.log(item.tag.tag)
          console.log("----------------------------------")
          wx.request({
            // TODO：！！！！！！！！！！！！！
            // 修改url
            url: config.host + '',
            data: {
              id: item.tag.tag,
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



  //  下拉刷新函数
  onReachBottom: function(option) {
    if (this.data.flag == true) {
      console.log('--------下拉刷新-------')
      wx.showNavigationBarLoading() //在标题栏中显示加载
      this.setData({
        sequence: this.data.sequence + 1
      })
      this.changeTimeCapsuleList(this.data.sequence)
    }
  },

  //响应修改函数内容
  changeTimeCapsuleList: function(sequence) {
    var openid = getApp().globalData.openid
    var that = this
    this.setData({
      flag: false,
      url: config.host + '/timecapsule/querycapsulefile?uri='
    })
    console.log("----------------------------------")
    console.log(openid)
    console.log(sequence)
    console.log(that.data.isOpen)
    console.log("----------------------------------")
    wx.request({
      url: config.host + '/timecapsule/querycapsulelist',
      data: {
        openId: openid,
        sequence: sequence,
        isOpen: that.data.isOpen
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        var newFlag = true
        if (res.data.length < 1) {
          newFlag = false
        }
        var newList = that.data.timeCapsuleList.concat(res.data)
        console.log(newList)

        for (var i = 0; i < newList.length; i++) {
          var list = newList[i].capsuleList
          for (var j = 0; j < list.length; i++) {
            var type = list[j].recordType
            //根据需求添加图片
            if (type == "jpg" || type == "png" || type == "bmp" || type == "gif" || type == "jpeg") {
              list[j]["isPicture"] = true
            }
            else {
              tlist[j]["isPicture"] = false
            }
          }
        }
        that.setData({
          timeCapsuleList: newList,
          flag: newFlag
        })
      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新

      }
    })
  },

  //点击button进行切换
  clickButton: function() {
    var tempList = this.data.timeCapsuleList
    var tempSeq = this.data.sequence
    // 作为副本进行切换，显示不同的胶囊和显示效果
    this.setData({
      isOpen: !this.data.isOpen,
      timeCapsuleList: this.data.tempTimeCapsuleList,
      tempTimeCapsuleList: tempList,
      sequence: this.data.tempsequence,
      tempsequence: tempSeq
    })
    if (this.data.isOpen == false) {
      this.setData({
        clickMessage: "切换到解封的记忆"
      })
    } else {
      this.setData({
        clickMessage: "切换到未解封的记忆"
      })
      // 如果第一次点击按钮加载解封的记忆
      if (this.data.isFirstClick == true) {
        this.setData({
          isFirstClick: false
        })
        this.changeTimeCapsuleList(this.data.sequence)
      }
    }
  },
  //新建一个人记忆
  newPersonMemory: function() {
    wx.navigateTo({
      url: '../addPersonMemory/addPersonMemory',
    })
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