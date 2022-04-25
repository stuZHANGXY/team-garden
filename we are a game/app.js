
App({

  globalData:{
    head : "http://101.37.27.152:9000/",
  },
  onLaunch(){
    var that=this;
    wx.login({  //向小程序自身获得code
      success(res){
        if(res.code){
          wx.request({ //向服务器发送code 
            url: that.globalData.head+'login/'+res.code,
            method:'GET', //向服务器提交
            success(res2){  //code发送成功获得服务器返回内容
              wx.setStorage({ //存储access令牌
                key:"openid",
                data:res2.data.data.openid         
              })
              try {
                wx.setStorageSync('refresh',res2.data.data.session_key ) //存储refresh令牌
              } catch (error) {}
              console.log(res2)
            }
          })
        }
        else{
          console.log("failed")
        }
      }
    })
  },



})