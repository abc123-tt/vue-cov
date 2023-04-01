<template>
  <div class="container">
    <!-- 截止时间 -->
    <div class="deadline">
      <span>截至北京时间 <span>{{ deadline }}</span></span>
      <div class="detail"><img src="../../assets/images/problem.png" alt=""><span>数据说明</span></div>
    </div>
    <div class="content">
      <!-- 较昨日比较的数据板块 -->
      <div class="compare">
        <ul>
          <li v-for="(item, index) in countData" :key="index" :style="{ color: item.color }">
            <div>
              <b>较昨日</b><em>{{ item.yesterday >= 0 ? '+' : '' }}{{ item.yesterday }}</em>
            </div>
            <span>{{ item.today }}</span>
            <p>{{ item.tit }}</p>
          </li>
        </ul>
      </div>
      <!-- 标题区域 -->
      <Title class="title">
        <template slot="tit">
          <h3>重点国家疫情数据</h3>
        </template>
      </Title>
      <!-- 导航按钮区域 -->
      <nav class="control">
        <ul>
          <li v-for="(item, index) in arr" :key="item.id" @click="changeItem(index,item.tit)"
            :class="{ isActive: flag === index }">
            {{ item.tit }}</li>
        </ul>
      </nav>
      <!-- 表格区域 -->
      <table width="100%" style=" border-spacing: 0px;border-collapse: collapse;">
        <tr class="table_title">
          <th>地区</th>
          <th>累计确诊</th>
          <th>排序</th>
          <th>累计死亡</th>
          <th>排序</th>
          <th>病死率</th>
          <th>排序</th>
        </tr>
        <tr class="table_body" v-for="item in foreginTableData" :key="item.countryId">
          <td width="15%">{{item.country}}</td>
          <td :class="{'highlight' : flag === 0}">{{item.countConfirm}}</td>
          <td :class="{'highlight' : flag === 0}">{{item.confirmSortId}}</td>
          <td :class="{'highlight' : flag === 1}">{{item.countDead}}</td>
          <td :class="{'highlight' : flag === 1}">{{item.deadSortId}}</td>
          <td :class="{'highlight' : flag === 2}">{{item.deadRate}}%</td>
          <td :class="{'highlight' : flag === 2}">{{item.rateSortId}}</td>
        </tr>
        
      </table>
      <p class="table-tip">
        仅展示累计确诊人数大于等于100的地区
      </p>
      <!-- 标题 -->
      <Title>
        <template slot="tit">
          <h3>国外疫情趋势</h3>
        </template>
      </Title>
      <!-- 提示卡片 -->
      <el-card class="card">
        <p>1、3月19日之前使用 WHO 每日公布的数据（中欧标准时间 10:00）</p>
        <p>2、3月19日开始由于 WHO 数据存在缺失问题，使用丁香园平台数据（北京时间 10:00）</p>
        <p>3、4月24日起，西班牙卫生部调整新冠肺炎确诊数据口径，只发布由PCR检测确诊的数据</p>
      </el-card>

      <!-- 两个轮播图图表的组件抽离 -->
      <Scroll :ulClass="class1" :btnArr="trendArr1" :divId="divId1"></Scroll>

      <Scroll :ulClass="class2" :btnArr="trendArr2" :divId="divId2"></Scroll>

      <!-- 各洲国家疫情数据 -->
      <el-table class="stateTable" :data="stateTableData" ref="statesTable" default-expand-all
        @cell-click="handleRowHandle">
        <el-table-column label="#" type="expand">
          <template v-slot="scope">
            <el-table :data="scope.row.children">
              <el-table-column width="47%"></el-table-column>
              <el-table-column prop="country"></el-table-column>
              <el-table-column prop="ch_currentConfirm"></el-table-column>
              <el-table-column prop="ch_countConfirm"></el-table-column>
              <el-table-column prop="ch_dead"></el-table-column>
              <el-table-column prop="ch_cure"></el-table-column>
              <el-table-column></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="地区" prop="state"></el-table-column>
        <el-table-column label="现存确诊" prop="currentConfirm"></el-table-column>
        <el-table-column label="累计确诊" prop="countConfirm"></el-table-column>
        <el-table-column label="死亡" prop="dead"></el-table-column>
        <el-table-column label="治愈" prop="cure"></el-table-column>
        <el-table-column label="疫情">
          <a href="#" style="color:#4169e2">详情 <i class="fa fa-angle-right"></i></a>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const inter = require('../../api/request-api')
const local = require('../../api/localData-api')
import Title from './Title.vue'
import Scroll from './Linecharts.vue'
import covTableData from '../../plugins/foreignData'
// import NavBtn from './NavBtn.vue'
// import {PublicModules} from '../../utils/chartsPublic'

export default {
  name: 'GlobalData',
  // mixins:[PublicModules],
  data() {
    return {
      
      // 较昨日比较模块的数据
      countData: Array,
      // 导航按钮
      arr: [
        { id: 1, tit: "累计确诊" },
        { id: 2, tit: "累计死亡" },
        { id: 3, tit: "病死率" }
      ],
      trendArr1: [
        { id: 1, tit: '国外新增确诊' },
        { id: 2, tit: '国外累计确诊' },
        { id: 3, tit: '国外累计死亡' },
      ],
      trendArr2: [
        { id: 1, tit: '重点国家新增确诊' },
        { id: 2, tit: '美国' },
        { id: 3, tit: '意大利' },
        { id: 4, tit: '法国' },
        { id: 5, tit: '德国' },
        { id: 6, tit: '巴西' },
        { id: 7, tit: '英国' },
        { id: 8, tit: '俄罗斯' },
        { id: 9, tit: '西班牙' },
      ],
      divId1: ['g1', 'g2', 'g3'],
      divId2: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'],
      class1: 'swipe1',
      class2: 'swipe2',
      // 导航按钮高亮
      isActive: true,
      flag: 0,
      // 表格高亮
      highlight:true,

      // 境外重点国家表格数据
      foreginTableData: covTableData,
      // 列的索引
      getCellIndex: 1,

      // 存放各个洲的洲名和国家名数据
      stateTableData: []

    }
  },
  props: {
  },
  components: {
    Title,
    // NavBtn,
    Scroll
  },
  methods: {
    async getData() {
      const res = await inter.getFun('/ncov/index', {
        params: { key: '6967c8d881f3281f8659cf1dc22c984f' }
      })
      const child = res.newslist[0].desc.globalStatistics

      const arr = [
        {
          yesterday: child.currentConfirmedIncr,
          today: child.currentConfirmedCount,
          color: '#f74c31',
          tit: '现存确诊'
        },
        {
          yesterday: child.confirmedIncr,
          today: child.confirmedCount,
          color: '#ae212c',
          tit: '累计确诊'
        },
        {
          yesterday: child.deadIncr,
          today: child.deadCount,
          color: '#5d7092',
          tit: '累计死亡'
        },
        {
          yesterday: child.curedIncr,
          today: child.curedCount,
          color: '#28b7a3',
          tit: '累计治愈'
        }
      ]
      this.countData = arr
    },


    // sortObj(props) {
    //   return function (a, b) {
    //     return b[props] - a[props]
    //   }
    // },
    // 控制导航按钮的高亮和处理表格排序
    changeItem(i,str) {
      this.flag = i
     if(str == '累计确诊'){
      this.foreginTableData.sort(this.sortData('countConfirm'))
     }
     if(str == '累计死亡'){
      this.foreginTableData.sort(this.sortData('countDead'))
     }
     if(str == '病死率'){
      this.foreginTableData.sort(this.sortData('deadRate'))
     }
    },
    sortData(i){
      return function(a,b){
        return b[i]-a[i]
      }
    },
    // 模拟各个洲国家的数据
    async getCovInfo() {
      const res = await local.getFun('citys')

      const state = ['欧洲', '亚洲', '南美洲', '北美洲', '大洋洲', '其他', '非洲']
      const country = ['法国', '德国', '意大利', '英国', '西班牙', '荷兰', '希腊', '奥地利', '比利时', '瑞士']

      res.stateArr.forEach((item, index) => {
        const obj = {
          state: state[index],
          currentConfirm: item.currentConfirm,
          countConfirm: item.countConfirm,
          dead: item.dead,
          cure: item.cure,
          children: [
            {
              country: country[index],
              ch_currentConfirm: 61544,
              ch_countConfirm: 15164,
              ch_dead: 65260,
              ch_cure: 5155
            }
          ]
        }
        this.stateTableData.push(obj)
      })
    },
    // 点击行可以展开
    handleRowHandle(row, column) {
      if (column.label !== '疫情') {
        this.$refs.statesTable.toggleRowExpansion(row)
      }
    },
    

  },
  mounted() {
    // 国外疫情趋势图轮播图版块
    // this.$charts.+ this.options + ('c1');
    this.$charts.globalNewCov('g1')
    this.$charts.globalCountConfirm('g2')
    this.$charts.globalCountDead('g3')
    // 重点国家新增确诊趋势图轮播图版块
    this.$charts.importNewCov('c1')
    this.$charts.meiCovChart('c2')
    this.$charts.yiCovChart('c3')
    this.$charts.faCovChart('c4')
    this.$charts.deCovChart('c5')
    this.$charts.baCovChart('c6')
    this.$charts.yingCovChart('c7')
    this.$charts.eCovChart('c8')
    this.$charts.xiCovChart('c9')
  },
  created() {
    this.getData()
    this.getCovInfo()
  },
  watch: {

  },
  computed: {
    ...mapState(['deadline']),

  },
  filters: {

  }
}
</script>
<style>

</style>
<style scoped lang='less'>
.container {
  .deadline {
    display: flex;
    align-items: center;
    padding-left: 20px;
    .detail {
      margin-left: auto;
      background-color: #f6f6f6;
      border-radius: 25px 0 0 25px;
      padding: 3px 10px;
      cursor: pointer;
      img {
        width: 13px;
        height: 13px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
  }

  .content {
    padding: 0 20px;

    .compare {
      ul {
        display: flex;
        padding: 10px 0 20px 0;
        border-bottom: 1px solid #f7f7f7;

        li {
          border: 1px solid #eee;
          width: 25%;
          padding: 5px 3px 8px 3px;
          text-align: center;
          box-sizing: border-box;

          b {
            color: #666;
          }

          span {
            font-size: 14px;
            font-weight: bold;
            padding: 5px 0;
            display: block;
          }

          p {
            font-weight: bold;
            color: #333;
          }
        }
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

        .isActive,
        .isActive2 {
          background-color: #f1f5ff;
          color: #4169e2;
        }
      }
    }

    .table-tip {
      font-size: 12px;
      color: #999;
      padding: 10px 0px;
      border-bottom: 1px solid #eee;
    }

    /deep/.el-card__body {
      padding: 0;
    }

    .card {
      padding: 10px 15px 5px;
      background-color: #fff5ec;
      border: 1px solid rgba(252, 153, 61, .24);
      margin: 10px 0;
    }

    // 覆盖原有样式
    /deep/.internal_tit {
      padding: 0 !important;
    }

    /deep/.control {
      padding: 15px 0 !important;

    }

    // 表格的一些样式覆盖
    th {
      background-color: #e3e7f3;
      border-right: 1px solid #fff;
      color: #333;
      text-align: center;
      padding: 4px 0;

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
        background-color: #b4c0d5;
      }

    }

    td {
      padding: 5px 0;
      text-align: right;
      border-right: 1px solid #fff;

      &:nth-child(1) {
        text-align: left;
      }
    }

  }

  // 去掉表格行hover和click的背景色
  /deep/.el-table {
    tbody {
      tr {
        &:hover {
          td {
            background-color: transparent !important;
          }
        }

      }
    }
  }
}

// 对其他洲国家疫情数据表格的改动
// parent
.stateTable {
  /deep/.el-table__body {
    tr {
      background-color: #eee;

    }

    td {
      font-weight: bold;

    }
  }
}

//expand
/deep/.el-table__expanded-cell {
  padding: 0;

  .el-table {
    .el-table__header-wrapper {
      display: none;
    }

    td {
      font-weight: normal;
    }
  }
}

// 表头
/deep/th {
  border-right: 1px solid #fff;
  background-color: #e3e7f3;
  padding: 5px 0;
  width: 80px;

  &:nth-child(3) {
    background-color: #f3bab0;
  }

  &:nth-child(4) {
    background-color: #e69a8d;
  }

  &:nth-child(5) {
    background-color: #b4c0d5;
  }

  &:nth-child(#95db9a) {
    background-color: #95db9a;
  }

  .cell {
    color: #333;
  }
}
.highlight{
  background-color: #f1f5ff;
}
td{
  padding-right:8px !important;
}
</style>