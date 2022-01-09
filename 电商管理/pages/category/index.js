// pages/category/index.js
import { request } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 分类名数据数组
    MenuList: [],
    // 详情分类数组
    contentList: [],
    // 当前点击的分类
    currentIndex: 0,
  },
  catesList: [],

  // 点击切换分类
  handleTep(e) {
    let { index } = e.target.dataset

    let contentList = this.catesList[index].children
    this.setData({
      currentIndex: index,
      contentList,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断本地是否有数据
    const Cates=wx.getStorageSync("cates");
    if (!Cates) {
      // 本地无数据，发起请求
      this.getCates()
    } else {
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCates()
      } else {
        console.log("123");
      }
    }
    // 获取分类数据
  },
  // 获取分类数据
  getCates() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
    }).then((result) => {
      this.catesList = result.data.message

      // 把接口的数据存入本地存储
      wx.setStorageSync("cates", { time: Date.now(), data: this.catesList })

      let MenuList = this.catesList.map((v) => v.cat_name)
      let contentList = this.catesList[0].children
      this.setData({
        MenuList,
        contentList,
      })
    })
  },
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
