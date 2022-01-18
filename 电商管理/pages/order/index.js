import { request } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true,
      },
      {
        id: 1,
        value: '待付款',
        isActive: false,
      },
      {
        id: 2,
        value: '代发货',
        isActive: false,
      },
      {
        id: 3,
        value: '退货/退款',
        isActive: false,
      },
    ],
    orders: [],
  },
  // 切换逻辑
  exchangeTab(index) {
    let { tabs } = this.data
    tabs.forEach((ele, i) => (ele.isActive = i === index))
    this.setData({
      tabs,
    })
  },
  // 接收子组件传递的索引值，切换tab栏
  async handertabChange(e) {
    // 获取当前点击的索引
    const { index } = e.detail
    // 修改data中导航栏的值
    this.exchangeTab(index)
    // 重新发起请求
    this.getOrderList(index + 1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  // 发请求获取订单
  async getOrderList(type) {
    const res = await request({
      url: '/my/orders/all',
      data: { type },
    })
    let { orders } = res
    this.setData({
      orders: orders.map((v) => ({
        ...v,
        create_time_cn: new Date(v.create_time * 1000).toLocaleString(),
      })),
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    // 获取小程序页面栈
    let pages = getCurrentPages()
    // 当前页面
    let { type } = pages[pages.length - 1].options
    // 发起请求
    this.getOrderList(type)

    this.exchangeTab(type - 1)
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
