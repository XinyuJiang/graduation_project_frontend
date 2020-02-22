//app.js
const app=getApp()
const openidurl ='https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code'
const domain = 'https://ecnu-mcvl.cn/wxbackend/'
App({
  globalData: {
    userInfo: null,
    code: '',
    isFirstCode: '',
    openId: '',
    user_id:'',
    mingxiang_resdata:'',
    emotion_resdata:'',
  },
  onLaunch: function () {
    // if (!wx.cloud) {
    //   console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    // } else {
    //   wx.cloud.init({
    //     // env 参数说明：
    //     //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
    //     //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
    //     //   如不填则使用默认环境（第一个创建的环境）
    //     // env: 'my-env-id',
    //     traceUser: true,
    //   })
    // }

    // this.globalData = {}

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var index = this.globalData.user_id
    wx.login({
      success: res => {
        if(res.code){
          this.globalData.code=res.code
          console.log('code:',this.globalData.code)
        }
      }
    })
  },
    //console.log('没登陆', index)
    //while()
    // 登录
    // var that = this

  UserLogin:function(){
        wx.request({
        url: domain + 'register/',
          data: {
          nickname: this.globalData.userInfo.nickName,
          portrait: this.globalData.userInfo.avatarUrl,
          code: this.globalData.code
          },
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },// 使用post时，这里的header不能是application/json
          success: res => {
          console.log('用户登录/注册状态', res.data.msg)
          console.log('return data', res.data.data)
          this.globalData.isFirstCode = res.data.code
          this.globalData.session = res.data.data.session
          console.log('session', this.globalData.session)              
          //var that = this
          console.log(this)
          },
          fail: function(e){
          console.log('登陆出错')
         }

       })
     }
      
  })



