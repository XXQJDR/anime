import Vue from "vue";
import VueRouter from "vue-router";

const Welcome = () => import('@/pages/welcome.vue');
const Login = () => import('@/pages/login.vue');
const Register = () => import('@/pages/register.vue');
const Home = () => import('@/pages/home/index.vue');
const Test = () => import('@/pages/test.vue');
const AnimeList = () => import('@/pages/home/animeList.vue');
const AnimeRandom = () => import('@/pages/home/animeRandom.vue');
const AddAnime = () => import('@/pages/home/addAnime.vue');

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
	},
	{
		path: '/home',
		component: Home,
		redirect: '/home/animeList',
		meta: {
			title: '主页'
		},
		children: [
			{
				path: 'animeList',
				component: AnimeList
			},
			{
				path: 'animeRandom',
				component: AnimeRandom
			},
			{
				path: 'addAnime',
				component: AddAnime
			}
		]
	},
	{
		path: '/test',
		component: Test,
		meta: {
			title: '测试'
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