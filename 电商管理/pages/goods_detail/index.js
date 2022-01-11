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
    });
  },
  // 点击加入购物车
  handerCatAdd(e) {
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync('cart') || []
    // 判断该商品是否在购物车中，不是返回-1
    let index = cart.findIndex(item => item.goods_id === this.theGoods.goods_id)
    if (index === -1) {
      // 商品第一次添加
      this.theGoods.num = 1
      cart.push(this.theGoods)
    } else {
      // 已存在购物车，直接++
      cart[index].num++
    }
    // 把购物车重新添加至缓存
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '添加成功',
      icon: 'sucess',
      mask: true,//防止手抖
    });
      
  },

})