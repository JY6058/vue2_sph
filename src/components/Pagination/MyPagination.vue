<template>
  <div class="pagination">
    <h1></h1>
    <button :disabled="pageNo===1" @click="$emit('changePage',pageNo-1)">上一页</button>
    <button :class="{active:pageNo===1}" v-show="startAndEnd.start>1" @click="$emit('changePage',1)">1</button>
    <button v-show="startAndEnd.start>2">...</button>

    <!-- 中间连续页码的地方:v-for、数组、对象、数字、字符串 -->
    <button :class="{active:pageNo===item}" v-for="item in startAndEnd.end" :key="item" v-show="item-startAndEnd.start>=0" @click="$emit('changePage',item)">{{item}}</button>

    <button v-show="startAndEnd.end<totalPage-1">...</button>
    <button :class="{active:pageNo===totalPage}" v-show="startAndEnd.end<totalPage" @click="$emit('changePage',totalPage)">{{totalPage}}</button>

    <button :disabled="pageNo===totalPage" @click="$emit('changePage',pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name:'MyPagination',
  props:['pageNo','pageSize','total','continues'],
  computed:{
    // 总的页数
    totalPage(){
      return Math.ceil(this.total/this.pageSize)
    },
    // 中间连续的开始页数和结束页数
    startAndEnd(){
      let start = 0
      let end = 0
      let {totalPage,continues,pageNo} = this
      if(totalPage<=continues){
        start = 1
        end = totalPage
        return {start,end}
      }else{
        let mid = Math.floor(continues/2)
        if(pageNo-mid<1){
          start = 1
          end = start + continues - 1
        }else{
          if(pageNo+mid>totalPage){
            end = totalPage
            start = end - continues +1
          }else{
            start = pageNo-mid
            end = pageNo + mid
          }
        }
      }
      return {start,end}
    },
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>