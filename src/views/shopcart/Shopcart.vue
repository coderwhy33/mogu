<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车数量：{{ cartLength }}</div>
    </nav-bar>
    <!-- 商品列表展示 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from "vuex"
export default {
 name:'ShopCart',
 components: {
   NavBar,
   CartList,
   CartBottomBar
 },
 computed: {
   ...mapGetters(['cartLength'])
 }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background: var(--color-tint);
    color: #fff;
  }
</style>