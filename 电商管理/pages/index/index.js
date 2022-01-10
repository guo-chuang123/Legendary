import { request } from '../../request/index.js'
wx -
  Page({
    /**
     * 页面的初始数据
     */
    data: {
      // 轮播图数组
      swiperList: [],
      // 导航数组
      castList: [],
      // 楼层数据 
      floorList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // 获取轮播图数据
      this.getSwiperist()
      // 获取导航数组
      this.getCastList()
      // 获取楼层数组
      this.getFloorList()
    },
    // 获取轮播图数据方法
    getSwiperist() {
      // 使用封装的request方法，通过promise发起异步请求
      request({
        url: '/home/swiperdata',
      }).then((res) => {
        this.setData({ swiperList: res })
      })
    },
    // 获取导航数组数据
    getCastList() {
      request({
        url: '/home/catitems',
      }).then((res) => {
        this.setData({
          castList: res
        })
      })
    },
    getFloorList() {
      request({ url: "/home/floordata" }).then((res) => {
        console.log(res)
        this.setData({
          floorList:res
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
