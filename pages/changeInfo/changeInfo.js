// pages/changeInfo/changeInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    name: "",
    location: "",
    homeland: "",
    picture: "../../static/picture/add.png",
    havePicture: getApp().globalData.havePicture
    //调试需要
  },

  /////////////组件绑定函数/////////////////
  setLocation: function(e) {
    this.setData({
      location: e.detail.value
    })
  },

  setHomeland: function(e) {
    this.setData({
      homeland: e.detail.value
    })
  },

  setName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  /////////////组件绑定函数结束/////////////////


  //提交修改信息函数
  submit: function() {
    var openid = getApp().globalData.openid
    console.log(openid)
    var that = this
    console.log(that.data)
    wx.request({
      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'http://192.168.43.130:8777/changeInfo',
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
        //上传
        var successUp = 0; //成功
        var failUp = 0; //失败
        var length = res.tempFilePaths.length; //总数
        var count = 0; //第几张
        that.uploadOneByOne(res.tempFilePaths, successUp, failUp, count, length);
      },
    });
  },


  /**
   * 采用递归的方式上传多张
   *此处只需要调用一次，只有一个头像
   */
  uploadOneByOne(imgPaths, successUp, failUp, count, length) {
    var that = this;
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
      filePath: imgPaths[count],
      name: count.toString(), //示例，使用顺序给文件命名
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
        }
      }
    })
  },


})