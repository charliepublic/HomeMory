// pages/timeCapsule/timeCapsule.js
// 导入工具包格式化时间
var config = require("../../utils/config.js")
var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    date: util.formatDate(new Date()),
    timeTitle: "",
    timeTxt: "",
    t_length: 0
  },

  // 提交函数上传时光胶囊 
  submit: function() {
    if (this.data.timeTitle == "") {
      wx.showToast({
        title: "请填写你的记忆名称",
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.images.length == 0) {
      wx.showToast({
        title: "请务必上传图片",
        icon: 'none',
        duration: 2000
      })
      return
    }
    var successUp = 0; //成功
    var failUp = 0; //失败
    var length = this.data.images.length; //总数
    var count = 0; //第几张  
    var tag = util.generateMixed(10) //唯一识别码
    this.uploadOneByOne(this.data.images, successUp, failUp, count, length, tag);


  },
  /**
   * 上传照片/
   */
  upload: function() {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var successUp = 0;
        var failUp = 0;
        var length = res.tempFilePaths.length;
        var count = 0;

        var length = that.data.images.length + res.tempFilePaths.length
        //限制用户上传的总个数
        if (length > 9) {
          wx.showToast({
            title: "图片已经超过9个",
            icon: 'none',
            duration: 2000
          })
          return
        }
        var images = that.data.images.concat(res.tempFilePaths)
        that.setData({
          images: images
        })
      },
    });
  },


  // 修改页面显示时间
  bindDateChange: function(e) {
    if (e.detail.value < util.formatDate(new Date())) {
      wx.showToast({
        title: "请选择今天以后的时间",
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      date: e.detail.value
    })
  },

  previewImage: function(e) {
    var that = this
    console.log(e)
    console.log(that.data)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: that.data.images // 需要预览的图片http链接列表
    })
  },

  //文本绑定函数
  setTimeTxt: function(e) {
    var t_text = e.detail.value.length;
    this.setData({
      t_length: t_text,
      timeTxt: e.detail.value
    })
  },

  setTimeTitle: function(e) {
    var title = e.detail.value;
    this.setData({
      timeTitle: title
    })
  },

  /**
   * 采用递归的方式上传多张
   */
  uploadOneByOne(imgPaths, successUp, failUp, count, length, newTag) {
    if (length == 0) {
      return
    }
    var that = this;
    var openid = getApp().globalData.openid
    console.log("openid是   " + openid)
    // console.log(this.data.timeTxt)
    console.log("tag   " + newTag)
    console.log("上传日期 " + that.data.date)
    wx.showLoading({
      title: '正在上传第' + count + '张',
    })

    console.log("----------------------------------")
    console.log(that.data.timeTitle)
    console.log(openid)
    console.log(that.data.date)
    console.log(that.data.timeTitle)
    console.log(newTag)
    console.log("----------------------------------")
    wx.uploadFile({
      url: config.host + '/timecapsule/submit',
      filePath: imgPaths[count],
      name: "file",
      formData: {
        title: that.data.timeTitle,
        openId: openid,
        time: that.data.date,
        content: that.data.timeTxt,
        tag: newTag
      }, // HTTP 请求中其他额外的 form data

      success: function(e) {
        successUp++; //成功+1
      },
      fail: function(e) {
        failUp++; //失败+1
      },
      complete: function(e) {
        count++; //下一张
        if (count == length) {
          //上传完毕，作一下提示
          console.log('上传成功' + successUp + ',' + '失败' + failUp);
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({})
        } else {
          //递归调用，上传下一张
          that.uploadOneByOne(imgPaths, successUp, failUp, count, length, newTag);
          console.log('正在上传第' + count + '张');
        }
      }
    })
  },

})