import { request } from '../../request/index.js'
import { requestPayment, showToast } from '../../untils/asyncWx.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 地址信息
    address: {},
    goodsList: [],
    totalPrice: 0,
    totaalNum: 0,
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
    const carts = wx.getStorageSync('cart') || []
    let cart = carts.filter((v) => v.checked)
    let totalNum = 0
    let totalPrice = 0

    // 根据复选框状态设置全选状态
    cart.forEach((item) => {
      totalNum += item.num
      totalPrice += item.num * item.goods_price
    })

    this.setData({
      goodsList: cart,
      totalPrice,
      totalNum,
      address,
    })
  },
  async handelOrderPay() {
    try {
      const token = wx.getStorageSync('token')
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        })
        return
      }
      // 创建订单
      // 准备请求头参数
      // const header = { Authorization: token }
      // 准备请求体参数
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address.all
      const goodsList = this.data.goodsList
      let goods = []
      goodsList.forEach((v) =>
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price,
        })
      )
      const orderParams = { order_price, consignee_addr, goods }
      // 发送请求，创建订单，获取订单编号
      const { order_number } = await request({
        url: '/my/orders/create',
        method: 'post',
        data: orderParams,
      })
      console.log(order_number)
      // 发起预支付
      const { pay } = await request({
        url: '/my/orders/req_unifiedorder',
        method: 'POST',
        data: { order_number },
      })
      console.log(pay)
      // 发起微信小程序支付
      // 由于不是企业号，无权限支付
      await requestPayment(pay)
      // 查看订单支付状态
      const { payStatus } = await request({
        url: '/my/orders/chkOrder',
        method: 'POST',
        data: { order_number },
      })
      await showToast({ title: '支付成功' })
      this.DelStorageData()
      console.log(payStatus)
      wx.navigateTo({
        url: '/pages/order/index',
      })
    } catch (error) {
      await showToast({ title: '支付失败' })
      this.DelStorageData()
      console.log(error)
      wx.navigateTo({
        url: '/pages/order/index',
      })
    }
  },
  // 手动删除缓存中的数据
  DelStorageData() {
    let goodsList = wx.getStorageSync('cart')
    let newGoodsList = goodsList.filter((v) => !v.checked)
    wx.setStorageSync('cart', newGoodsList)
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
