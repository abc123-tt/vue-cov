export const PublicModules = {
  data() {
    return {
      isActive: true,
      isActive2: true,
      flag: 0, 
      flag2:0     
    }
  },
  methods:{
    // 点击导航按钮时的处理函数
    handleCharts(i) {
      this.flag = i
      this.flag2 = i
      const mapBox = document.querySelector('.swiper');
      const mapEle = document.querySelector('#chart1');
      const mapWidth = mapEle.offsetWidth + 20
      let index = 0
      index = i
      mapBox.style.left = `${-index * mapWidth}px`
    },
    // 左右按钮
    moveCharts(str) {
      const mapBox = document.querySelector('.swiper');
      const mapEle = document.querySelector('#chart1');
      const mapWidth = mapEle.offsetWidth + 20
      let index = 0
      if (str === 'prev') {
        if(this.flag < 1){
          this.flag = 7
        }
        this.flag--
        index = this.flag
        mapBox.style.left = `${-index * mapWidth}px`
      }
      if (str === 'next') {
        this.flag++
        if(this.flag === 7){
          this.flag = 0
        }
        index = this.flag
        mapBox.style.left = `${-index * mapWidth}px`
      }
    },
  },
}