// pages/smallProject/pages/weather/weather.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: "",
    weatherNow: {},
    longitude: 114,
    latitude: 114,
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
    console.log(this.data)
    this.getWeather();
  },

  getWeather: function () {
    console.log(this.data.region, "qqqqqq")
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

  /* 获取当前定位的经纬度 */
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

        
      }
    })
  },

  /* 获取当前城市名，回地狱法 */
  getCityName: function () {
    let that = this;

    // 通过ip请求百度后台，查询ip对应的城市名
    // 这个api若不传ip地址，后台会默认返回请求客户端的ip
    wx.request({
      url: 'https://api.map.baidu.com/location/ip?ak=DnPgHAE3Y2ik0StL4OcLOaoedkUQKvMb&ip=&coor=bd09ll}',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res)
        let region = res.data.content.address_detail.city;
        that.setData({
          region: region
        })
        console.log("百度定位城市成功: " )
        console.log(that.data)
        that.getWeather();
      },
      fail: function (err) {
        console.log("百度定位城市失败" + err)
      }
    })
  },
  
  /* 获取当前城市名，封装wx.request法 */
  cityWeather: function () {
    let obj1 = {
      url: 'https://api.map.baidu.com/location/ip?ak=DnPgHAE3Y2ik0StL4OcLOaoedkUQKvMb&ip=&coor=bd09ll}'

    };
    let obj2 = {
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data: {
        location: "",  
        key: "5533a92233c9444daeafa2ac4c93cfa5"
      }

    }
    let that = this;
    this.WxRequest(obj1)
    .then(function (res) {
      console.log(res, "obj1")

      //本次promise请求拿到的数据
      let region = res.data.content.address_detail.city; 
      that.setData({
        region: region
      })
      console.log("百度定位城市成功: " )
      console.log(that.data)

      //下一个promise请求：
      obj2.data.location = region; 
      //注意：下一个promise请求所需要的数据一定要从上一步promise请求中拿，
      //     不要去总data里面拿（拿不到）
      console.log(obj2.data.location ,"wwwwwwww")
      return that.WxRequest(obj2)

    }).catch(function (err) {
      console.log(err, "666666666");
      console.log("百度获取城市失败：未联网" + err)
        wx.showToast({  
          title: '请连接网络',
          icon: "none",
          duration: 5000
        })

        let data_info = wx.getStorageSync("dataInfo");
        let imgCode = data_info.data.HeWeather6[0].now.cond_code;
        let region = data_info.data.HeWeather6[0].basic.parent_city;
        // 获取当天的气象数据 
        that.setData({
          region,
          weatherNow: data_info.data.HeWeather6[0].now,
          imgSrc: `/pages/smallProject/images/weather/${imgCode}.png`,
        })
      

    })
    .then(function (res) {
      console.log(res, "obj2")
        let imgCode = res.data.HeWeather6[0].now.cond_code;
        // 获取当天的气象数据 
        that.setData({
          weatherNow: res.data.HeWeather6[0].now,
          imgSrc: `/pages/smallProject/images/weather/${imgCode}.png`,
        })

        wx.setStorageSync("dataInfo", res) // 缓存天气数据

      

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获取对应城市的天气信息（采用回调地狱的方法，请求有先后顺序、请求数目较少时采用）
    // this.getCityName(); （）
     

    // 获取对应城市的天气信息（采用封装wx.request方法，请求有先后顺序、请求数目较多时采用）
    this.cityWeather();
    
    // 获取经纬度
    this.getPosition();

    

    

    

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

  },

  /*
  wx.request的封装
  使用方法：配置一个 attributesObj 对象，直接传入。按照原wx.request的属性写就行（查文档）。
  注意事项：此函数只封装了wx.request里面常用的属性，后续视情况再添加其他不常用属性。
  示例：
       let attributesObj = {
         url: "https://www.baidu.com",
         data {
            name: "Jim",
            age: "20"
         },
         method: "post"
  
       }
  */
  WxRequest: function (attributesObj) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: attributesObj.url || "",

        data: attributesObj.data || "",

        method: attributesObj.method  || "get",

        dataType: attributesObj.dataType || "json",

        responseType: attributesObj.responseType || "text",

        enableCache:  attributesObj.enableCache || "false",

        success: function (res) {
          console.log("WxRequest: 请求成功")
          resolve(res)//设置promise成功标志
        },

        fail: function (err) {
          console.log(err, "WxRequest: 请求失败")
          reject(err)//设置promise失败标志
        }

      })

    });

  }
})





