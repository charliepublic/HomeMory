// pages/changeInfo/changeInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"",
    name:"",
    location:"",
    homeland:""
  },

  /////////////组件绑定函数/////////////////
  setLocation:function(e){
    this.setData({
      location:e.detail.value
    })
  },

  setHomeland:function(e){
    this.setData({
      homeland: e.detail.value
    })
  },

  setName:function(e){
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



  //提交修改信息函数
  submit:function(){
    var openid = getApp().globalData.openid 
    var that = this
    wx.request({
      // TODO：！！！！！！！！！！！！！
      // 修改url
      url: 'www.baidu.com',
      data: {
        openid: openid,
        date: that.date,
        name: that.name,
        location: that.location,
        homeland: that.homeland

        // TODO：！！！！！！！！！！！！！

        //添加其他相对应键值对
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: '修改信息成功',
          icon: 'success',
          duration: 1500//持续的时间
        })
        wx.navigateBack({

        })
      },
      fail:function(res){
        console.log("----------上传失败----------")
      }
    })
  }
})