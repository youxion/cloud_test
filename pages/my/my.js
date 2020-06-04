// pages/my/my.js

// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrl: "/pages/smallProject/images/index/lft01.jpg",
    nickName: "",
    isLogin: false,
    number: 0,
    newList: []

  },

  // 获取用户数据，用于授权登录
  getUserData: function (e) {
    // console.log(e.detail.userInfo)
    if (!this.data.nickName) { //若用户之前没有登录过
      let userData = e.detail.userInfo;
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        nickName: userData.nickName,
        imgUrl: userData.avatarUrl,
        isLogin: true
      })
    }
   

    // 查看收藏的新闻
    this.getNewsfavor();

  },

  // 查看收藏的新闻
  getNewsfavor: function () {
    let newsFavor = wx.getStorageInfoSync(); //获取换中的所有key
    let keys = newsFavor.keys;
    let keyNum = keys.length;

    let list =[];
    for (let i = 0; i < keyNum; i++) {
      let obj = {};
      obj = wx.getStorageSync(keys[i]);
      list.push(obj);
    }

    this.setData({
      number: keyNum,
      newList: list

    })

  },
  
  /* 跳转到详情页 */ 
  toDetail: (e) => {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    if (app.globalData.userInfo) {//若用户之前授权登录过，就直接调用本地登录数据
      this.setData({
        nickName: app.globalData.userInfo.nickName,
        imgUrl: app.globalData.userInfo.avatarUrl,
        isLogin: true
      })
    } else if (this.data.canIUse) {//若button按钮open-type="getUserInfo"属性可用
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          nickName: res.userInfo.nickName,
          imgUrl: res.userInfo.avatarUrl,
          isLogin: true
        })
      }
    } else { // 若button按钮open-type="getUserInfo"属性不可用，即当前版本不兼容
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            nickName: res.userInfo.nickName,
            imgUrl: res.userInfo.avatarUrl,
            isLogin: true
          })
        }
      })
    } 
  //  console.log(this.data.userInfo, "userInfo")
    


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
    if (this.data.isLogin) {

      // 查看收藏的新闻
      this.getNewsfavor();

    }

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