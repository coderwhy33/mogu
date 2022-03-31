<template>
<div class="cart-list">
  <!-- <ul>
    <li v-for="(item, index) in $store.state.cartList" :key="index">{{item}}</li>
  </ul> -->
  <scroll class="content" ref="scroll">
    <cart-list-item 
      v-for="(item, index) in cartList" 
      :key="index" 
      :item-info="item"/>
  </scroll>
</div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'
export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  data() {
    return {

    }
  },
}
</script>
<style scoped>
/* @import url(); 引入css类 */
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>