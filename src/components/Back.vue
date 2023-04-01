<template>
  <div>
    <div class="topBox" v-if="isShow" @click="backTop">
      <i class="fa fa-arrow-up" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      isShow: false,
    }
  },
  props: {
  },
  components: {

  },
  methods: {
    handleScrll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 800) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    backTop() {
      /*回到顶部实现过程注解：
        1.获取当前页面距离顶部的距离
        2.计算出每次向上移动的距离，用负的滚动距离除以5，因为滚动的距离是一个正数，想向上移动就是一个减法
        3.用当前距离加上计算出的距离，然后赋值给当前距离，就可以达到向上移动的效果
        4.最后在移动到顶部的时候，清除定时器
        */

      let top = document.documentElement.scrollTop || document.body.scrollTop
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 10)

    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScrll)
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
.topBox {
  position: fixed;
  right: 3%;
  bottom: 15%;
  z-index: 11111;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #5a91ff;
  color: #fff;
  text-align: center;
  line-height: 40px;
  animation: slow 1s forwards;

  i {
    font-size: 16px;
  }
}

@keyframes slow {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>