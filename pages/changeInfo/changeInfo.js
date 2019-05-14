// pages/changeInfo/changeInfo.js
var config = require("../../utils/config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rippleStyle: '',
    date: "",
    name: "",
    location: "",
    homeland: "",
    picture: "",
    havePicture: getApp().globalData.havePicture
    //调试需要
  },

  onShow: function() {
    var openid = getApp().globalData.openid
    var that = this
    console.log("----------------------------------")
    console.log(openid)
    console.log("----------------------------------")
    wx.request({
      url: config.host + '/getInfo',
      data: {
        openId: openid,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          // age: res.data.age,
          name: res.data.userName,
          homeland: res.data.homeLand,
          location: res.data.location,
          //Todo此处对于用户的进行其他键值对的添加
          // picture: "",
          // havePicture: false
        })
      },
    })
  },


  //提交修改信息函数
  submit: function() {
    var openid = getApp().globalData.openid
    var that = this
    console.log("----------------------------------")
    console.log(openid)
    console.log(that.data)
    console.log("----------------------------------")
    wx.request({
      url: config.host + '/changeInfo',
      method: "POST",
      data: {
        openId: openid,
        // date: that.data.date,
        age: 18,
        userName: that.data.name,
        location: that.data.location,
        homeLand: that.data.homeland
        // TODO：！！！！！！！！！！！！！
        //添加其他相对应键值对
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        wx.showToast({
          title: '修改信息成功',
          icon: 'success',
          duration: 1500 //持续的时间
        })
        console.log("请求结束")
        wx.navigateBack({

        })
      },
      fail: function(res) {
        console.log(res)
        console.log("----------上传失败----------")
      }



    })

    //上传头像
    var successUp = 0; //成功
    var failUp = 0; //失败
    var length = that.data.images.length; //总数
    var count = 0; //第几张
    that.uploadOneByOne(that.data.images, successUp, failUp, count, length);
  },


  // 修改头像
  changePicture: function() {
    console.log("--------point-------")
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        var images = res.tempFilePaths[0]
        that.setData({
          havePicture: true,
          picture: images
        })
      },
    });
  },


  /////////////组件绑定函数/////////////////
  setLocation: function (e) {
    this.setData({
      location: e.detail.value
    })
  },

  setHomeland: function (e) {
    this.setData({
      homeland: e.detail.value
    })
  },

  setName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  /////////////组件绑定函数结束/////////////////

  /**
   * 采用递归的方式上传多张
   *此处只需要调用一次，只有一个头像
   */
  uploadOneByOne(imgPaths, successUp, failUp, count, length) {
    var that = this;
    var openid = getApp().globalData.openId
    console.log("----------------------------------")
    console.log(openid)
    console.log("----------------------------------")
    wx.uploadFile({
      //Todo!!!!!!!!!
      //修改url
      url: config.host + '',
      filePath: imgPaths[count],
      name: "file",
      formData: {
        openId: openid,
      }, // HTTP 请求中其他额外的 form data
      success: function(e) {
        successUp++; //成功+1
      },
      fail: function(e) {
        failUp++; //失败+1
      },
      complete: function(e) {
        console.log('上传成功' + successUp + ',' + '失败' + failUp);
        if (successUp == 1) {
          wx.showToast({
            title: '上传头像成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '上传头像失败',
            icon: 'none',
            duration: 2000
          })
        }

      }
    })
  },

  // 波纹效果
  containerTap: function (res) {
    var that = this
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;
    this.setData({
      rippleStyle: ''
    });
    setTimeout(function () {
      that.setData({
        rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
      });
    }, 200)
  },
})