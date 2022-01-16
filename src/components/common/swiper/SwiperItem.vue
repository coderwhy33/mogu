<!--
 * @Author: your name
 * @Date: 2022-01-14 18:50:45
 * @LastEditTime: 2022-01-16 11:56:27
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \mogu\src\components\common\swiper\SwiperItem.vue
-->
<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    flex-shrink: 0;
  }
  .slide img {
    width: 100%;
  }
</style>