<template>
  <div>
    <type-nav></type-nav>
    <list-container></list-container>
    <today-recommend></today-recommend>
    <goods-rank></goods-rank>
    <u-like></u-like>
    <goods-floor v-for="item in floorList" :key="item.id" :datalist="item"></goods-floor>
    <goods-brand></goods-brand>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer/ListContainer.vue'
import TodayRecommend from '@/views/Home/TodayRecommend/TodayRecomend.vue'
import GoodsRank from '@/views/Home/GoodsRank/GoodsRank.vue'
import ULike from '@/views/Home/ULike/YouLike.vue'
import GoodsFloor from '@/views/Home/GoodsFloor/GoodsFloor.vue'
import GoodsBrand from '@/views/Home/GoodsBrand/GoodsBrand.vue'
import {mapState} from 'vuex'
export default {
  mounted(){
    this.$store.dispatch('floorList')
  },
  computed:{
    ...mapState({
      floorList:state=>state.home.floorList
    })
  },
  components:{
    ListContainer,
    TodayRecommend,
    GoodsRank,
    ULike,
    GoodsFloor,
    GoodsBrand
  }
}
</script>

<style>

</style>