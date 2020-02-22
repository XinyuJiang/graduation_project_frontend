// pages/mine/mine.js
const util = require('../../utils/util.js')
const app = getApp()
const domain = 'https://xinyuJiang.cn/psybot/'
const domain_w = 'https://consultant.yiwangchunyu.wang/';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    openid: '',
    user_id: '',
    user_lists:[
      { title: '个人信息', tap: 'toEditInfo' },
      { title: '检测档案', tap:'tomyrecord'},
    ],
    program_lists:[
      { title: '意见反馈', tap: 'tofeedback' },
      { title: '关于我们', tap: 'tointroduce' },
    ],
    windowsheight: wx.getSystemInfoSync().windowHeight,
  },
  touserecord:function(){
    wx.navigateTo({
      url: 'userecord/userecord',
    })
  },
  tomyrecord:function(){
    wx.navigateTo({
      url: 'myrecord/myrecord',
    })
  },
  tofeedback:function(){
    wx.navigateTo({
      url: 'feedback/feedback',
    })
  },
  tointroduce:function(){
    wx.navigateTo({
      url: 'feedback/feedback',
    })
  },
  toEditInfo:function(){
    wx.navigateTo({
      url: 'editinfo/editinfo',
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
    })
    console.log("globalData",app.globalData.userInfo)
    //获取user_id
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }
    this.setData({
      openid: app.globalData.openId,
      user_id: app.globalData.user_id,
    })

  },
  onShow:function(){
  },
  onPullDownRefresh:function(){
    console.log("刷新");
    wx.showNavigationBarLoading();//在当前页面显示导航条加载动画。
    wx.hideNavigationBarLoading();//隐藏导航条加载动画。
    wx.stopPullDownRefresh();//停止当前页面下拉刷新。
    console.log("关闭");

  }

})