<template>
  <div class="contextBody">
    <!-- 广告 -->
    <div class="guidePic">
      <img src="../../assets/images/covGuide.png" alt="">
    </div>
    <!-- 标题 -->
    <Title>
      <template slot="tit">
        <h3>国内疫情趋势</h3>
      </template>
    </Title>
    <!-- 曲线图 -->
    <!-- <Scroll :btnArr="navBtnArr" :ulClass="ul_class" :divId="div_Id"></Scroll> -->
    <div class="scroll-box">
      <div class="scroll">
        <ul class="swiper">
          <li>
            <div id="chart1"></div>
          </li>
          <li>
            <div id="chart2"></div>
          </li>
          <li>
            <div id="chart3"></div>
          </li>
          <li>
            <div id="chart4"></div>
          </li>
          <li>
            <div id="chart5"></div>
          </li>
          <li>
            <div id="chart6"></div>
          </li>
          <li>
            <div id="chart7"></div>
          </li>
        </ul>
        <a href="javascript:;" class="btn left-arrow" @click="moveCharts('prev')"><i class="fa fa-angle-left"></i></a>
        <a href="javascript:;" class="btn right-arrow" @click="moveCharts('next')"><i class="fa fa-angle-right"></i></a>
      </div>
      
      <!-- <NavBtn>
        <template slot="navBtn">
          <li class="intNav" v-for="(item, index) in navBtnArr" :key="item.id" @click="handleCharts(index)"
            :class="{ isActive: flag === index }">{{ item.tit }}</li>
        </template>
      </NavBtn> -->
      <nav class="control">
      <ul>
        <!-- <slot name="navBtn">1填点什么吧...</slot> -->
        <li class="intNav" v-for="(item, index) in navBtnArr" :key="item.id" @click="handleCharts(index)"
            :class="{ isActive: flag === index }">{{ item.tit }}</li>
      </ul>
    </nav>
    </div>
    <!-- 表格 -->
    <el-table :height="tHeight" class="table" :data="covCaseDataInfo" ref="covCaseTable" @cell-click="handleRowHandle">
      <el-table-column type="expand" label="#" class="expand">
        <template v-slot="scope">
          <el-table :data="scope.row.children">
            <el-table-column width="47%"></el-table-column>
            <el-table-column prop="ch_city"></el-table-column>
            <el-table-column prop="ch_currentConfirm"></el-table-column>
            <el-table-column prop="ch_countConfirm"></el-table-column>
            <el-table-column prop="ch_countDead"></el-table-column>
            <el-table-column prop="ch_countCure"></el-table-column>
            <el-table-column></el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column prop="area" label="地区"></el-table-column>
      <el-table-column prop="currentConfirm" label="现存确诊"></el-table-column>
      <el-table-column prop="countConfirm" label="累计确诊"></el-table-column>
      <el-table-column prop="countDead" label="死亡"></el-table-column>
      <el-table-column prop="countCure" label="治愈"></el-table-column>
      <el-table-column label="疫情">
        <a href="#" style="color:#4169e2">详情 <i class="fa fa-angle-right"></i></a>
      </el-table-column>
    </el-table>
    <a class="openMore" v-if="brandFold" @click="openMore('open')">展开更多<i class="fa fa-angle-down"></i></a>
    <a class="openMore" v-else @click="openMore('close')">收起<i class="fa fa-angle-up"></i></a>
    <p class="table-tip">
      数据来源：国家及各省市地区卫健委
    </p>
  </div>
</template>

<script>
import Title from './Title.vue'
// import NavBtn from './NavBtn.vue'
// import Scroll from './Linecharts.vue'
const local = require('../../api/localData-api')
// import {PublicModules} from '../../utils/chartsPublic'
export default {
  name: '',
  // mixins:[PublicModules],
  data() {
    return {
      navBtnArr: [
        { id: 1, tit: "新增确诊" },
        { id: 2, tit: "新增境外输入" },
        { id: 3, tit: "累计境外输入" },
        { id: 4, tit: "现存确诊" },
        { id: 5, tit: "累计确诊" },
        { id: 6, tit: "累计治愈" },
        { id: 7, tit: "累计死亡" },
      ],
      // ul_class:'swiper',
      // div_Id:['chart1','chart2','chart3','chart4','chart5','chart6','chart7'],
      // 疫情信息表格数据
      covCaseDataInfo: [],
      // 控制展开收起
      brandFold: true,
      // 表格一行的高度
      tHeight: 580,
      isActive: true,
      flag: 0, 
    }
  },
  props: {
  },
  components: {
    Title,
    // NavBtn,
    // Scroll
  },
  methods: {
    async getCovData() {
      const res = await local.getFun('/citys')
      this.covCaseDataInfo = res.covCaseInfo
    },
    
    // 点击导航按钮时的处理函数
    handleCharts(i) {
      this.flag = i
      const mapBox = document.querySelector('.swiper');
      const mapEle = document.querySelector('#chart1');
      const mapWidth = mapEle.offsetWidth + 20
      let index = 0
      index = this.flag
      mapBox.style.left = `${-index * mapWidth}px`
    },
    // 左右按钮
    moveCharts(str) {
      const mapBox = document.querySelector('.swiper');
      const mapEle = document.querySelector('#chart1');
      const mapWidth = mapEle.offsetWidth + 20
      let index = 0
      if (str == 'prev') {
        if(this.flag < 1){
          this.flag = 7
        }
        this.flag--
        index = this.flag
        mapBox.style.left = `${-index * mapWidth}px`
      }
      if (str == 'next') {
        this.flag++
        if(this.flag == 7){
          this.flag = 0
        }
        index = this.flag
        mapBox.style.left = `${-index * mapWidth}px`
      }
    },
    // 点击行可以展开
    handleRowHandle(row, column) {
      if (column.label !== '疫情') {
        this.$refs.covCaseTable.toggleRowExpansion(row)
      }
    },
    // 控制展开与收起
    openMore(str) {
      if (str === 'open') {
        this.tHeight = 1550
        this.brandFold = !this.brandFold
      }
      if (str === 'close') {
        let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.tHeight = h - 400
        this.brandFold = !this.brandFold

      }
    }
    
  },
  mounted() {
    this.getCovData()
    this.$charts.newConfirm("chart1");
    this.$charts.importedCase("chart2");
    this.$charts.countImportedCase("chart3");
    this.$charts.currentConfirm("chart4");
    this.$charts.countConfirm("chart5");
    this.$charts.countCure("chart6");
    this.$charts.countDead("chart7");
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
.contextBody {
  .guidePic {
    padding: 0 20px 10px 20px;
    border-bottom: 0.5px solid #eee;

    img {
      width: 100%;
    }
  }

  .scroll-box {
    width: 100%;

    .scroll {
      position: relative;
      margin: auto;
      width: 375px;
      height: 201px;
      // overflow: hidden;

      /deep/.el-card__body {
        padding: 0;
      }

      .swiper {
        display: flex;
        position: absolute;
        left: 0;
        top: 0;
        // 过渡动画
        transition: all .3s ease-in-out;
        // border: 1px solid red;
        li {
          margin-right: 20px;

          div {
            box-sizing: border-box;
            box-shadow: 0 .02rem .06rem rgba(0, 0, 0, .05);
            border: 0.005rem solid #ebebeb;
            width: 377px;
            height: 201px;
          }
        }
      }
    }
    .btn {
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      background-color: rgba(166, 166, 166, .8);
      border-radius: 50%;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      position: absolute;
      top: 50%;
      // left: 0;
      // left: 0;
    }

    .left-arrow {
      left: 5px;
    }

    .right-arrow {
      right: 5px;
    }
  }

  .control {
    padding: 12px 20px;

    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 6px;
        font-size: 14px;
        padding: 6px 10px;
        background-color: #f7f7f7;
        cursor: pointer;
      }

      .isActive {
        background-color: #f1f5ff;
        color: #4169e2;
      }
    }
  }
    .intNav {
      padding: 6px 12px;
      margin-top: 5px;
      font-size: 12px !important;
    }

    .openMore {
      padding: 10px 20px;
      display: block;
      color: blue;
      font-size: 14px;
      text-align: center;

      i {
        margin-left: 5px;
      }
    }

    .table-tip {
      font-size: 12px;
      color: #999;
      padding: 10px 20px;
      border-bottom: 1px solid #eee;
    }
  }

  // 修改表格头部的样式
  /deep/th {
    background-color: #e3e7f3;
    border-right: 1px solid #fff;
    color: #333;
    text-align: center;

    &:nth-child(2) {
      background-color: #f3bab0;
    }

    &:nth-child(3) {
      background-color: #e69a8d;
    }

    &:nth-child(4) {
      background-color: #b4c0d5;
    }

    &:nth-child(5) {
      background-color: #95db9a;
    }
  }

  /deep/.el-table__header-wrapper {

    th {
      padding: 0;

      .cell {
        padding: 5px;

      }
    }
  }

  // 隐藏扩展表格的表头以及表格自带的padding
  /deep/.el-table__expanded-cell {
    padding: 0 !important;

    .el-table__header-wrapper {
      display: none;

    }


  }

  /deep/.el-table__body {
    td {
      padding: 8px 0;
      border-right: 1px solid #fff;
      text-align: right;

      &:nth-child(2) {
        text-align: center;
      }
    }
  }

  /deep/.cell {
    color: #333;
    font-weight: bold;
    padding-right: 5px;
    font-size: 12px !important;
  }
</style>