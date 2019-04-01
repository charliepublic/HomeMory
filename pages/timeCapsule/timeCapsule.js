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

  delet:function(e){
    // console.log(e)
    // var list = this.data.timeCapsuleList
    // var listA = this.data.timeCapsuleList
    // var listB = this.data.timeCapsuleList
    // console.log(list)
    // var index = e.currentTarget.dataset.index
    // var length = this.data.timeCapsuleList.length
    // console.log(length)
    // console.log(index)
    // var lista = list.splice(0,index)
    // console.log("list is " + listA)
    // console.log("list a is "+lista)
    // var listb =list.splice(index+1,list.length-index)
    // console.log("list is " + listB)
    // console.log("list b is " + listb)
    // var newlist = lista.concat(listb)

    //删除功能 真的服气！！！
    this.setData({
      timeCapsuleList:newlist
    })
    
    wx.request({

      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'www.baidu.com',
      data: {
          item:this.data.timeCapsuleList[index]
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: '删除胶囊成功',
          icon: 'success',
          duration: 1500//持续的时间
        })
      }
    })
  }
})