import Vue from "vue";
import VueRouter from "vue-router";

const Welcome = () => import('@/pages/welcome.vue');
const Login = () => import('@/pages/login.vue');
const Register = () => import('@/pages/register.vue');
const Home = () => import('@/pages/home/index.vue');
const Test = () => import('@/pages/test.vue');
const AnimeList = () => import('@/pages/home/animeList.vue');
const AnimeRandom = () => import('@/pages/home/animeRandom.vue');
const AddAnime = () => import('@/pages/home/addAnime/index.vue');
const AnimeDetail = () => import('@/pages/animeDetail.vue');
const AutoRecognize = () => import('@/pages/home/addAnime/autoRecognize.vue')
const ManualAdd = () => import('@/pages/home/addAnime/manualAdd.vue')

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
				component: AddAnime,
				redirect: '/home/addAnime/autoRecognize',
				children: [
					{
						path: 'autoRecognize',
						component: AutoRecognize
					},
					{
						path: 'manualAdd',
						component: ManualAdd
					}
				]
			}
		]
	},
	{
		path: '/animeDetail',
		component: AnimeDetail,
		meta: {
			title: '详情'
		}
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

//解决跳转相同路由报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
	return originalPush.call(this, location).catch(err => {
		err
	})
};

router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title;
	}

	next();
});

export default router;