// pages/smallProject/pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    list: [
      {
        id: "1",
        title: '视频1',
        videoUrl: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      },
      {
        id: "2",
        title: '视频2',
        videoUrl: "http://ali.cdn.kaiyanapp.com/1591893608228_e0a45647.mp4?auth_key=1591960872-0-0-3b4a1bbbaf31e84b8d115a3018a2227e"
      },
      {
        id: "3",
        title: '视频3',
        videoUrl: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      },
      {
        id: "4",
        title: '视频4',
        videoUrl: "http://ali.cdn.kaiyanapp.com/1591893608228_e0a45647.mp4?auth_key=1591960872-0-0-3b4a1bbbaf31e84b8d115a3018a2227e"
      }
    ],
    src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    danmuTxt: ""

  },
 //pages/smallProject/images/movie/snow.mp4

  // 暂停时显示广告
  pauseHandle: function () {
    this.setData({
      show: true
    })
  },

   // 播放时隐藏广告
   palyHandle: function () {
    this.setData({
      show: false
    })
  },

  // 视频播放失败
  errorHandle: function () {
    wx.showToast({
      title: '播放失败',
      icon: 'none',
      duration: 3000
    })
    
  },

  // 视频缓冲时
  wattingHandle: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 3000
    })
    
  },

  // 加载进度条变化时
  progeressHandle: function () {
    wx.showToast({
      title: '加载进度条变化了',
      icon: 'success',
      duration: 2000
    })
  },

  // 元数据加载完成
  loadMetaDataHandle: function () {
    wx.showToast({
      title: '元数据加载完成',
      icon: 'success',
      duration: 2000
    })
  },

  // 获取弹幕内容，即input里面输入的内容
  getDanmu: function (e) {
    this.setData({
      danmuTxt: e.detail.value //获取input里面输入的内容
    })
  },

  // 生成随机颜色
  getRandomColor: function () {
    const rgb = []
    for (let i = 0 ; i < 3; ++i){
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  },
  

 // 发送弹幕内容
  sendDanmu: function () {
    let text = this.data.danmuTxt;

    //视频播放时，将text内容发送到视频上，都为红色字体
    this.videoCtx.sendDanmu({ 
      text,
      color: this.getRandomColor()
    })
  },

  //点击播放视频 
  playVideo: function (e) {
    console.log(e);
    // 将正在播放的视频停止
    this.videoCtx.stop()

    // 更新接下来要播放的视频地址
    this.setData({
      src: e.currentTarget.dataset.url
      // e.currentTarget.dataset.url获取的是
     //   data-url属性传过来的item.videoUrl值
    })

    // 播放当前被点击的视频
    this.videoCtx.play()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoCtx = wx.createVideoContext('myVedio');
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