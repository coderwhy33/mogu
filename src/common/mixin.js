// import { debounce } from 'common/utils'
import BackTop from "components/content/backtop/BackTop";
import { BACK_POSITION } from "common/const"
// export const itemListenerMixin = {
//   mounted() {
//     //1.图片加载完成的事件监听
//     const newRefresh = debounce(this.$refs.scroll.refresh, 500)
//     // 监听item中图片加载完成
//     this.$bus.$on('itemImageLoad',this.itemListenerMixin)
//     console.log('我是混入中的内容');
//   }
// }

export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop:false
    }
  },
  methods:{
    backTop() {
      this.$refs.scroll.scrollTo(0,0,300)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACK_POSITION
    }
  }
}