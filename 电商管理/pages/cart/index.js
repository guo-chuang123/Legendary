import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from '../../untils/asyncWx.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 地址信息
    address: {},
    goodsList: [],
    allChecked: false,
    totalPrice: 0,
    totaalNum: 0,
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
      address.all =
        address.provinceName +
        address.cityName +
        address.countyName +
        address.detailInfo
      // 存入缓存
      wx.setStorageSync('address', address)
    } catch (error) {
      console.log(error)
    }
  },
  // 重置购物车
  setCart(cart) {
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    // 根据复选框状态设置全选状态
    cart.forEach((item) => {
      if (item.checked) {
        totalNum += item.num
        totalPrice += item.num * item.goods_price
      } else {
        allChecked = false
      }
    })

    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      allChecked,
      goodsList: cart,
      totalPrice,
      totalNum,
    })
  },
  // 复选框选中
  handelChange(e) {
    // 获取该商品id
    const goods_id = e.currentTarget.dataset.id
    let { goodsList } = this.data
    let index = goodsList.findIndex((v) => v.goods_id === goods_id)
    goodsList[index].checked = !goodsList[index].checked

    wx.setStorageSync('cart', goodsList)
    // 设置data中的数据
    this.setCart(goodsList)
  },
  // 全选按钮事件
  allCheckChange() {
    let { goodsList, allChecked } = this.data
    allChecked = !allChecked
    // 根据全选按钮状态,改变复选框状态
    goodsList.forEach((item) => {
      item.checked = allChecked
    })
    this.setCart(goodsList)
  },
  // 增加减少数量
  async numChange(e) {
    const { id, count } = e.currentTarget.dataset

    let { goodsList } = this.data
    let index = goodsList.findIndex((v) => v.goods_id === id)
    if (goodsList[index].num === 1 && count === -1) {
      const res = await showModal({ content: '是否移除该商品' })
      if (res.confirm) {
        goodsList.splice(index, 1)
        this.setCart(goodsList)
      }
    } else {
      goodsList[index].num += count
      this.setCart(goodsList)
    }
    wx.setStorageSync('cart', goodsList)
  },
  // 跳转支付界面
  async goPay() {
    let { address, totalNum } = this.data
    // let isChecked = goodsList.some((item) => {
    //   if (item.checked) {
    //     return true
    //   }
    // })
    if (!address) {
      await showToast({title:'您还没有填写收货地址哦!'})
    }else
      if (totalNum===0) {
      await showToast({title:'您还没有选择商品哦!'})
    } else {
      wx.navigateTo({
        url: '/pages/pay/index'
      });
        
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
    const cart = wx.getStorageSync('cart') || []
    // 设置data中的数据
    this.setCart(cart)
    this.setData({
      address,
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
