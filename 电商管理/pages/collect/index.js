// pages/collect/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 收藏的数据
    collect: [],
    tabs: [
      {
        id: 0,
        value: '商品收藏',
        isActive: true,
      },
      {
        id: 1,
        value: '品牌收藏',
        isActive: false,
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false,
      },
      {
        id: 3,
        value: '浏览历史',
        isActive: false,
      },
    ],
  },

  // 接收子组件传递的索引值，切换tab栏
  async handertabChange(e) {
    // 获取当前点击的索引
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((ele, i) => (ele.isActive = i === index))
    this.setData({
      tabs,
    })
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
    let collect = wx.getStorageSync('collect')||[]
    this.setData({
      collect
    })
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
