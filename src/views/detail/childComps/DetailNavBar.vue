<template>
<div>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div 
        v-for="(item,index) in titles" 
        :key='index'
        :class="{active:index === currentIndex}"
        class="title-item"
        @click="titleClick(index)"
        >{{ item }}</div>
    </div>
  </nav-bar>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles:['商品', '参数', '评论', '推荐'],
      currentIndex:0
    }
  },
  methods: {
    titleClick(index) {
      // console.log('---');
      this.currentIndex = index;
      this.$emit('titleClick',index);
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
  .title {
    display: flex;
    font-size: 15px;
    /* left: 0;
    right: 0; */
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: #ff5777;
  }

  .back img {
    margin-top: 12px;
  }
</style>