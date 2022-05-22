// pages/proDetails/proDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    httpUrl: "http://127.0.0.1:8080/",
    httpImageUrl: "http://127.0.0.1:8080/img/",
    proInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("项目详情页面获取id未：", options.id);
    //根据id获取该页面需要的数据  分析：imageurl、项目名称、项目价格、项目描述、项目步骤
    wx.request({
      url: that.data.httpUrl + 'project/getProInfoById',
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("获取的项目信息为：", res.data);
        that.setData({
          proInfo: res.data.data
        })
      }
    })

  },
  toOrder: function (e) {
    //通过,e.currentTarget.dataset.id取出传递的参数id
    console.log("点击立即悦动", e.currentTarget.dataset.id)
    //跳转到项目的详情页面，发送项目id
    wx.navigateTo({
      url: '/pages/order/order?id=' + e.currentTarget.dataset.id,
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