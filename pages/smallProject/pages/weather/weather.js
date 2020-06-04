// pages/smallProject/pages/weather/weather.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: "",
    weatherNow: {},
    longitude: "",
    latitude: "",
    imgSrc: "/pages/smallProject/images/weather/999.png",
    test: [
      {
        a: '1',
        a1: '11',
        a2: '111',
        a3: '1111',
        a4: '11111',
        a5: '1111111',
      },
      {b: '2'},
      {c: '3'},
      {d: '4'},
      {e: '5'}, 
      {f: '6'}
    ]
  },

 /* picker里面的内容改变时触发，data里面存着选择的地址 */
  changeRegion: function (data) { 
    console.log(data)
    this.setData({
      region: data.detail.value[1]
    })
    console.log(this.data.region)
    this.getWeather();
  },

  getWeather: function () {
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data: {
        location: this.data.region,  
        key: "5533a92233c9444daeafa2ac4c93cfa5"
      },
      success: (data_info) => {
        console.log(data_info)
        let imgCode = data_info.data.HeWeather6[0].now.cond_code;
        // 获取当天的气象数据 
        this.setData({
          weatherNow: data_info.data.HeWeather6[0].now,
          imgSrc: `/pages/smallProject/images/weather/${imgCode}.png`,
        })

        wx.setStorageSync("dataInfo", data_info) // 缓存天气数据

        // console.log(this.data.weatherNow)


      },
      fail: (err) => { //使用上次缓存的数据
        console.log("获取天气数据失败" + err)
        wx.showToast({  
          title: '请连接网络',
          icon: "none",
          duration: 5000
        })

        let data_info = wx.getStorageSync("dataInfo");
        let imgCode = data_info.data.HeWeather6[0].now.cond_code;
        let region = data_info.data.HeWeather6[0].basic.parent_city;
        // 获取当天的气象数据 
        this.setData({
          region,
          weatherNow: data_info.data.HeWeather6[0].now,
          imgSrc: `/pages/smallProject/images/weather/${imgCode}.png`,
        })

      }
      
    })
    
  },

  /* 查看地图详情 */ 
  addressDetail: function () {
    wx.openLocation({
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      scale: 20,
      name: "wang",
      address: "这里是我的详细地址"
    })
  },

  /* 获取当前定位的经纬度、城市名 */
  getPosition: function () {
    let that = this;
    wx.getLocation({
      type: "gcj02",
      isHighAccuracy: true,
      highAccuracyExpireTime: 10000,
      success: function (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })

        // 通过ip请求百度后台，查询ip对应的城市名
        // 这个api若不传ip地址，后天会默认返回请求客户端的ip
        wx.request({
          url: 'https://api.map.baidu.com/location/ip?ak=DnPgHAE3Y2ik0StL4OcLOaoedkUQKvMb&ip=&coor=bd09ll}',
          header: {
            "Content-Type": "application/json"
          },
          success: function (res) {
            console.log(res)
            // let region = [];
            // region[0] = res.data.content.address_detail.province;
           let region = res.data.content.address_detail.city;
            // region[2] = "";
            that.setData({
              region
            })
          },
          fail: function (err) {
            console.log("定位城市失败" + err)
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 获取当前定位的经纬度、城市名，
    this.getPosition();

    // 读取城市信息，查看天气
    this.getWeather();

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