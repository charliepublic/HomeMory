// pages/addHomeMemory/addHomeMemory.js

var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    txt:"",
    images:[],
    isPrivate:false,
    clickMessage:"点击修改为仅自己可见"
  },

  // 绑定函数
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

      },
    });


  },
  /**
    * 采用递归的方式上传多张
    */
  uploadOneByOne(imgPaths, successUp, failUp, count, length) {
    var that = this;
    var openid = getApp().globalData.openid
    var Time = util.formatTime(new Date());
    wx.showLoading({
      title: '正在上传第' + count + '张',
    })
    wx.uploadFile({
      url: 'http://192.168.43.130:8777/upload/addhomememory', //仅为示例，非真实的接口地址
      filePath: imgPaths[count],
      name: "file",//示例，使用顺序给文件命名
      formData: {
        isPrivate:that.data.isPrivate,
        openid: openid,
        content: that.data.txt,
        time: Time
      }, // HTTP 请求中其他额外的 form data
      success: function (e) {
        successUp++;//成功+1
        console.log(e)
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


  // 点击设置权限为是否都可见
  clickButton:function(){   
    this.setData({
      isPrivate: !this.data.isPrivate
    })
    if (this.data.isPrivate == true){
      this.setData({
        clickMessage:"点击修改为所有人可见"
      })
    }else{
      this.setData({
        clickMessage: "点击修改为仅自己可见"
      })
    }
  },

  submit: function () {
    var successUp = 0; //成功
    var failUp = 0; //失败
    var length = this.data.images.length; //总数
    var count = 0; //第几张
    this.uploadOneByOne(this.data.images, successUp, failUp, count, length);
    wx.navigateBack({
    
    })
  }
})