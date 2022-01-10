import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodObj:{}
  },
  theGoods:[],
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const { goods_id } = options
    this.getDetail(goods_id )
  },
  async getDetail(goods_id ) {
    const res = await request({
      url: "/goods/detail",
      data:{goods_id} 
    })
    this.theGoods = res
    this.setData({
      goodObj: {
        goods_name:res.goods_name,
        goods_price:res.goods_price,
        goods_introduce:res.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:res.pics,
    }
    })
  },
  // 预览轮播图图片
  handelPrecewImage(e) {
    const urls = this.theGoods.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})