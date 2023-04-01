<template>
  <div class="body">
    <Header></Header>
    <CovHot />
    <AllCovData />
    <Footer></Footer>
    <BackTop></BackTop>
    <div class="appBox">
      <div class="openApp">
        <img src="../../assets/images/logo.png" alt="">
        <p>打开丁香医生App查看更多数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import CovHot from '../../components/CovHot.vue'
import Header from '../../components/Header.vue'
import AllCovData from '../covData/AllCovData.vue'
import Footer from '../footer/Footer.vue'
import BackTop from '../../components/Back.vue' 
export default {
  name: '',
  data() {
    return {

    }
  },
  props: {

  },
  components: {
    Header,
    CovHot,
    AllCovData,
    Footer,
    BackTop
  },
  methods: {


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

<style scoped lang="less">
.body {
  overflow: auto;
}

.appBox {
  position: fixed;
    right: 0;
    bottom:20px;
    left: 0;
    z-index: 90;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.4rem;
    padding:0 20px;
    line-height: 44px;
    transition: bottom .3s;
  .openApp {
    position: relative;
    display: flex;
    flex: 1 1;
    align-items: center;
    justify-content: center;
    height: 44px;
    background-color: #846bff;
    border: 1px solid #846bff;
    border-radius: 25px;
    img {
      width: 21px;
      height: 21px;
    }
    p{
      font-size: 18px;
      color:#fff;
      font-weight: 500;
      margin-left:5px;
    }
  }
}
</style>