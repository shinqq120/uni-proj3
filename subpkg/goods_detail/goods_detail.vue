<template>
  <view v-if="goods_info.goods_name" class="goods-detail-container">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in goods_info.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
    <view class="price">￥{{goods_info.goods_price}}</view>
    <!-- 信息区域 -->
    <view class="goods-info-body">
      <!-- 商品名称 -->
      <view class="goods-name">{{goods_info.goods_name}}</view>
      <!-- 收藏 -->
      <view class="favi">
        <uni-icons type="star" size="18" color="gray"></uni-icons>
        <text> 收藏</text>
      </view>
      <!-- 商品导航组件 -->
      <view class="goods_nav">
        <uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
      </view>
    </view>
    <!-- 运费 -->
    <view class="yf">快递：免运费</view>
    </view>
    <!-- 商品详情信息 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
  </view>
</template>

<script>
  export default {
    onLoad(options) {
      // 获取商品id
      const goods_id=options.goods_id
      // 调用请求商品详情数据的方法
      this.getGoodsDetail(goods_id)
    },
    methods:{
      onClick(e){
        if(e.content.text==='购物车'){
          // 跳转到购物车页面
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      },
      preview(i){
        // 调用方法预览图片
        uni.previewImage({
          current:i,
          urls:this.goods_info.pics.map(x=>x.pics_big)
        })
      },
      async getGoodsDetail(goods_id){
        const {data:res} =await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
        if(res.meta.status!==200) return uni.$showMsg()
        res.message.goods_introduce=res.message.goods_introduce.replace(/<img /g,'<img style="display:block;"').replace(/wenp/g,'jpg')
        // 为data中商品详情对象数据赋值
        this.goods_info=res.message
      }
    },
    data() {
      return {
        // 商品详情对象
        goods_info:{},
        // 左侧按钮的配置对象
        options:[{
          icon:'shop',
          text:'店铺'
        },{
          icon:'cart',
          text:'购物车',
          info:2
        }],
        // 右侧按钮的配置对象
        buttonGroup:[{
          text:'加入购物车',
          backgroundColor:'#ff0000',
          color:'#fff'
        },{
          text:'立即购买',
          backgroundColor:'#ffa200',
          color:'#fff'
        }
        ]
      };
    }
  }
</script>

<style lang="scss">
      .goods-detail-container {
      // 给页面外层的容器，添加 50px 的内padding，
      // 防止页面内容被底部的商品导航组件遮盖
      padding-bottom: 50px;
      }
      .goods_nav {
      // 为商品导航组件添加固定定位
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      }
      swiper {
          height: 750rpx;
      image {
          width: 100%;
          height: 100%;
      }
      }
      .goods-info-box{
        padding: 10px;
        padding-right: 0;
        .price{
          color: #c00000;
          font-size: 18px;
          margin: 10px 0;
        }
        .goods-info-body{
          display: flex;
          justify-content: space-between;
          .goods-name{
            font-size: 13px;
            padding-right: 10px;
          }
          // 收藏区域
          .favi {
          width: 120px;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-left: 1px solid #efefef;
          color: gray;
          }
        }
        .yf {
        margin: 10px 0;
        font-size: 12px;
        color: gray;
        }
      }
</style>
