
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {reject(err)},
      complete: () => {}
    });
      
  })
}
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {reject(err)},
      complete: () => {}
    });
      
  })
}
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {reject(err)},
      complete: () => {}
    });
      
  })
}

export const showModal = ({content}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      confirmColor: '#ff6700',
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export const showToast = ({title}) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      mask: true,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout:10000,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {}
    });
  })
}
/**
 * promise形式的小程序的支付
 * @param {object} pay 支付所必要的参数
 */
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => reject(err),
      complete: () => {}
    });
      
  })
}