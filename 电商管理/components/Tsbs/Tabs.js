// components/SearchInput/Tsbs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: { 
    tabs: {
      type: Array,
      default:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  onload() {
    console.log(tabs);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击切换导航栏
    handerTab(e) {
      // 获取当前点击的索引
      const {index} =  e.target.dataset
      // 传递给父组件，实现切换
      this.triggerEvent("tabChange",{index})
    },
  }
})
