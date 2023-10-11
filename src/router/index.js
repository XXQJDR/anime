import Vue from "vue";
import VueRouter from "vue-router";
const Welcome = () =>import('@/pages/welcome.vue');

Vue.use(VueRouter);

const routes = [
	{
		path: '',
		redirect: '/welcome'
	},
	{
		path: '/welcome',
		component: Welcome,
		meta: {
			title: '欢迎来到Anime'
		}
	}
];

const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	next();
});

export default router;