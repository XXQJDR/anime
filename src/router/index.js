import Vue from "vue";
import VueRouter from "vue-router";

const Welcome = () => import('@/pages/welcome.vue');
const Login = () => import('@/pages/login.vue');
const Register = () => import('@/pages/register.vue')

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
	},
	{
		path: '/login',
		component: Login,
		meta: {
			title: '登录'
		}
	},
	{
		path: '/register',
		component: Register,
		meta: {
			title: '注册'
		}
	}
];

const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title;
	}

	/* 解决PC端页面不能滚动，而移动端却能滚动的BUG */
	let arr = [
		'/welcome',
		'/login',
		'/register'
	];
	if (arr.includes(to.path)) {
		document.body.style.setProperty('overflow', 'hidden', 'important');
	}
	next();
});

export default router;