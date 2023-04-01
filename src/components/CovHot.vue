<template>
  <div class="box">
    <!-- 疫情热点标题区域 -->
    <div class="tit">
      <span class="colorBlock"></span>
      <img src="../assets/images/covHot.png" alt="">
      <a href="#">查看更多 <i class="fa fa-angle-right"></i></a>
    </div>
    <!-- 疫情最新信息 -->
    <CovInfo />
  </div>
</template>

<script>
import CovInfo from '../components/CovInfo.vue'
export default {
  name: 'CovHot',
  data() {
    return {

    }
  },
  props: {
  },
  components: {
    CovInfo
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

<style scoped lang='less'>
a {
  text-decoration: none;
}

.box {
  padding: 0 15px;

  .tit {
    display: flex;
    align-items: center;
    height: 49px;
    width: 100%;

    .colorBlock {
      width: 4px;
      height: 16px;
      background-color: #4169e2;
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }

    img {
      width: 70px;
      height: 24px;
    }

    a {
      color: #4169e2;
      font-size: 14px;
      margin-left: auto;

      i {
        font-weight: bold;
        font-size: 16px;
        margin-left: 5px;
      }
    }
  }


}
</style>