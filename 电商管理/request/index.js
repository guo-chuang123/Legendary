// 同时发送异步代码的次数
let AjaxCont = 0
export const request = (params) => {
  // 判断url中是否带有/my/字段，请求为私有路径，应带上header token
  let header = {...params.header}
  if (params.url.includes("/my/")) {
    // 拼接上token
    header["Authorization"] = wx.getStorageSync("token");
  }
  // 显示加载中
  AjaxCont++
  wx.showLoading({
    title: '加载中',
    mask:true
})
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      header,
      url:baseUrl+params.url,
      success: (result) => {
        resolve(result.data.message)
      },
      fail: err => reject(err),
      // 无论加载成功或失败，都移除加载中的显示
      complete: () => {
        AjaxCont--
        if (AjaxCont === 0) {
          wx.hideLoading();
        }
      }
    })
  })
}
