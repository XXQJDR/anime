import Vue from "vue";
import VueRouter from "vue-router";
import {Message} from "element-ui";
import store from "@/store";

const Welcome = () => import('@/pages/welcome.vue');
const Login = () => import('@/pages/login.vue');
const Register = () => import('@/pages/register.vue');
const ResetPassword = () => import('@/pages/resetPassword.vue');
const Home = () => import('@/pages/home/index.vue');
const Test = () => import('@/pages/test.vue');
const AnimeList = () => import('@/pages/home/animeList.vue');
const AnimeRandom = () => import('@/pages/home/animeRandom.vue');
const AddAnime = () => import('@/pages/home/addAnime.vue');
const AnimeDetail = () => import('@/pages/animeDetail.vue');
const Dustbin = () => import('@/pages/home/dustbin.vue');
const ViewingHistory = () => import('@/pages/home/viewingHistory.vue');
const PersonalPanel = () => import('@/pages/home/personal/panel.vue');
const PersonalInfo = () => import('@/pages/home/personal/info.vue');
const PersonalPost = () => import('@/pages/home/personal/post.vue');
const PersonalNotice = () => import('@/pages/home/personal/notice.vue');

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
		path: '/resetPassword',
		component: ResetPassword,
		meta: {
			title: '重置密码'
		}
	},
	{
		path: '/home',
		component: Home,
		redirect: '/home/animeList',

		//解决刷新主页contentType重置的问题
		beforeEnter(to, from, next) {
			let arr = to.path.split('/');
			store.commit('HOME_CONTENT_TYPE', arr[arr.length - 1]);
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
			},
			{
				path: 'personal/panel',
				component: PersonalPanel,
				meta: {
					title: '仪表盘'
				}
			},
			{
				path: 'personal/info',
				component: PersonalInfo,
				meta: {
					title: '个人信息'
				}
			},
			{
				path: 'personal/post',
				component: PersonalPost,
				meta: {
					title: '帖子'
				}
			},
			{
				path: 'personal/notice',
				component: PersonalNotice,
				meta: {
					title: '通知'
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
	mode: 'history',
	routes,
	/* 实现返回上一页，页面停留在原来位置 */
	scrollBehavior(to, from, savedPosition) {
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
	//组件权限控制
	let token = store.state.token;
	if ((to.path.includes('/home') || to.path === '/animeDetail') && token === '') {
		Message.warning('请先登录！');
		next('/login');
	} else if ((to.path === '/login' || to.path === '/welcome') && token !== '') {
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