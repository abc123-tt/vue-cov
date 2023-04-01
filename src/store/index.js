// index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // 使用Vuex
export default new Vuex.Store({
	state: {
		deadline:"",
		highAreaNum:"",
		midAreaNum:""
	},
	mutations: {
		getDeadlineTime(state,...val){
			val.forEach(item=>{
				state.deadline = item.deadline
				state.highAreaNum = item.highAreaNum
				state.midAreaNum = item.midAreaNum
			})
		}
	},
	actions: {},
	modules: {}
})
