// pages/detail/detail.js
const common = require("../../utils/comment.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdd: false,
    // arrCon: [],
    article: {
      id: "356412",
      title: "特写：2019，天安门城楼前的中国",
      poster: "http://image1.chinanews.com.cn/cnsupload/big/2019/10-01/4-426/a7e426b0dd6c43d2bc710fafe810a0d5.jpg",
      add_date: "2019-10 - 01",
      content: "对于普通民众而言，一场阅兵式，军事装备展示无疑最令人期待。这个昔日饱经炮火、战乱洗礼的民族，此刻正在集中向世界展示70年来国家的发展进步。\n  习近平曾说: “我经常看中国近代的一些史料，一看到落后挨打的悲惨场景就痛彻肺腑！”谈及百余年前的甲午战争，他称之为“剜心之痛”。\n今天，中国自主研发的东风-41洲际战略核导弹、巨浪-2导弹等尖端武器揭开神秘面纱，在长安街上鱼贯而过，中外记者手中的相机，记录下中国军队的透明姿态。由轰-6N新型远程战略轰炸机领衔的160余架各型飞机编成的空中梯队剑舞苍穹，俯瞰它所守护的中华大地。\n70年前，在开国大典的阅兵式上，受阅的飞机仅有17架。飞机不够，要飞两遍。“70年，弹指一挥间。新时代的中国，早已是山河无恙、国富兵强，我们的飞机再也不用飞第二遍了。此时此刻，我们足以告慰先烈：这盛世，如您所愿。”这段源自网友的概括，构成70年间中国人的情感共鸣。\n数百年来，无论顺境还是逆境，中国人不输出问题，也没有通过强买强卖、掠夺别国发展自己，而是依靠“自己的担子自己扛”、在改革开放中同世界深度互动，实现了发展和繁荣。\n70年来，经济总量从新中国成立之初的600多亿元(人民币，下同)到2018年突破90万亿元，人均国内生产总值从119元增加到64644元，成为世界第二大经济体。连续多年，中国对世界经济增长的贡献率保持在30% 左右。关乎民生福祉的各项指标也持续攀升。和平发展杠杆的两端，一头挑起国家的进益，一头担着民族的复兴。\n中国人珍视“以和为贵”的价值传承，自古倡导“强不执弱、富不侮贫”。过去70年，中国没有主动挑起任何一场战争和冲突，没有侵占过别国一寸土地。改革开放以来，中国主动裁减军队员额400余万，不断向世界传递“和”的理念与信号。在之前的多个国际场合中，习近平均强调“无论发展到哪一步，中国都永远不称霸、永远不搞扩张，永远不会把自身曾经经历过的悲惨遭遇强加给其他民族”。\n70年来，中国的国际形象早已超越熊猫、长城与功夫。作为一个负责任大国的形象日益饱满，这个国家提出的人类命运共同体理念写入了联合国决议，中国的发展快车，为他国带来兼顾舒适度与安全性的席位，亦为各方争取和提供更多共赢平台。\n如今，在北京城古老的建筑身旁，“人类命运共同体”彩车现身长安街，传递出中国与世界“天下大同”“有容乃大”的共存格局。中国人始终坚信，推动构建人类命运共同体，不是倡导每个国家必须遵循统一的价值标准，更不是一种制度替代另一种制度，而是主张不同社会制度、不同意识形态、不同历史文明、不同发展水平的国家，在国际活动中目标一致、利益共生。"
    },
  },

/* 取消收藏 */
  cancleFavor: function () {
    let article = this.data.article;
    wx.removeStorageSync(article.id);
    this.setData({
      isAdd: false
    })

    // 提示用户取消收藏
    wx.showToast({
      title: '取消收藏',
      icon: "success",
      duration: 2000  //提示消息的持续时间
    }) 
  },

  /* 添加收藏 */
  addFavor: function() {
    let article = this.data.article;
    // console.log(this, "page")
    wx.setStorageSync(article.id, article);
    this.setData({
      isAdd: true
    })

    // 提示用户收藏成功
    wx.showToast({
      title: '收藏成功',
      icon: "success",
      duration: 2000  //提示消息的持续时间
    })
  },
  

  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // let content = this.data.article.content;
    // // console.log(content)
    // let arrCon = content.split('\n');
    // this.setData({
    //   arrCon
    // })
    // console.log(this.data.arrCon)

    // console.log(options)
    let id = options.id;
    
    /* 别点击后，展示对应id的新闻 */ 
    let favorNews= wx.getStorageSync(id); //获取id对应的key值（为新闻列表对象）
    if (favorNews) { //有id对应的收藏新闻，则直接从缓存区载入数据
      this.setData({
        isAdd: true,
        article: favorNews 
      })
    } else { //无id对应的收藏新闻
      let message = common.getNewsDetail(id);
      if (message.code === "200") {
        this.setData({
          article: message.news
        })
      }
    }


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