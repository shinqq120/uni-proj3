export default{
  // 为当前模块开启命名空间
  namespaced:true,
  state:()=>({
    // 购物车数组
    cart:JSON.parse(uni.getStorageSync('cart')||'[]')
  }),
  // 模块的mutation方法
  mutations:{
    // 更新所有商品的勾选状态
    updateAllGoodsState(state,newState){
      state.cart.forEach(x=>x.goods_state=newState)
      this.commit('m_cart/saveToStorage')
    },
    // 根据Id从购物车中删除对应的商品信息
    removeGoodsById(state,goods_id){
      // 调用数组的filter方法进行过滤
      state.cart=state.cart.filter(x=>x.goods_id!==goods_id)
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },
    // 更新购物车中的商品数量
    updateGoodsCount(state,goods){
      // 根据goods_id查询购物车中对应商品的信息对象
      const findResult=state.cart.find(x=>x.goods_id===goods.goods_id)
      if(findResult){
        // 更新对应商品的数量
        findResult.goods_count=goods.goods_count
        // 持久化存储到本地
        this.commit('m_cart/saveToStorage')
      }
    },
    // 购物车勾选状态
    updateGoodsState(state,goods){
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      // 有对应的商品信息对象
      if (findResult) {
      // 更新对应商品的勾选状态
      findResult.goods_state = goods.goods_state
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
      }
    },
    // 将购物车中的数据持久化存储到本地
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    // 添加到购物车
    addToCart(state,goods){
      const findResult =state.cart.find((x)=>x.goods_id===goods.goods_id)
      // console.log(findResult)
      if(!findResult){
        // 如果购物车没有此商品 push推入
        state.cart.push(goods)
      }else{
        // 如果购物车有这件商品 则更新此商品数量
        findResult.goods_count++
      }
      // console.log(state.cart)
      // 通过commit方法，调用m_cart命名空间下的saveToStorage方法
      this.commit('m_cart/saveToStorage')
    }
  },
  
  // 模块的getters属性
  getters:{
    checkedGoodsAmount(state){
      return  state.cart.filter(x=>x.goods_state)
          .reduce((total,item)=>total+=item.goods_count*item.goods_price,0)
          .toFixed(2)
    },
    checkedCount(state){
      return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count,0)
    },
    // 统计购物车中商品的总数量
    total(state){
      let c=0
      // 循环统计商品的数量 累加到变量c中
      state.cart.forEach(goods=>c+=goods.goods_count)
      return c
    }
  }
}