<template>
<div class="bottom-bar">
  <div class="check-content">
    <check-button 
      :is-checked="isSelectAll" 
      class="check-button"
      @click.native="checkClick"/>
    <span>全选</span>
  </div>
  <div class="totalPrice">
    合计:{{ totalPrice }}
  </div>
  <div  class="calculate" @click="calcClick">
    去结算({{ checkLength }})
  </div>
</div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price*item.count
      }, 0).toFixed(2) + '元'
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // 方法一：用filter(性能不高)
      // if(this.cartList.length === 0) {
      //   return false
      // }
      // return !(this.cartList.filter(item => !item.checked).length)
      // 方法二：用find
      if(this.cartList.length === 0) {
        return false
      }
      return !this.cartList.find(item => !item.checked)

      //方法三：普通遍历
      // if(this.cartList.length === 0) {
      //   return false
      // }
      // for(let item of this.cartList) {
      //   if(!item.checked) {
      //     return false
      //   }
      // }
      // return true
    }
  },
  methods: {
    checkClick() {
      // console.log('全选被点击了');
      if(this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('您未选中任何商品',1500);
      }
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
  }

  .check-button {
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-right: 5px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 90px;
  }

  .totalPrice {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background:#f00;
    color: #fff;
    text-align: center;
    font-size: 15px;
  }
</style>