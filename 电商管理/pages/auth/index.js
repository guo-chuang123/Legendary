import { request } from '../../request/index.js'
import { login ,showToast} from '../../untils/asyncWx.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  async GetUserinfo(e) {
    try {
      // 获取用户信息
      const { encryptedData, rawData, iv, signature } = e.detail
      // 获取小程序登录成功后的code
      const { code } = await login()
      const loginParams = { encryptedData, rawData, iv, signature, code }
      // 发送请求，获取token
      // let { token } = await request({
      //   url: '/users/wxlogin',
      //   data: loginParams,
      //   method: 'post',
      // })
      // if (token === null)
      let  token =
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'

      // 把token存入缓存，并跳转回上一个界面
      wx.setStorageSync('token', token)
      await showToast({title:"授权成功！"})
      wx.navigateBack({
        delta: 1,
      })
    } catch (error) {
      await showToast({title:"授权失败，请稍后重试！"})

      console.log(error)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
