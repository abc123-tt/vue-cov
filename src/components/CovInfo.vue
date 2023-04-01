<template>
  <div>
    <!-- 疫情热点新闻列表区域 -->
    <ul class="covHotList">
      <li v-for="item in covList" :key="item.id" @click="newsDetail(item.id)">
        <a :href="detailUrl">
          <span>最新</span>
          <p>{{item}}</p>
          <i class="fa fa-angle-right"></i>
        </a>
      </li>
    </ul>
    <!-- 快速入口区域 -->
    <div class="fastEntry">
      <ul>
        <li>
          <a href="#">
            <img src="../assets/images/FEimg1.png" alt="">
            <p>问医生</p>
          </a>
        </li>
        <li>
          <a href="#">
            <sup class="hotTip">Hot</sup>
            <img src="../assets/images/FEimg2.png" alt="">
            <p>新人义诊</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../assets/images/FEimg3.png" alt="">
            <p>防疫物资</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../assets/images/FEimg4.png" alt="">
            <p>出行政策</p>
          </a>
        </li>
      </ul>
    </div>

    <!-- 较昨天病例比较区域 -->
    <p class="UpdateTime">截止 {{deadline}} 全国数据统计</p>
    <el-card class="UpdateData">
      <ul class="UpdateDataList">
        <li v-for="(item,index) in lastData" :key="index" :style="{color:item.color}">
          <b>较昨日</b><span>{{item.yesterday >= 0 ? '+':''}}{{item.yesterday}}</span>
          <strong>{{item.today}}</strong>
          <p>{{item.tit}}</p>
        </li>
        
      </ul>
    </el-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getFun } from '../api/request-api'

export default {
  name: 'CovInfo',
  data() {
    return {
      // 疫情热点消息列表
      covList: [
        '国家卫健委|昨日新增本土3561+34860例',
        '重庆|昨日新增本土确诊病例209例',
        '河南|昨日新增本土确诊病例164例',
        '山西|昨日新增本土确诊病例135例',
        '山东|昨日新增本土确诊病例59例',
      ],
      // 疫情热点消息列表每一条消息的详情URL
      detailUrl: '',
      // 较昨日比较的疫情信息
      lastData: Array,
      // 中高地区风险区数量（传到vuex）
      midAreasNum:'',
      highAreasNum:'',
      // 截止更新时间
      deadline: ""
    }
  },
  props: {
  },
  components: {

  },
  methods: {
    // 封装消息提示
    msgTip(code, status, message) {
      if (code !== status) {
        this.$message.error(message)
      }
    },
    // 获取疫情最新信息
    // 这里如果使用async await 搭配的话还要再做一次深拷贝才能拿到真实数据
    // this.covList = JSON.parse(JSON.stringify(res))
    async getCovNewsData() {
      const res = await getFun('/ncov/index', {
        params: { key: '6967c8d881f3281f8659cf1dc22c984f' }
      })
      this.msgTip(res.code, 200, res.msg)
      // this.covList = JSON.parse(JSON.stringify(res.newslist[0]))
      // console.log(this.covList)
      // 将较昨日比较的数据放到lastData中
      // this.lastData = this.covList.desc
      const info = this.covList.desc
      const arr = [
        {
          tit:'现存确诊',
          today:1245,
          yesterday:2334,
          color:'#f74c31'
        },
        {
          tit:'境外输入',
          today:32424,
          yesterday:3422,
          color:'#f78207'
        },
        {
          tit:'现存无症状',
          today:455,
          yesterday:4543,
          color:'#a25a4e'
        },
        {
          tit:'累计确诊',
          today:34542,
          yesterday:34234,
          color:'#ae212c'
        },
        {
          tit:'累计死亡',
          today:3423,
          yesterday:34234,
          color:'#5d7092'
        },
        {
          tit:'累计治愈',
          today:4234,
          yesterday:43252,
          color:'#28b7a3'
        },
      ]
      this.lastData = arr

      // 赋值中高风险区数量
      this.midAreasNum = 4552
      this.highAreasNum = 2345

      // console.log(this.lastData)
      // 将时间戳转化为正常显示的时间
      this.deadline = dayjs(this.lastData.modifyTime).format("YYYY-MM-DD MM:mm:ss")

      // 使用eventBus发送数据给兄弟组件
      // bus.$emit('',this.deadline)
      // console.log(this.lastData)
      this.$store.commit('getDeadlineTime', {
        deadline: this.deadline,
        highAreaNum:this.highAreasNum,
        midAreaNum:this.midAreasNum
      })
    },
    // 使用Promise的方法
    // getCovNewsData(){
    //   getFun('/ncov/index', {
    //     params: { key: '6967c8d881f3281f8659cf1dc22c984f' }
    //   }).then(res =>{
    //     this.covList = res.newslist[0]
    //     // console.log(this.covList)
    //   }).catch(err => err)
    // }

    // 点击新闻跳转到详细信息
    // newsDetail(id) {
    //   // 使用find方法找到包含 “return item.id === id”这个条件的对象
    //   let result = this.covList.news.find((item) => {
    //     // 拿到这个对象并返回出去
    //     return item.id === id
    //   })
    //   // result.sourceUrl就是当前id === id 的那个对象下的sourceUrl属性
    //   this.detailUrl = result.sourceUrl
    // },
    
  },
  mounted() {

  },
  created() {
    this.getCovNewsData()
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
.covHotList {
  padding: 0;
  margin: 0px;
  border-bottom: 0.5px solid #eee;

  li {

    margin-bottom: 20px;

    a {
      display: flex;
      align-items: center;

      span {
        display: inline-block;
        padding: 2px 3px;
        border-radius: 3px;
        background: red;
        font-size: 12px;
        color: #fff;
        margin-right: 5px;
      }

      p {
        margin: 0;
        font-size: 16px;
        color: #333;
      }

      i {
        margin-left: auto;
        font-size: 18px;
        font-weight: bold;
        color: #cccccc;
      }
    }
  }
}

.fastEntry {
  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #eee;

    li {
      a {
        display: block;
        width: 50px;
        height: 50px;
        padding: 20px 20px 40px 20px;
        position: relative;

        .hotTip {
          padding: 8px;
          border-radius: 25px;
          overflow: hidden;
          border: 1px solid #fff;
          background-color: #ff5b4d;
          color: #fff;
          position: absolute;
          top: 20%;
          right: 5%;
        }

        img {
          width: 100%;
          height: 100%;
        }

        p {
          text-align: center;
          color: #333;
        }
      }
    }
  }
}

.UpdateTime {
  margin: 10px 0;
  font-size: 14px;
  color: #666;
}

.UpdateData {
  width: 100%;

  .UpdateDataList {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  /deep/.el-card__body {
    padding: 0;
  }

  li {
    padding: 8px 15px;
    text-align: center;

    b {
      color: #666666;
    }

    p{
      color:#333;
    }

    strong {
      display: block;
      font-size: .2rem;
    }

    p {
      font-weight: bold;
    }
  }



}
</style>