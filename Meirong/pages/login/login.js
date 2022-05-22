// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  /**
  * 页面的初始数据
  */
  data: {
    httpUrl: "http://127.0.0.1:8080/"

  },

  //点击登录 调用的方法
  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value.phone)  //password
    //wx.login方式是微信小程序给我们提供的方法，它可以为我们获取登录凭证
    //只有拥有登录凭证才能发送网络请求给后台服务器，并且该凭证还要传递给后台换取openid等信息
    //详情请见官方文档
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求    res.code需要的登录凭证   5分钟
          wx.request({
            url: that.data.httpUrl + 'user/userLogin',
            method: "post",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              code: res.code,
              phone: e.detail.value.phone,
              password: e.detail.value.password
            },
            success: function (result) {
              console.log(result.data)
              if (result.data.code == 0) {
                wx.showToast({
                  title: result.data.msg,
                  icon: 'success',
                  duration: 2000
                })
                //说明登录成功  
                //1.把返回的token保存在本地缓存中
                wx.setStorage({
                  key: "token",
                  data: result.data.data
                })
                //2.跳转到首页
                wx.switchTab({
                  url: '/pages/index/index',
                })

              } else {  //显示错误信息
                wx.showToast({
                  title: result.data.msg,
                  icon: 'error',
                  duration: 2000
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})