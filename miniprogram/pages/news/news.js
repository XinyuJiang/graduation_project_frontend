const app = getApp()
const util = require('../../utils/util.js')
const domain = 'https://xinyuJiang.cn/psybot/'
Page({
  data: {
    background: [
      'https://xinyuJiang.cn/static/banner/banner1.jpg',
      'https://xinyuJiang.cn/static/banner/banner2.jpg',
      'https://xinyuJiang.cn/static/banner/banner3.jpg'
    ],
    height:'',
    recommend:[   //type0
    ],

    articles: [   //type1
    ],

    audios: [ 
      {picture: "https://xinyujiang.cn/media/background/1.jpg", id: 1, music: "https://xinyujiang.cn/static/mingxiang/1.mp3", title: "呼吸冥想", content: "呼吸冥想 | 调节呼吸帮助你进行放松" },
      {picture: "https://xinyujiang.cn/media/background/2.jpg", id: 2, music: "https://xinyujiang.cn/static/mingxiang/2.mp3", title: "晚间冥想", content: "晚间冥想 | 陪伴你在入睡前进行放松" }
    ],

    currentTab:0,
  },
  
  tolinkpage:function(e){
    console.log("页面编号",e.target.dataset.linkpage)
    var linkpage = e.target.dataset.linkpage
    if(linkpage == 0){
      wx.navigateTo({
        url: '/pages/chat/smalltalk/smalltalk?talkmode=0',
      })
    }
    else if (linkpage == 1){
      var time = util.backendTime(new Date()) 
      var a = time.split(' ')[1]
      var hour = a.split(':')[0]-'0'
      console.log(time + '  '+a +'   '+ hour)
      console.log("小时",hour)
      if(hour>=6 && hour<9){
        wx.navigateTo({
          url: '/pages/playaudio/playaudio?choice=3',  //晨间冥想
        })
      }
      else if (hour >= 9 && hour < 13)
      {
        wx.navigateTo({
          url: '/pages/playaudio/playaudio?choice=1',  //呼吸冥想
        })
      }
      else if (hour >= 13 && hour < 19) {
        wx.navigateTo({
          url: '/pages/playaudio/playaudio?choice=7',  //缓解焦虑
        })
      }
      else{
        wx.navigateTo({
          url: '/pages/playaudio/playaudio?choice=2',  //晚间冥想
        })
      }
   
    }
    else{
      wx.navigateTo({
        url: '/pages/chat/chat/chat',
      })
    }

  },
  //调整图片高度
  imgHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;//图片宽度
    var swiperH = winWid * imgh / imgw + "px"
    this.setData({
      height: swiperH//设置高度
    })
  },

  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    }
    else {
      that.setData({ currentTab: e.target.dataset.current, })
    }
  },
   
  tokp: function (event) {
    var id = event.currentTarget.dataset.id
    console.log(id)
    var type = event.currentTarget.dataset.type
    var recommend = this.data.recommend
    var articles = this.data.articles
    if(type == 0)  //推荐文章
      wx.navigateTo({
         url: "kp-web/kp-web?src=" + recommend[id].src ,
       })
    else       //科普文章
      wx.navigateTo({   
        url: "kp-web/kp-web?src=" + articles[id].src ,
      })
  },



  ////////////冥想部分/////////////////
  getAudio: function () {
    wx.request({
      url: domain + 'mingxiang_list/',
      success: res => {
        var audios = res.data.data
        var blank = { picture: '', id: 0, music: '', titile: '', content: '' }
        if (audios.length % 2 == 1) {
          console.log('返回个数为%d(奇数)', audios.length)
          audios.push(blank)
          console.log(audios)
        }
        this.setData({ audios: res.data.data })
      },
      complete: res => {
        console.log('获取冥想', this.data.audios)
      }
    })
  },
  toaudio: function (e) {
    var choice = e.currentTarget.dataset.index
    console.log(choice)
    wx.navigateTo({
      url: "../playaudio/playaudio?choice=" + choice,
    })
  },


/**
 * 文章获取
 */
getPaper: function(){
  wx.request({
    url: domain + 'paper_list/',
    success:res=>{
      this.setData({
        articles:res.data.data
      })
    },
    complete:res=>{
      console.log(this.data.articles)
      //科普文章倒序
      var articles = this.data.articles
      const len = this.data.articles.length
      for (let j = 0; j < len / 2; ++j) {
        const t = articles[j]
        articles[j] = articles[len - 1 - j]
        articles[len - 1 - j] = t
      }
      this.setData({
        articles: articles
      })

    //乱序科普文章
      var recommend = articles
      const length = len
      for (let i = 0; i < length; ++i) {
        const x = Math.floor(Math.random() * length)
        const y = Math.floor(Math.random() * length)
        const temp = recommend[x]
        recommend[x] = recommend[y]
        recommend[y] = temp
      }
      this.setData({
        recommend: recommend
      })

    }
  })
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发现'
    })
    this.getPaper()
    this.getAudio()
  },

})