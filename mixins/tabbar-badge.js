import {mapGetters} from 'vuex'
// 导出一个mixin对象
export default{
  watch:{
    // 监听total值的变化
    total(){
      // 调用methods中的setBadge方法，重新为tabBar数字徽章赋值
      this.setBadge()
    }
  },
  computed:{
    ...mapGetters('m_cart',['total'])
  },
  onShow(){
    // 在页面展示时设置数字徽标
    this.setBadge()
  },
  methods:{
    setBadge(){
      uni.setTabBarBadge({
        index:2,
        text:this.total+''
      })
    }
  }
}