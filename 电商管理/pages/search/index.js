import { request } from '../../request/index.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    // 取消按钮是否显示
    isFocus: false,
    // 输入框的值
    inputVal:''
  },
  TimeId: -1,
  // 输入框值改变就会触发的事件
  handleInput(e) {
    let query = e.detail.value
    // 输入不合法，返回
    if (!query.trim()) {
      this.setData({
        isFocus: false,
        goodsList:[]
      })
      return
    }
    this.setData({isFocus:true})
    // 发起请求获取数据 并防抖
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.qsearch(query)
    }, 1000)
  },
  async qsearch(query) {
    const res = await request({ url: '/goods/search', data: { query } })
    console.log(res.goods)
    this.setData({
      goodsList: res.goods,
    })
  },
  // 点击取消，清空搜索列表
  handelCacle() {
    this.setData({
      inputVal:'',
      isFocus: false,
      goodsList:[]
    })
    clearImmediate(this.TimeId)
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
