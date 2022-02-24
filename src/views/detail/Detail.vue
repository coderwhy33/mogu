<template>
<div id="detail">
  
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
  <scroll class="content" 
          ref="scroll" 
          @scroll="contentScroll"
          :probe-type="3">
    
    <detail-swiper :top-images='topImages'/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info ref="params" :param-info="paramInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"/>
    <goods-list ref="recommend" :goods="recommends"/>
  </scroll>
  <detail-bottom-bar @addCart="addToCart"/>
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
</div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'



import {  getDetail,
          Goods,
          Shop,
          GoodsParam,
          getRecommend } 
from 'network/detail'
import { debounce } from 'common/utils'
import { backTopMixin } from 'common/mixin'

import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  mixins:[backTopMixin],
  data() {
    return {
      iid: '',
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: '',
      currentIndex: 0,
    }
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      // console.log('*****');
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    contentScroll(position) {
      //1.获取Y的值
      const positionY = -position.y
      //2.positionY和主题中的值进行对比
      //例如:[[0, 8502, 9052, 9269,Number.MAX_VALUE]
      //positionY在0和8502之间，则index=0
      //positionY在8502和9052之间，则index=1
      //positionY在9052和9269之间，则index=2
      //positionY大于等于9269，则index=3
      let length = this.themeTopYs.length
      //复杂的写法
      // for(let i=0;i < length; i++) {
      //   if(this.currentIndex !== i && ((i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i ===length -1 && positionY >= this.themeTopYs[i]))) {
      //     this.currentIndex = i;
      //     // console.log(this.currentIndex);
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }
      //简单的写法：要知道里面有个Number.MAX_VALUE
      for(let i=0; i<length; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      //是否显示回到顶部
      this.listenShowBackTop(position)
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    addToCart() {
      // console.log('添加购物车');
      //1.获取购物车商品需展示的信息
      const product = {};
      // console.log('product==>', product);
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid
      //2.将商品添加到购物车里
      // this.$store.dispatch('addCart', product).then(res => { console.log(res);})
      this.addCart(product).then(res => {
        this.$toast.show();
      })
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据拿到的iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // console.log(data);
      //1.获取顶部轮播图片数据
      this.topImages = res.result.itemInfo.topImages
      // 2.3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      //4.获取商品的详情信息
      this.detailInfo = data.detailInfo

      //5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //6.获取评论信息
      if(data.rate.list){
        this.commentInfo = data.rate.list[0];
      }
    })
    //3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    }),
    //4.给getThemeTopY赋值(对给this.getThemeTopY赋值进行防抖操作，防止频繁调用)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //简单写法需加
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 100)
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 40px);
  }
</style>