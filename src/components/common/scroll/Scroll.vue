<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script scoped>
import BScroll from 'better-scroll'
export default {
  name:"scroll",
  props:{
    probeType: {
      type:Number,
      default:0
    },
    pullUpLoad: {
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll:null
    }
  },

  mounted() {
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    //监听滚动的位置
    if(this.probeType ===2 || this.probeType ===3) {
      this.scroll.on('scroll', ( position ) => {
        // console.log(position);
        //对外发射自定义事件
        this.$emit('scroll', position)
      })
    }
    //3.监听scroll滑动到底部
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多');
        this.$emit('pullingUp')
      })
    }
  },

  methods:{
    scrollTo(x, y, time=500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      // console.log('***');
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
}
</script>

<style scoped>

</style>