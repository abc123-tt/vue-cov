<template>
  <div class="container">
    <el-card class="first_card">
      <div>新冠病毒疫苗是一种什么药？</div>
      <p>接种后可刺激人体产生针对新型冠状病毒（2019-nCoV）的抗体，从而为受种者提供免疫保护，抵御新型冠状病毒感染人体或导致发病。</p>
      <a href="#">查看详情</a>
    </el-card>
    <el-card class="cardList" v-for="(item, index) in newsData" :key="index">
      <div style="display:flex;width:100%;">
        <div class="left">
          <img :src="item.imgSrc" alt="">
        </div>
        <div class="right">
          <div>{{item.tit}}</div>
          <p>{{item.desc}}</p>
          <a :href="item.detailSrc">查看详情</a>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CoronaVac',
  data() {
    return {
      newsData: [
        {
          tit: '所有人都能接种吗？',
          imgSrc: require('../../assets/images/cov1.jpg'),
          desc: '接种新冠病毒疫苗的效果如何？保护期有多久？可以和其他疫苗一起接种吗？',
          detailSrc: ''
        },
        {
          tit: '新冠疫苗分几种？',
          imgSrc: require('../../assets/images/cov2.jpg'),
          desc: '不同疫苗种类的优缺点是什么？如何进行选择？',
          detailSrc: ''
        },
        {
          tit: '新冠疫苗接种方法',
          imgSrc: require('../../assets/images/cov3.jpg'),
          desc: '新冠病毒疫苗接种频率？剂次？每次间隔多久？',
          detailSrc: ''
        },
        {
          tit: '疫苗不良反应',
          imgSrc: require('../../assets/images/cov4.jpg'),
          desc: '接种新冠病毒疫苗可能出现哪些不良反应？如何处理？',
          detailSrc: ''
        },
        {
          tit: '紧急上市的研发流程',
          imgSrc: require('../../assets/images/cov5.jpg'),
          desc: '国内疫苗的研发和上市进度怎么判断？',
          detailSrc: ''
        },
      ]
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
.container {
  padding: 0 20px;

  .first_card {
    margin-bottom: 20px;
  }

  .cardList {
    margin-bottom:20px;
    .left {
      img {
        width: 112px;
        height: 112px;
      }
    }

    .right {
      padding-left: 10px;
      width:100%;
      a {
        padding-top: 10px;
      }
    }
  }

  div {
    font-size: 20px;
  }

  a {
    color: #4169e2;
    display: block;
    text-align: right;
  }

  p {
    padding: 3px 0;
    color: #666;
    min-height: 0.48rem;
  }

}
</style>