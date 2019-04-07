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
      success: function (res) {
        
         // TODO：！！！！！！！！！！！！！
      // 加载以往时光胶囊信息
      }
    })
  },

  //文本绑定函数
  setTimeTxt:function(e){
    this.setData({
      timeTxt:e.detail.value
    })
  },

  // 修改页面显示时间
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
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
      success: function (res) {
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

  // 提交函数上传时光胶囊 
  // TODO！！
  // 修改data内容
  submit: function () {
    var openid = getApp().globalData.openid
    var that = this
    console.log(this.data.timeTxt)
    wx.request({

      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'www.baidu.com',
      data: {
        openid: openid,
        date: that.data.date,
        timeTxt: that.data.timeTxt
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


  // 删除函数
  delet: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认要删除此条信息么？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var list = that.data.timeCapsuleList
          var index = e.currentTarget.dataset.index
          var item = list[index]
          list.splice(index, 1)
          that.setData({
            timeCapsuleList: list
          })

          wx.request({

            // TODO：！！！！！！！！！！！！！
            // 修改url
            url: 'www.baidu.com',
            data: {
              item: item
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1500//持续的时间
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

})