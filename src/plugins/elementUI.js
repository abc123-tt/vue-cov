import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'

import{
  MessageBox,
  Button,
  Card,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Carousel,
  CarouselItem
} from 'element-ui'

Vue.use(Button)
Vue.use(Card)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Carousel)
Vue.use(CarouselItem)
// 消息提示框
import {
  Message
} from 'element-ui'
// 需要全局挂载
Vue.prototype.$message = Message
// 点击删除时的弹框
Vue.prototype.$confirm = MessageBox.confirm