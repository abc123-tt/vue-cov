import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'

// 引入公共css
import '@/assets/css/common.css'
// 引入elementUI（按需引入）
import './plugins/elementUI'
// 引入封装的echart
import Echarts from './plugins/echarts'
// 引入中国地图数据
import 'echarts/map/js/china'

// 引入fontawesome 4
import 'font-awesome/css/font-awesome.min.css'
// 引入样式初始化文件
import 'normalize.css/normalize.css'

// 引入mock文件
import './assets/mock/index'
// 使用Echarts插件
Vue.use(Echarts)


new Vue({
  router,
  store,
	render: h => h(App)
}).$mount('#app')
