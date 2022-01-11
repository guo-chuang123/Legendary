import { getSetting, chooseAddress, openSetting } from '../../untils/asyncWx.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 地址信息
    address: {},
  },
  // 添加收获地址
  async getChooseAddress(e) {
    try {
      //获取权限状态
      const res1 = await getSetting()
      const scopAddress = res1.authSetting['scope.address']
      // 判断授权状态
      if (scopAddress === false) {
        // 用户拒绝过授权，先提示用户打开收钱页面
        await openSetting()
      }
      const address = await chooseAddress()
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
      // 存入缓存
      wx.setStorageSync('address', address)
    } catch (error) {
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
  onShow: function () {
    // 获取缓存中的收货地址
    const address = wx.getStorageSync('address')
    this.setData({
      address
    })
    console.log(address)
  },

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
