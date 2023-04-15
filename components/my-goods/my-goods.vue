<template>

      <view class="goods-item">
        <!-- 商品左侧图片区域 -->
        <view class="goods-item-left">
          <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
          <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
        </view>
        <!-- 商品右的信息区域 -->
        <view class="goods-item-right">
          <!-- 商品标题 -->
          <view class="goods-name">{{goods.goods_name}}</view>
          <view class="goods-info-box">
            <!-- 商品价格 -->
            <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
            <!-- 商品数量 -->
            <uni-number-box :min="1" :value="goods.goods_count" @change="numChangeHandler" v-if="showNum"></uni-number-box>
          </view>
        </view>
      </view>

</template>

<script>
  export default {
    methods:{
      // 商品的勾选状态发生变化
      radioClickHandler(){
             this.$emit('radio-change',{
               goods_id:this.goods.goods_id,
               goods_state:!this.goods.goods_state
             })
      },
      numChangeHandler(val) {
      // 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
      this.$emit('num-change', {
      // 商品的 Id
      goods_id: this.goods.goods_id,
      // 商品的最新数量
      goods_count: +val
      })
      }
    },
    name:"my-goods",
    // 定义props属性，用来接收外界传递到当前组件的数据
    props:{
      // 商品信息对象
      goods:{
        type:Object,
        default:{}
      },
      // 是否展示图片左侧的radio
      showRadio:{
        type:Boolean,
        default:false
      },
      // 是否展示价格右侧的NumberBox组件
      showNum:{
        type:Boolean,
        default:false
      }
    },

    // 过滤器结点
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    },
    data() {
      return {
     // 默认的空图片
       defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',

      };
    }
  }
</script>

<style lang="scss">
  .goods-item {
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .goods-price {
          color: #C00000;
          font-size: 16px;
        }
      }
    }
  }
</style>