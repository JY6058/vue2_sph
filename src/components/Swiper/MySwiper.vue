<template>
  <div class="swiper-container" ref="mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in list" :key="item.id">
              <img :src="item.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/js/swiper.min.js'
import 'swiper/css/swiper.min.css'
export default {
  name:'MySwiper',
  props:['list'],
  watch:{
    list:{
      immediate:true,
      handler(){
        this.$nextTick(()=>{
                new Swiper (this.$refs.mySwiper, {
                    loop: true, // 循环模式选项
                    autoplay:{
                        delay:2000
                    },
                    
                    // 如果需要分页器
                    pagination: {
                    el: '.swiper-pagination',
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    },
                })        
            })
      }
    }
  }
}
</script>

<style>

</style>