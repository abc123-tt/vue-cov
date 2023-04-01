<template>
  <div class="covDataBox"> 
    <el-tabs v-model="activeName" type="card" >
      <el-tab-pane label="地区风险" name="first">
        <RiskArea></RiskArea>
      </el-tab-pane>
      <el-tab-pane label="国内数据" name="second">
        <InternalData></InternalData>
      </el-tab-pane>
      <el-tab-pane label="全球数据" name="third">
        <GlobalData></GlobalData>
      </el-tab-pane>
      <el-tab-pane label="新冠疫苗" name="fourth">
        <CoronaVac></CoronaVac>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RiskArea from '../../components/navCpt/RiskArea.vue'
import InternalData from '../../components/navCpt/InternalData.vue'
import GlobalData from '../../components/navCpt/GlobalData.vue'
import CoronaVac from '../../components/navCpt/CoronaVac.vue'
export default {
  name: '',
  data() {
    return {
      activeName: 'first'
    }
  },
  props: {
  },
  components: {
    RiskArea,
    InternalData,
    GlobalData,
    CoronaVac
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
.covDataBox {
  margin-top:20px;
}

.el-tabs {
  width: 100%;
  z-index: 111;
  /deep/.el-tabs__nav {
    width: 100%;
    border-radius:8px 8px 0 0;
    background-color: #e6edff;
  }
  /deep/.el-tabs__item {
    width:25%;
    font-size: 12px;
    border:1px solid transparent;
    border-radius: 10px 10px 0 0;
    text-align: center;
    font-size: 16px;
  }
  /deep/.is-active{
    background-color: #fff;
    
  }

}
</style>