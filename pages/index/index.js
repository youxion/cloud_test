// pages/index/index.js
const common = require("../../utils/comment.js");

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImg: [{
        src: "/images/index/banner/0.jpg"
      },
      {
        src: "/images/index/banner/1.jpg"
      },
      {
        src: "/images/index/banner/2.jpg"
      },
      {
        src: "/images/index/banner/3.jpg"
      },
      {
        src: "/images/index/banner/4.jpg"
      }
    ],
    newList: [],
    userInfo: {}

  },

  
  /* 获取用户的数据信息 */ 
  getUserData:  function (e) {
    app.globalData.userInfo = e.detail.userInfo; //=======
    console.log(app.globalData.userInfo)
     this.setData({
       userInfo: e.detail.userInfo
     })
  },

  toDetail: (e) => {
    console.log(e) 
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })

  },

  /* 获取小程序的openId */ 
  getOpenid: function () {
    wx.cloud.callFunction ({
      name: "pay",
      success: function (res) {
        console.log(res)

      },
      fail: function (err) {
        console.log(err)
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }else {
      console.log("no userInfo")
    }

    let list = common.getNewList();
    this.setData({
      newList: list
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})