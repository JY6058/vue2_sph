<template>
   <!-- 商品分类导航 --> 
   <div class="type-nav">
            <div class="container">
                <div @mouseenter="entershow" @mouseleave="removeClass">
                    <h2 class="all">全部商品分类</h2>
                    <transition name="sort">
                        <div class="sort" @click="search" v-show="show">
                            <div class="all-sort-list2" v-nav-current="{index:curIndex,className:'addClass',activeClass:'cur'}">
                                <div class="item" v-for="(item,index) in categorylist" :key="item.categoryId" @mouseenter="throttle(addClass(index),50)">
                                    <h3 class="addClass">
                                        <a href="#" :data-categoryName="item.categoryName" :data-category1Id="item.categoryId">{{item.categoryName}}</a>
                                    </h3>
                                    <div class="item-list clearfix" :style="{display:curIndex===index?'block':'none'}">
                                        <div class="subitem">
                                            <dl class="fore" v-for="data in item.categoryChild" :key="data.categoryId">
                                                <dt>
                                                    <a href="#" :data-categoryName="data.categoryName" :data-category2Id="data.categoryId">{{data.categoryName}}</a>
                                                </dt>
                                                <dd>
                                                    <em v-for="i in data.categoryChild" :key="i.categoryId">
                                                        <a href="#" :data-categoryName="i.categoryName" :data-category3Id="i.categoryId">{{i.categoryName}}</a>
                                                    </em>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
            </div>
        </div>
</template>

<script>
import {mapState} from 'vuex'
// 自定义指令
import navCurrent from '@/directives/navCurrent.js'
export default {
    name:'TypeNav',
    data(){
        return {
            // 用来给元素加背景颜色
            curIndex:-1,
            show:true
        }
    },
    directives:{
        navCurrent
    },
    async mounted(){
        // console.log(this.$route.path)

        if(this.$route.path==='/search'||/^\/detail/.test(this.$route.path)){
            this.show=false
        }
    },
    computed:{
        ...mapState({
            categorylist:state=>state.home.categoryList
        })
    },
    methods:{
        addClass(index){
            this.curIndex = index
        },
        removeClass(){
            this.curIndex = -1
            // if(this.$route.path==='/search'){
            //     this.show = false
            // }
            if(/^\/search/.test(this.$route.path)||/^\/detail/.test(this.$route.path)){
                this.show = false
            }
        },
        debounce(fn,t){
            let timer
            return function(){
                if(timer) clearTimeout(timer)
                timer = setTimeout(()=>{
                    fn()
                },t)
            }
        },
        throttle(fn,t){
            let timer
            return function(){
                if(!timer){
                    timer = setTimeout(()=>{
                        fn()
                        timer = null
                    },t)
                }
            }
        }, 
        search(e){
            e.preventDefault();
            // console.log(e.target.dataset)
            const {categoryname,category1id,category2id,category3id} = e.target.dataset
            if(categoryname){
                let location = {name:'search'}
                // let location = {path:'/search'}
                let query = {categoryName:categoryname}
                if(category1id){
                    query.category1Id = category1id
                }else if(category2id){
                    query.category2Id = category2id
                }else if(category3id){
                    query.category3Id = category3id
                }
                location.query = query
                // 合并params参数
                if(this.$route.params){
                    location.params = this.$route.params
                }
                this.$router.push(location)
            }
        },
        entershow(){
            // console.log(this.$route)
            if(/^\/search/.test(this.$route.path)||/^\/detail/.test(this.$route.path)){
                this.show = true
            }
            // if(this.$route.path==='/search'){
            //     this.show = true
            // }
        }
    }
}
</script>

<style lang="less" scoped>
.type-nav {
        border-bottom: 2px solid #e1251b;
        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    height: 100%;
                    overflow: hidden;
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            // min-height: 460px;
                            height: 100%;
                            overflow: hidden;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        //     .cur{
                        //         background-color: lightblue;
                        //     }
                        // }
                    }
                    .cur{
                        background-color: lightblue;
                    }
                }
            }

            // 添加过渡动画
            .sort-enter,.sort-leave-to{
                height: 0;
            }
            .sort-enter-to,.sort-leave{
                height: 461px;
            }
            .sort-enter-active,.sort-leave-active{
                transition: height 0.5s;
            }
        }
    }
</style>