// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    isData: true, // *声明初始变量true
    //轮播图片容器
    bannerData: [],
    //美甲容器
    navData: [],
    proData: [],
    //后台图片路径
    httpImageUrl: "http://127.0.0.1:8080/img/",
    //后台请求路径
    httpUrl: "http://127.0.0.1:8080/"
  },
  //当上拉刷新触发此函数 
  lower: function () {
    var that = this; //*只有当isData为true是才能发送请求进行查询 
    if (that.data.isData) {
      that.data.page++;
      console.log("当前页面：", that.data.page);
      wx.request({
        url: that.data.httpUrl + 'project/getProinfos',
        data: { page: that.data.page, limit: 10 },
        header: { 'content-type': 'application/json' },
        success(res) {
          var proList = [...that.data.proData, ...res.data.data];
          //*定义临时变量 默认true 
          var isData = true;
          //*当长度大于等于总条数 说明已经是最后一条数据  
          if (proList.length >= res.data.count) { //说明没有数据 赋值为fasle 
            isData = false
          }
          if (res.data.code == 0) {
            that.setData({
              proData: proList, isData: isData //*把false赋值给isData，下一次在上拉刷新时就不是进行发送请求了 
            })
          } else {
            //失败 提示 失败原因 
          }
        }
      })
    }
  },

  toProDetails: function (e) {
    //console.log(e)
    //console.log(e.currentTarget.dataset.id)
    //跳转到项目的详情页面。并携带当前项目的id
    wx.navigateTo({
      url: '/pages/proDetails/proDetails?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this;
    //1.发送请求，获取轮播图信息
    wx.request({
      url: that.data.httpUrl + 'image/queryImageByType', //发送请求
      data: {
        imagetype: 'banner'//传递数据
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        console.log("数据：", res.data)
        if (res.data.code == 0) {  //说明请求成功，把返回的数据，
          that.setData({
            //设置给data中的bannerData
            bannerData: res.data.data

          })
        } else {  //失败  提示   失败原因

        }

      }
    })


    //2.发送请求，获取导航菜单信息 继续在声明周期函数中定义。除了参数传递的值不同  imagetype: 'nav'
    wx.request({
      url: that.data.httpUrl + 'image/queryImageByType', //仅为示例，并非真实的接口地址
      data: {
        imagetype: 'nav'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 0) {  //说明请求成功，把返回的数据，设置给data
          that.setData({
            navData: res.data.data
          })
        } else {  //失败  提示   失败原因

        }

      }
    })

    //3.发送请求，获取项目信息
    wx.request({
      url: that.data.httpUrl + 'project/getProinfos', //发送请求

      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("获取项目信息", res.data)
        if (res.data.code == 0) {  //说明请求成功，把返回的数据，设置给data
          that.setData({
            proData: res.data.data
          })
        } else {  //失败  提示   失败原因

        }

      }
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