import {request} from "../../request/index"
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsLists: [],

  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  total: 1,
   
  // 接收子组件传递的索引值，切换tab栏
  handertabChange(e) {
    // 获取当前点击的索引
    const { index } = e.detail
    // 修改data中导航栏的值
    let { tabs } = this.data
    tabs.forEach((ele, i) => ele.isActive =(i === index) )
    this.setData({
      tabs
    })
  },
  // 获取商品列表数据
  async getGoodList() {
    const res = await request({
      url: "/goods/search",
      data: this.QueryParams
    })
    console.log(res);
    // 获取总页数
    this.total = Math.ceil(res.total / this.QueryParams.pagesize)
    console.log(this.total);
    this.setData({
      goodsLists: [...this.data.goodsLists,...res.goods]
    })
    // 关闭下拉刷新窗口
    wx.stopPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodList()
  },
  // 上滑触底
  onReachBottom() {
    // 到底啦
    if (this.QueryParams.pagenum >= this.total) {
      // 显示提示弹框
      wx.showToast({title: '到底啦！！'});
    } else {
      // 加载下一页
      this.QueryParams.pagenum++
      this.getGoodList()
    }
  },

  // 监听用户下拉动作
  onPullDownRefresh: function () {
    this.QueryParams.pagenum = 1
    this.setData({
      goodsLists:[]
    })
    this.getGoodList()
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})