// pages/addHomeMemory/addHomeMemory.js
var config = require("../../utils/config.js")
var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

    txt: "", //添加的文字内容
    images: [], //上传图片列表
    isPrivate: false,
    clickMessage: "修改为仅自己可见",
    t_length:0
  },

  // 绑定函数
  setTxt: function(e) {
    var t_text = e.detail.value.length;
    this.setData({
      t_length: t_text,
      txt: e.detail.value
    })

  },

  //上传照片选择图片时限制9张，

  upload: function() {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        //--------限制用户上传的总个数----------
        var length = that.data.images.length + res.tempFilePaths.length
        if (length > 9) {
          wx.showToast({
            title: "图片已经超过9个",
            icon: 'none',
            duration: 2000
          })
          return
        }
        //-----------------------------------
        var images = that.data.images.concat(res.tempFilePaths)
        that.setData({
          images: images
        })
        // console.log(images)
      },
    });


  },


  submit: function () {
    var successUp = 0; //成功
    var failUp = 0; //失败
    var length = this.data.images.length; //总数
    var count = 0; //第几张
    var tag = util.generateMixed(10)
    this.uploadOneByOne(this.data.images, successUp, failUp, count, length, tag);
    wx.navigateBack({

    })
  },


  
  /**
   * 采用递归的方式上传多张
   */
  uploadOneByOne(imgPaths, successUp, failUp, count, length, newtage) {
    if (length == 0) {
      return
    }
    var that = this;
    var openid = getApp().globalData.openid
    var Time = util.formatTime(new Date());
    wx.showLoading({
      title: '正在上传第' + count + '张',
    })

    console.log("-----------------------------")
    console.log(that.data.isPrivate)
    console.log(openid)
    console.log(that.data.txt)
    console.log(Time)
    console.log(newtage)
    console.log("-----------------------------")
    wx.uploadFile({
      url: config.host + '/upload/addhomememory',
      filePath: imgPaths[count],
      name: "file",
      formData: {
        isPrivate: that.data.isPrivate,
        openId: openid,
        content: that.data.txt,
        time: Time,
        tag: newtage
      }, // HTTP 请求中其他额外的 form data
      success: function(e) {
        successUp++; //成功+1
        console.log(e)
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
            title: '上传成功' + successUp,
            icon: 'success',
            duration: 2000
          })
        } else {
          //递归调用，上传下一张
          that.uploadOneByOne(imgPaths, successUp, failUp, count, length, newtage);
          console.log('正在上传第' + count + '张');
        }
      }
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  // 点击设置权限为是否都可见
  clickButton: function() {
    this.setData({
      isPrivate: !this.data.isPrivate
    })
    if (this.data.isPrivate == true) {
      this.setData({
        clickMessage: "修改为所有人可见"
      })
    } else {
      this.setData({
        clickMessage: "修改为仅自己可见"
      })
    }
  },

})