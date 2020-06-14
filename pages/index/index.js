// pages/index/index.js
const common = require("../../utils/comment.js");
let newsData = getApp();

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
    userInfo: {},
    loadFlag: false,
    loadMoreText: "点击加载更多",
    page: 0
  },

  // 加载更多新闻
  loadMoreNews: function () {
    let page = this.data.page;
    page = ++page;
    let getDataLen = page * 5 + 3;
    let allDataLen = newsData.data.news.total;
    console.log(page)
    console.log(newsData.data.news[page]);

    let newsList2 = newsData.data.news[page];
    let newList = this.data.newList.concat(newsList2);
    let that = this;

    // 获取数据
    function getData () {
      that.setData({
        page,
        newList,
        loadFlag: true
      })
      setTimeout(function () {
        that.setData({
          loadFlag: false
        })
        console.log(that.data.loadFlag, "setTimeout");
      },1000)
    }
    
    if (getDataLen < allDataLen){ //数据还没有获取完
      getData(); //获取数据
    }else if (getDataLen === allDataLen) { //数据获取完了
      this.setData({
        loadMoreText: "数据已经到底"
      })
      console.log("数据已经到底")
      getData();
    }else {
      return;
    }
    
    
    

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
      getUserData();
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