<template>
  <div>
    <div class="covCaseTable">
      <!-- 标题区域 -->
      <div class="tit">
        <span class="colorBlock"></span>
        <h3>近期疫情分布</h3>
        <span class="time">截至北京时间<span>{{ deadline }}</span></span>
      </div>
      <!-- 高风险地区低风险地区 -->
      <el-card class="Allarea">
        <div>
          <span>高风险地区 <strong style="color:#f74c31">{{ highAreaNum }}</strong> 个 中风险地区 <strong style="color:#fbb046">{{
              midAreaNum
          }}</strong>
            个</span>
          <a href="#">查看全部 <i class="fa fa-angle-right"></i></a>
        </div>

      </el-card>

      <!-- 各地区疫情数据表格区域 -->
      <el-table class="table" :data="riskAreaTableData" ref="riskAreaTable" @cell-click="handleRowHandle">
        <el-table-column type="expand" label="#">
          <template v-slot="scope">
            <el-table :data="scope.row.children">
              <el-table-column width="47%"></el-table-column>
              <el-table-column prop="ch_area"></el-table-column>
              <el-table-column prop="ch_localAdd"></el-table-column>
              <el-table-column prop="ch_localSilent"></el-table-column>
              <el-table-column prop="ch_currentConfirm"></el-table-column>
              <el-table-column prop="ch_riskarea"></el-table-column>
              <el-table-column></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="area" label="地区">
        </el-table-column>
        <el-table-column prop="localAdd" label="本土新增">
        </el-table-column>
        <el-table-column prop="localSilent" label="本土无症状">
        </el-table-column>
        <el-table-column prop="currentConfirm" label="现存确诊">
        </el-table-column>
        <el-table-column prop="riskarea" label="风险地区">
        </el-table-column>
        <el-table-column label="疫情">
          <a href="#" style="color:#4169e2">详情 <i class="fa fa-angle-right"></i></a>
        </el-table-column>
      </el-table>

      <p class="table-tip">
        仅汇总近期新增本土病例的地区（不包含港澳台），完整数据可点击详情查看。
      </p>
    </div>

    <!-- 地图 -->
    <div class="map-container">
      <!-- 国内疫情地图标题 -->
      <Title>
        <template slot="tit">
          <h3>国内疫情地图</h3>
        </template>
      </Title>
      <NavBtn>
        <template slot="navBtn">
          <li v-for="(item, index) in arr" :key="item.id" @click="handleNav(index)"
            :class="{ isActive: flag === index }">
            {{ item.tit }}</li>
        </template>
      </NavBtn>


      <!-- 这是轮播图 -->
      <div class="scroll-box">
        <ul class="sw">
          <li class="first-map">
            <div id="map1"></div>
          </li>
          <li class="second-map">
            <div id="map2"></div>
          </li>
          <li class="third-map">
            <div id="map3"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Title from "./Title.vue"
import NavBtn from './NavBtn.vue'
const local = require('../../api/localData-api')
import mock from 'mockjs'

export default {
  name: 'RiskArea',
  data() {
    return {
      riskAreaTableData: [],
      // 地图的按钮
      arr: [
        { id: 1, tit: "现存确诊" },
        { id: 2, tit: "风险地区" },
        { id: 3, tit: "累计确诊" }
      ],
      isActive: true,
      flag: 0,
      currentConfirmDataList: [],
      riskAreaDataList: [],
      countConfirmDataList: []
    }
  },
  props: {
  },
  components: {
    Title,
    NavBtn
  },
  methods: {

    async getMock() {
      const res = await local.getFun('/citys')
      let cityArr = []
      while (true) {
        let sum = 0
        const provinces = mock.Random.province()
        cityArr.push(provinces)
        // 筛选重复并删除
        // 遍历数组，查找是否存在满足条件的元素，如果有就停止循环
        // 会根据回调函数的返回值确定是否停止循环；回调函数返回true就停止，否则继续循环；迭代效率更高；
        cityArr.some((item, index) => {
          if (item == provinces) {
            sum++;
          }
          if ((item == provinces && sum >= 2) || item == '海外') {
            // console.log(`重复的城市是${item},位置在${index}`);
            // 删除重复并且等于海外的值
            return cityArr.splice(index, 1)
          }
        })
        if (cityArr.length == 34) {
          // 结束循环
          break
        }
      }
      // console.log(cityArr)
      res.data.forEach((item, index) => {
        // console.log(item)
        // console.log(cityArr[index])
        // 每循环一次就将当前index对应的cityArr数组下的那个省份赋值给provinceName
        let provinceName = cityArr[index]
        let provinceShortName = provinceName.substring(0, 2)
        if (provinceName == '内蒙古自治区' || provinceName == '黑龙江省') {
          provinceShortName = provinceName.substring(0, 3)
        }
        // 当前确诊地图的数据
        const currentConfirmMapData = {
          name: provinceShortName,
          value: item.currentConfirm,
        }
        this.currentConfirmDataList.push(currentConfirmMapData)

        // 地区风险地图的数据
        const riskAreaMapData = {
          name: provinceShortName,
          value: item.midAreas,
          value2: item.highAreas
        }
        this.riskAreaDataList.push(riskAreaMapData)

        // 累计确诊地图的数据
        const countConfirmMapData = {
          name: provinceShortName,
          value: item.countConfirm,

        }
        this.countConfirmDataList.push(countConfirmMapData)
      })

      this.riskAreaTableData = res.regionalRisk
    },
    handleNav(i) {
      this.flag = i
      const mapBox = document.querySelector('.sw');
      const mapEle = document.querySelector('#map1');
      const mapWidth = mapEle.offsetWidth
      let index = 0
      index = i
      mapBox.style.left = `${-index * mapWidth}px`
    },
    // 点击行展开扩展表
    handleRowHandle(row, column) {
      if (column.label !== '疫情') {
        this.$refs.riskAreaTable.toggleRowExpansion(row)
      }
    }
    // setRiskAreaColor(value) {
    //   let currentColor = ""
    //   switch (true) {
    //     case value === 0:
    //       currentColor = "#fff";
    //       break;
    //     case value >= 1 && value < 9:
    //       currentColor === "#f69d83"
    //       break;
    //     case value >= 10:
    //       currentColor === "#e55a4e"
    //       break;
    //     // 高风险地区
    //     case value >= 1:
    //       currentColor === "#d56355"
    //       break
    //   }
    //   return currentColor
    // }
  },
  mounted() {
    this.getMock()
    setTimeout(() => {
      this.$charts.chinaMap("map1", this.currentConfirmDataList);
      this.$charts.riskAreasMap("map2", this.riskAreaDataList);
      this.$charts.countConfirmMap("map3", this.countConfirmDataList);
    }, 800)
  },
  created() {

  },
  watch: {

  },
  computed: {
    ...mapState(['deadline', 'highAreaNum', 'midAreaNum']),

  },
  filters: {

  }
}
</script>
<style>
.table tr {
  /* 将所有表格行都改为灰色 */
  background: #f7f7f7;
}

/* 将expand表格背景颜色改为白色 */
.el-table__expanded-cell .el-table__row {
  background-color: #fff !important;
}
</style>

<style scoped lang='less'>
.covCaseTable {
  padding: 0 20px;

  .tit {
    display: flex;
    align-items: center;
    height: 35px;

    .colorBlock {
      width: 4px;
      height: 16px;
      background-color: #4169e2;
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }

    h3 {
      font-size: 16px;
    }

    .time {
      margin-left: auto;
    }
  }

  .Allarea {
    margin: 20px 0;
    width: 100%;

    div {
      display: flex;
      justify-content: space-around;

      a {
        margin-left: auto;
        color: #4169e2;

      }
    }
  }

  // 表头
  /deep/th {
    border-right: 1px solid #fff;
    background-color: #e3e7f3;
    padding: 0;


    &:nth-child(2) {
      background-color: #e69a8d;
    }

    &:nth-child(3) {
      background-color: #f3bab0;
    }

    &:nth-child(4) {
      background-color: #b4c0d5;
    }
  }


  /deep/.el-card_body {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  // 表格滚动条变细
  // ----------修改elementui表格的默认样式-----------
  .el-table__body-wrapper {
    &::-webkit-scrollbar {
      // 整个滚动条
      width: 0; // 纵向滚动条的宽度
      background: rgba(213, 215, 220, 0.3);
      border: none;
    }

    &::-webkit-scrollbar-track {
      // 滚动条轨道
      border: none;
    }
  }

  // --------------------隐藏table gutter列和内容区右侧的空白 start
  .el-table th.gutter {
    display: none;
    width: 0
  }

  .el-table colgroup col[name='gutter'] {
    display: none;
    width: 0;
  }

  /deep/.el-table__body {
    width: 100% !important;

  }

  // --------------------隐藏table gutter列和内容区右侧的空白 end


  /deep/.el-table__expanded-cell {
    padding: 0;

    .el-table {
      td {
        .cell {
          font-weight: normal;
        }
      }
    }
  }

  // 隐藏扩展表格的表头一行
  /deep/.el-table__body-wrapper {
    border: none;

    .el-table__header-wrapper {
      display: none;
    }
  }

  /deep/.cell {
    font-weight: bold;
    color: #333;
  }

  .table {
    /deep/.el-table__body {
      td {
        .cell {
          font-weight: bold;
        }
      }
    }

    /deep/.el-table__header-wrapper {
      .cell {
        padding: 5px;
      }
    }
  }

  .table-tip {
    font-size: 12px;
    color: #999;
    padding: 10px 0px;
    border-bottom: 1px solid #eee;
  }
}

// 地图盒子
.map-container {
  padding: 0 !important;
  width: 100%;
  // 轮播地图的按钮

  // 轮播地图
  .scroll-box {
    width: 414px;
    height: 368px;
    position: relative;
    overflow: hidden;
    margin: auto;

    .sw {
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      // 过渡动画
      transition: all .3s ease-in-out;

      li {
        div {
          width: 414px;
          height: 368px;
          background-color: #f7f7f7;
        }
      }
    }

  }
}

/deep/.el-table__body {
  td {
    padding: 8px 0;
  }
}

.el-table {
  text-align: center;

}

</style>
