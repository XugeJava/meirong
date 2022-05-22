// pages/my/my.js
Page({

  /**
* 页面的初始数据
*/
  data: {
    userInfo: {},//存储获取的用户信息,
    isData: true,
    currentIndex: 0 ,//默认0下标有下划线
   navTabData:["全部订单","已消费","待消费","预定中"],
    httpUrl: "http://127.0.0.1:8080/",
    imageHttpUrl: "http://127.0.0.1:8080/img/", userInfo: {},
  },

  getOrderData: function (e) {
    var that = this; 
    console.log("点击的脚标", e.currentTarget.dataset.inx);
    var index = e.currentTarget.dataset.inx
    that.setData({ currentIndex: index })
    /* 因为需要根据传递的下标来进行判断查询的是哪种状态的订单， 而订单的状态orderstate又和下标不一致，所有需要进行选择判断 对应的下标的订单状态是什么 */
    var orderstate = ''; //默认为空


    if (index == 1) {
      orderstate = "2"
    } else if (index == 2) {
      orderstate = "1"
    } else if (index == 3) {
      orderstate = "0"
    }
    //从本地缓存中获取token
    wx.getStorage({
      key: 'token',
      success(res) {
        //当获取到token时才能进行查询订单 
        console.log("token = ", res.data)
        //2.获取所有订单 
        wx.request({
          url: that.data.httpUrl + 'order/getOrderByState',
          //仅为示例，并非真实的接口地址 
          data: {
            token: res.data,
            //传递token和订单状态
            orderstate: orderstate
          },
          header: {
            'content-type': 'application/json'
            // 默认值 
          },
          success(res) {
            console.log(res.data);
            that.setData({ orderData: res.data.data })
          }
        })
      }
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this;
    //1.获取本地缓存的用户信息
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        console.log("我的页面获取的用户信息：", res.data)
        //把获取的用户信息存储在userInfo中进行传递
        that.setData({
          userInfo: res.data
        })
      }
    })

  },
  //  跳转登录页面
  toLogin: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  onTabItemTap(e) {
    console.log("eeee", e);
    var that = this;
    //2.获取本地缓存是否存在token
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          isData: false
        })

      },
    })
  },
  //点击注册时，跳转到注册页面
  toRegister: function () {
    wx.navigateTo({
      url: '/pages/register/register',

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