<template>
  <div id="app">
    <!-- 根组件 -->
    <my-header></my-header>
    <router-view></router-view>
    <my-footer v-show="!$route.meta.hidden"></my-footer>
  </div>
</template>

<script>
import MyHeader from '@/components/Header/MyHeader.vue'
import MyFooter from '@/components/Footer/MyFooter.vue'
export default {
  name: 'App',
  components:{
    MyHeader,
    MyFooter
  },
  mounted(){
    this.$store.dispatch('categoryList')
  }
}
</script>

<style lang="less" scoped>
</style>