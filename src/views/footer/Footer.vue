<template>
  <div>
    <a class="CovrankingList" href="https://ncov.dxy.cn/ncovh5/view/pneumonia_rumors?target=5&from=dxy">
      <img src="../../assets/images/CovrankingList.png" alt="">
    </a>
    <div class="bottomBox">
      <div class="pic"></div>
    </div>

    
  </div>
</template>

<script>

export default {
  name: 'Footer',
  data() {
    return {

    }
  },
  props: {
  },
  components: {

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
.CovrankingList {
  padding: 20px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  img {
  width: 100%;
  display: block;
  }
}

.bottomBox {
  padding-bottom: calc(0.6rem + env(safe-area-inset-bottom));
  background-color: #f7f7f7;
  padding-top: 1px;

  .pic {
    width: 198px;
    height: 34px;
    margin: 16px auto;
    background-image: url('../../assets/images/bottomPic.png');
    background-size: 100% 100%;
  }
}
</style>