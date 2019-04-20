// pages/timeCapsule/timeCapsule.js
// 导入工具包格式化时间
var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    date: "",
    timeTitle: "",
    timeTxt: "",
    t_length: 0
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
      success: function(res) {
        // TODO：！！！！！！！！！！！！！
        // 加载以往时光胶囊信息
        that.setData({
          changeTimeCapsuleList: res.data
        })
      }
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

  setTimeTitle: function() {
    var title = e.detail.value;
    this.setData({
      timeTitle: title
    })
  },

  // 修改页面显示时间
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
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
  uploadOneByOne(imgPaths, successUp, failUp, count, length) {
    if (length == 0) {
      return
    }
    var that = this;
    var openid = getApp().globalData.openid
    console.log(this.data.timeTxt)
    wx.showLoading({
      title: '正在上传第' + count + '张',
    })
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
      filePath: imgPaths[count],
      name: "file", //示例，使用顺序给文件命名
      formData: {
        timeTitle: that.data.timeTitle,
        openId: openid,
        date: that.data.date,
        timeTxt: that.data.timeTxt
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
    this.uploadOneByOne(this.data.images, successUp, failUp, count, length);
    wx.navigateBack({

    })
  },

})