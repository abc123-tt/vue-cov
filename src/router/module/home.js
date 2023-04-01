export const home = [
	{
		path: '/',
		// redirect:'/home',
		meta: { title: '首页' },
		component: () => import('@/views/home/Home.vue')
	},
	{
		path: '/home',
		meta: { title: '首页' },
		component: () => import('@/views/home/Home.vue')
	},
	

]
