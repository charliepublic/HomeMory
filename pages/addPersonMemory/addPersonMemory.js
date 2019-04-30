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

  // 修改页面显示时间
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (e.detail < util.formatDate(new Date())){
      wx.showToast({
        title: "请选择今天以外的时间",
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      date:e.detail.value
    })
  },

  /**
   * 上传照片//选择图片时限制9张，如需超过9张，同理亦可参照此方法上传多张照片
   */
  upload: function() {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var successUp = 0; //成功
        var failUp = 0; //失败
        var length = res.tempFilePaths.length; //总数
        var count = 0; //第几张

        var length = that.data.images.length + res.tempFilePaths.length
        //限制用户上传的总个数
        if (length > 8) {
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
  /**
   * 采用递归的方式上传多张
   */
  uploadOneByOne(imgPaths, successUp, failUp, count, length, newTag) {
    if (length == 0) {
      return
    }
    var that = this;
    var openid = getApp().globalData.openid
    console.log(openid)
    // console.log(this.data.timeTxt)
    console.log(that.data.date)
    wx.showLoading({
      title: '正在上传第' + count + '张',
    })
    wx.uploadFile({
      //TODO 修改URL
      url: config.host + '/timecapsule/submit', 
      filePath: imgPaths[count],
      name: "file", //示例，使用顺序给文件命名
      formData: {
        name: that.data.timeTitle,
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
            title: '上传成功' + successUp,
            icon: 'success',
            duration: 2000
          })
        } else {
          //递归调用，上传下一张
          that.uploadOneByOne(imgPaths, successUp, failUp, count, length);
          console.log('正在上传第' + count + '张');
        }
      }
    })
  },

  // 提交函数上传时光胶囊 
  // TODO！！
  // 修改data内容
  submit: function() {
    var successUp = 0; //成功
    var failUp = 0; //失败
    var length = this.data.images.length; //总数
    var count = 0; //第几张
    
    var tag = util.generateMixed(10)//唯一识别码
    this.uploadOneByOne(this.data.images, successUp, failUp, count, length,tag);
    wx.navigateBack({
    })
  
  },

})