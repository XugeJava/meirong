// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    httpUrl: "http://127.0.0.1:8080/",
    httpImageUrl: "http://127.0.0.1:8080/img/",
    busInfo: {},
    //初始日期和时间方便渲染默认时间   
    date: "2021-10-15",
    time: "9:00"
  },
  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value); //获取表单中的三个数据
    //应该去判断是否已经登录
    wx.getStorage({
      key: 'token',
      //当缓存中存储token说明已经登录，发送对应请求进行预定	  
      success(res) {
        console.log(res.data);//token信息
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000
        })
        //发起请求
        wx.request({
          url: that.data.httpUrl + 'order/createOrder',
          method: "post",
          data: {
            token: res.data,
            proname: that.data.busInfo.project.proname,
            makedate: that.data.date + " " + that.data.time,
            username: e.detail.value.username,
            usertell: e.detail.value.usertell,
            information: e.detail.value.information,
            busid: that.data.busInfo.id,
            proid: that.data.busInfo.project.id
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success(res) {
            console.log(res.data)

            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 1000
            })  
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        })



      },
      //当缓存没有token说明没有登录，则需要跳转到登录页面 
      fail: function () {
        //跳转到登录页面
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("订单页面获取项目id为", options.id);
    //发起请求，获取订单页面需要的数据   
    wx.request({
      url: that.data.httpUrl + 'business/getBusInfoByProId', //发送请求
      data: {
        id: options.id  //携带id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("获取商家信息", res.data);
        that.setData({
          //res.data 代表后台返回给前端的数据(responseData对象) 
          //还需要调用其中的data属性才是代表商家对象信息 
          busInfo: res.data.data
        })
      }
    })
  },

  /*
定义日期时间改变事件，在更改日期时间后，把更改后的新日期时间进行重新显示。
否则会发现当修改时间日期时无法进行修改
*/
  bindDateChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      time: e.detail.value
    })
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