// pages/addHomeMemory/addHomeMemory.js

var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    txt:"",
    images:[]
  },
  setTxt: function (e) {
    this.setData({
      txt: e.detail.value
    })
  },



  
  /**
  * 上传照片//选择图片时限制9张，如需超过9张，同理亦可参照此方法上传多张照片
  */
  upload: function () {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var images = that.data.images.concat(res.tempFilePaths)
        that.setData({
          images:images
        })
        console.log(images)
        var successUp = 0; //成功
        var failUp = 0; //失败
        var length = res.tempFilePaths.length; //总数
        var count = 0; //第几张
        // that.uploadOneByOne(res.tempFilePaths, successUp, failUp, count, length);
      },
    });
  },
  /**
    * 采用递归的方式上传多张
    */
  uploadOneByOne(imgPaths, successUp, failUp, count, length) {
    var that = this;
    wx.showLoading({
      title: '正在上传第' + count + '张',
    })
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
      filePath: imgPaths[count],
      name: count.toString(),//示例，使用顺序给文件命名
      success: function (e) {
        successUp++;//成功+1
      },
      fail: function (e) {
        failUp++;//失败+1
      },
      complete: function (e) {
        count++;//下一张
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

  submit: function () {
    var openid = getApp().globalData.openid
    var that = this
    wx.request({

      // TODO：！！！！！！！！！！！！！
      // 修改url

      url: 'www.baidu.com',
      data: {
        // TODO：！！！！！！！！！！！！！
        //添加其他相对应键值对
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        var Time = util.formatTime(new Date());
        console.log(Time)
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1500//持续的时间
        })
        wx.navigateBack({

        })
      }
    })
  }
})