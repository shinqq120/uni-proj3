<template>
  <view class="goods-list">
    <view v-for="(item,i) in goodsList" :key="i" @click="gotoDetail(item)">
      <!-- 为组件动态绑定goods属性值 -->
      <my-goods :goods="item"></my-goods>
    </view>
  </view>
</template>

<script>
  export default {
    // 触底事件
    onReachBottom() {
      if(this.isloading) return
      this.queryObj.pagenum+=1
      this.getGoodsList()
    },
    // 下拉刷新事件
    onPullDownRefresh() {
      // 1.重置关键数据
      this.queryObj.pagenum=1
      this.total=0
      this.isloading=false
      this.goodsList=[]
      // 2.重新发起请求
      this.getGoodsList(()=>uni.stopPullDownRefresh())
    },
    data() {
      return {
        // 是否正在请求数据
        isloading:false,
      queryObj:{
        query:'',
        cid:'',
        // 页码值
        pagenum:1,
        // 每页显示多少条数据
        pagesize:10,
      },
      // 商品列表的数据 
      goodsList:[],
      total:0
      };
    },
    onLoad(options) {
      // 将页面的参数转存到queryObj对象中
      this.queryObj.query=options.query||''
      this.queryObj.cid=options.cid||''
      this.getGoodsList()
    
    },
    methods:{
      // 跳转到商品详情页面
      gotoDetail(item){
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      async getGoodsList(cb){
        // 打开节流阀
        this.isloading=true
        const {data:res}=await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        // 关闭节流阀
        this.isloading=false
        cb&&cb()
        if(res.meta.status!==200) return uni.$showMsg()
        // 为获取的商品数据赋值
        this.goodsList=[...this.goodsList,...res.message.goods]
        this.total=res.message.total
      }
    }
  
  }
</script>

<style lang="scss">

</style>
