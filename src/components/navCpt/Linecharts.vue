<template>
  <div class="scroll-box">
    <div class="scroll">
      <!-- <ul :class="ulClass"> -->
      <ul :class="ulClass">
        <!-- <slot name="scroContent">填点什么吧。。。</slot> -->
        <li
          v-for="(item, index) in divId"
          :key="index"
        >
          <div :id="item"></div>
        </li>

      </ul>
      <a
        href="javascript:;"
        class="btn left-arrow"
        @click="moveCharts('prev')"
      ><i class="fa fa-angle-left"></i></a>
      <a
        href="javascript:;"
        class="btn right-arrow"
        @click="moveCharts('next')"
      ><i class="fa fa-angle-right"></i></a>
    </div>
    <nav class="control">
      <ul>
        <li
          v-for="(item, index) in btnArr"
          :key="item.id"
          @click="handleCharts(index)"
          :class="{ isActive: flag === index }"
        >
          {{ item.tit }}</li>
      </ul>
    </nav>
  </div>

</template>

<script>
export default {
  name: "",
  props: ["btnArr", "divId", "ulClass"],
  data() {
    return {
      flag: 0,
      isActive: true,
      // options:''
    };
  },

  components: {},
  methods: {
    // 点击左右按钮的处理函数
    handleCharts(i) {
      this.flag = i;
      const mapBox = document.querySelector(`.${this.ulClass}`);
      const mapEle = document.querySelector("#g1");
      const mapWidth = mapEle.offsetWidth + 20;
      let index = 0;
      index = i;
      mapBox.style.left = `${-index * mapWidth}px`;
    },
    // 点击左右按钮的处理函数
    moveCharts(str) {
      const mapBox = document.querySelector(`.${this.ulClass}`);
      const mapEle = document.querySelector("#g1");
      const mapWidth = mapEle.offsetWidth + 20;
      let index = 0;
      if (str == "prev") {
        if (this.flag < 1) {
          this.flag = this.btnArr.length;
        }
        this.flag--;
        index = this.flag;
        mapBox.style.left = `${-index * mapWidth}px`;
      }
      if (str == "next") {
        this.flag++;
        if (this.flag == this.btnArr.length) {
          this.flag = 0;
        }
        index = this.flag;
        mapBox.style.left = `${-index * mapWidth}px`;
      }
    },
  },
  mounted() {},
  created() {},
  watch: {},
  computed: {},
  filters: {},
};
</script>

<style scoped lang='less'>
.scroll-box {
  width:100%;

  .scroll {
    position: relative;
    margin: auto;
    width: 375PX;
    height: 201px;
    overflow: hidden;
    /deep/.el-card__body {
      padding: 0;
    }

    .swipe1,
    .swipe2 {
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      // 过渡动画
      transition: all 0.3s ease-in-out;
      
      li {
        margin-right: 20px;

        div {
          box-sizing: border-box;
          box-shadow: 0 0.02rem 0.06rem rgba(0, 0, 0, 0.05);
          border: 0.005rem solid #ebebeb;
          width: 375PX;
          height: 201px;
        }
      }
    }

    .btn {
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      background-color: rgba(166, 166, 166, 0.8);
      border-radius: 50%;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      position: absolute;
      top: 45%;
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

      // width: 100%;
      li {
        margin: 0 6px 5px 0;
        padding: 0.045rem;
        background-color: #f7f7f7;
        cursor: pointer;
        width: calc(18% - 0.02rem);
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
      }

      .isActive,
      .isActive {
        background-color: #f1f5ff;
        color: #4169e2;
      }
    }
  }
}
</style>