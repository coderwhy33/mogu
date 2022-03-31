<template>
  
</template>

<script>
export default {
  name: "TabContent",
  components: {
    Scroll,
    TabContentCategory,
    TabContentDetail,
  },
  props: {
    subcategories: {
      type: Object,
      default() {
        return {};
      },
    },
    categoryDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>