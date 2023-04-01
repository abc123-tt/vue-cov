<template>
 <div :class="['bgc' , !isChangeEn?'active':'']" ref="headerBgc">
  <div class="visitor">
    {{visitor}}  <span v-if="isChangeEn">人次已浏览</span><span v-else>Views</span>
  </div>
  <div class="changeLang" @click="changeVersion">
    <i class="fa fa-exchange"></i><a href="#" v-if="isChangeEn">English Version</a><a v-else>中文版</a>
  </div>
 </div>
</template>

<script>
 export default {
   name: '',
   data () {
     return {
      visitor:'4,744,557,458',
      isChangeEn:true
     }
   },
   props: {
   },
   components: {

   },
   methods: {
    changeVersion(){
      this.isChangeEn = !this.isChangeEn;
    }
   },
   mounted() {

   },
   created() {

   },
   watch: {

   },
   computed: {

   },
   filters: {

   }
 }
</script>

<style scoped lang='less'>

  .bgc{
    width: 100%;
    padding-top:30.7%;
    background: url('../assets/images/bgc.png') no-repeat;
    background-position: top;
    background-size: cover;
    justify-content: space-between;
    position: relative;
    .visitor{
      color:#fff;
      position: absolute;
      bottom:10%;
      left:6%;
      font-size: 12px;
    }
    .changeLang{
      position:absolute;
      right:2%;
      top:9%;
      padding:4px 0;
      width:122px;
      text-align: center;
      border-radius: 25px;
      border:0.5px solid hsla(0,0%,100%,.38);
      background-color: rgba(0,0,249,.38);
      i{
        margin-right:5px;
      }
      i,a{
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .active{
    background:url('../assets/images/EnglishBgc.png') no-repeat;
    padding-top:30.7%;
    background-position: top;
    background-size: cover;
  }
</style>