import Vue from "vue";
import VueRouter from "vue-router";
import {Message} from "element-ui";
import store from "@/store";

const Welcome = () => import('@/pages/welcome.vue');
const Login = () => import('@/pages/login.vue');
const Register = () => import('@/pages/register.vue');
const Home = () => import('@/pages/home/index.vue');
const Test = () => import('@/pages/test.vue');
const AnimeList = () => import('@/pages/home/animeList.vue');
const AnimeRandom = () => import('@/pages/home/animeRandom.vue');
const AddAnime = () => import('@/pages/home/addAnime.vue');
const AnimeDetail = () => import('@/pages/animeDetail.vue');
const Dustbin = () => import('@/pages/home/dustbin.vue');
const ViewingHistory = () => import('@/pages/home/viewingHistory.vue');

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

		//解决刷新主页contentType重置的问题
		beforeEnter(to, from, next) {
			switch (to.path.split('/')[2]) {
				case 'animeList':
					store.commit('HOME_CONTENT_TYPE', 1);
					break;
				case 'viewingHistory':
					store.commit('HOME_CONTENT_TYPE', 3);
					break;
				case 'animeRandom':
					store.commit('HOME_CONTENT_TYPE', 3);
					break;
				case 'addAnime':
					store.commit('HOME_CONTENT_TYPE', 4);
					break;
				case 'dustbin':
					store.commit('HOME_CONTENT_TYPE', 5);
					break;
			}

			next();
		},
		children: [
			{
				path: 'animeList',
				component: AnimeList,
				meta: {
					title: '动漫列表'
				}
			},
			{
				path: 'viewingHistory',
				component: ViewingHistory,
				meta: {
					title: '观看历程'
				}
			},
			{
				path: 'animeRandom',
				component: AnimeRandom,
				meta: {
					title: '随机动漫'
				}
			},
			{
				path: 'addAnime',
				component: AddAnime,
				meta: {
					title: '添加动漫'
				},
			},
			{
				path: 'dustbin',
				component: Dustbin,
				meta: {
					title: '垃圾箱'
				}
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
	},
	{
		path: '/404',
		component: () => import('@/pages/404.vue'),
		meta: {
			title: '404'
		}
	},
	{
		path: '*',
		redirect: '/404'
	}
];

const router = new VueRouter({
	routes,
	scrollBehavior (to, from, savedPosition) {
		return new Promise((resolve) => {
			setTimeout(() => {
				if (savedPosition) {
					resolve(savedPosition);
				} else {
					resolve({x: 0, y: 0})
				}
			}, 450)
		})
	}
});

//解决跳转相同路由报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
	return originalPush.call(this, location).catch(err => {
		err
	})
};

router.beforeEach((to, from, next) => {
	//登录状态，存在token且token未过期该状态为true
	let loginStatus = false;
	let exp = store.state.userInfo.exp;
	if (exp != null && Math.floor(Date.now() / 1000) < exp) {
		loginStatus = true;
	}

	//根据前往的路由更改看板娘的位置
	if (to.path==='/login' || to.path==='/register') {
		store.state.live2dPosition = 'right';
	} else {
		store.state.live2dPosition = 'left';
	}

	//组件权限控制
	if (to.path.includes('/home') && !loginStatus) {
		Message.warning('请先登录！');
		store.state.live2dPosition = 'right';
		next('/login');
	} else if ((to.path === '/login' || to.path === '/welcome') && loginStatus) {
		store.state.live2dPosition = 'left';
		next("/home");
	} else {
		//更改网页title
		if (to.meta.title) {
			document.title = to.meta.title;
		}

		next();
	}
});

export default router;