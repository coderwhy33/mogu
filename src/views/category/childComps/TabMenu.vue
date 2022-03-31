<template>
  <scroll id="tab-menu" ref="scroll">
    <div class="menu-list">
      <div class="menu-list-item"
        v-for="(item, index) in categories"
        :key="index"
        :class="{active:currentIndex == index}"
        @click="itemClick(index)"
      >
        {{ item.title }}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"

export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  props: {
    categories: Array
  },
  // activated() {
  //   this.$refs.scroll.refresh()
  // },
  data() {
    return {
      currentIndex:0
    };
  },
  
  methods: {
    itemClick(index) {
      this.currentIndex = index
      // console.log(`${index}被点击了`);
      this.$emit('selectItem', index)
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
#tab-menu {
  background-color: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 15px;
}

.menu-list-item.active {
  font-weight: 700;
  color: var(--color-height-text);
  background-color: #ff8198;
  border-left: 3px solid var(--color-height-text);
}
</style>