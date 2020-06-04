// pages/smallProject/pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: "1",
        title: '视频1'
        // videoUrl: ''
      },
      {
        id: "2",
        title: '视频2'
      },
      {
        id: "3",
        title: '视频3'
      },
      {
        id: "4",
        title: '视频4'
      }
    ],
    src: '',
    danmuTxt: ""

  },

  // 获取弹幕内容，即input里面输入的内容
  getDanmu: (e) => {
    this.setData({
      danmuTxt: e.detail.value //获取input里面输入的内容
    })
  },

 // 发送弹幕内容
  sendDanmu: () => {
    let text = this.data.danmuTxt;
    this.videoCtx.sendDanmu({
      text,
      color: "red"
    })
  },

  //点击播放视频 
  playVideo: (e) => {
    // 将正在播放的视频停止
    this.videoCtx.stop()

    // 更新接下来要播放的视频地址
    this.setData({
      src: e.currentTarget.dataset.url
    })

    // 播放当前被点击的视频
    this.videoCtx.play()
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