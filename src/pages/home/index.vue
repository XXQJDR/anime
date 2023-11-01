<template>
	<div class="home">
		<div class="sidebar" :id="sidebarFlag?'enableSidebar':'disableSidebar'">
			<div class="user" :class="{userBackground:userDetailFlag}">
				<div class="avatar">
					<img src="@/assets/home/default-avatar.jpg" alt="">
				</div>
				<div class="name">zmzm</div>
				<div class="arrow"><i :class="userDetailFlag?'arrowTop':'arrowDown'"></i></div>
			</div>
			<div class="userDetail" :class="userDetailFlag?'enableUserDetail':'disableUserDetail'"></div>
			<div class="btns">
				<div class="btn" :class="{btnActive:contentType===1}" @click="changeContentType(1)">
					<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="rectangle-history" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-metatip="true"><path :fill="contentType===1?'#2b0aff':'#726e6e'" d="M464 224c0-8.8-7.2-16-16-16L64 208c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-224zm-16-64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64l384 0zm-8-80c13.3 0 24 10.7 24 24s-10.7 24-24 24L72 128c-13.3 0-24-10.7-24-24s10.7-24 24-24l368 0zM392 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L120 48c-13.3 0-24-10.7-24-24s10.7-24 24-24L392 0z"></path></svg>
					<div class="title">列表</div>
				</div>
				<div class="btn" :class="{btnActive:contentType===2}" @click="changeContentType(2)">
					<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="book-open" class="svg-inline--fa fa-book-open fa-fw fa-1x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path :fill="contentType===2?'#2b0aff':'#726e6e'" d="M156 32C100.6 32 48.8 46.6 27.1 53.6C10.3 59 0 74.5 0 91.1V403.5c0 26.1 24 44.2 48 40.2c19.8-3.3 54.8-7.7 100-7.7c54 0 97.5 25.5 112.5 35.6c7.5 5 16.8 8.4 27 8.4c11.5 0 21.6-4.2 29.3-9.9C330.2 460.3 369.1 436 428 436c47.7 0 80.5 4 99 7.2c23.9 4.1 49-13.8 49-40.6V91.1c0-16.5-10.3-32.1-27.1-37.5C527.2 46.6 475.4 32 420 32c-36.8 0-71.8 6.4-97.4 12.7c-12.8 3.2-23.5 6.3-30.9 8.7c-1.3 .4-2.6 .8-3.7 1.2c-1.1-.4-2.4-.8-3.7-1.2c-7.5-2.4-18.1-5.5-30.9-8.7C227.8 38.4 192.8 32 156 32zM264 97.3V417.9C238 404.2 196.8 388 148 388c-42.9 0-77.4 3.7-100 7.1V97.3C70.3 90.6 112.4 80 156 80c31.6 0 62.6 5.6 85.9 11.3c8.6 2.1 16.1 4.2 22.1 6zm48 319.2V97.3c6-1.8 13.5-3.9 22.1-6C357.4 85.6 388.4 80 420 80c43.6 0 85.7 10.6 108 17.3V394.7c-21.7-3.3-54.9-6.7-100-6.7c-51.4 0-90.8 15-116 28.6z"></path></svg>
					<div class="title">随机</div>
				</div>
				<div class="btn" :class="{btnActive:contentType===3}" @click="changeContentType(3)">
					<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path :fill="contentType===3?'#2b0aff':'#726e6e'" d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H40c-13.3 0-24 10.7-24 24s10.7 24 24 24H200V440c0 13.3 10.7 24 24 24s24-10.7 24-24V280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z"></path></svg>
					<div class="title">添加</div>
				</div>
			</div>
		</div>

		<!-- 点击弹窗的其他区域关闭弹窗 -->
		<div class="mask" v-show="sidebarFlag && browserIdentity===2" @click="closeSidebar"></div>
		<div class="content">
			<MobileTopbar v-if="browserIdentity === 2" />
			<router-view />
		</div>
	</div>
</template>

<script>
import MobileTopbar from "@/components/mobileTopbar.vue";
import _ from "lodash";

export default {
	name: 'HomePage',
	components: {MobileTopbar},
	data() {
		return {
			//用户界面图层显示标志
			userDetailFlag: false,

			//内容区域类型标志，默认为列表
			contentType: 1,

			//侧边栏显示标志
			sidebarFlag: false,

			//浏览器身份，1为pc，2为移动
			browserIdentity: 2,
		}
	},
	methods: {
		//点击切换内容类型
		changeContentType(type) {
			this.contentType = type;
			const pathMap = {
				1: '/home/animeList',
				2: '/home/animeRandom',
				3: '/home/addAnime'
			};
			const path = pathMap[type] || '';
			this.$router.push(path);

			//移动端点击后关闭侧边栏
			if (this.browserIdentity === 2) {
				this.sidebarFlag = false;
			}
		},

		//点击mask遮罩关闭侧边栏
		closeSidebar() {
			this.sidebarFlag = false;

			//启用content的滚动事件
		},

		//动态获取浏览器宽度
		getWindowInfo: _.debounce(function () {
			if (window.innerWidth <= 700) {
				this.browserIdentity = 2;
				this.sidebarFlag = false;
			} else {
				this.browserIdentity = 1;
				this.sidebarFlag = true;
			}
		}, 200),
	},
	created() {
		//读取sessionStorage中存储的数据
		let contentType =sessionStorage.getItem('contentType');

		if (contentType != null) {
			this.contentType = contentType * 1;
		}
	},
	mounted() {
		//动态获取浏览器视宽来判断浏览器身份
		this.getWindowInfo();
		window.addEventListener('resize', this.getWindowInfo);

		//展示侧边栏并添加
		this.$bus.$on('switchSidebar', () => {
			this.sidebarFlag = true;

			//禁用content的滚动事件
		});

		//修改contentType
		this.$bus.$on('updateContentType', (type) => {
			this.contentType = type;
		});

		//监听页面，当页面刷新时将contentType存入sessionStorage
		window.onbeforeunload =  () => {
			sessionStorage.setItem('contentType', this.contentType);
		};
	},
	beforeDestroy() {
		//取消事件监听
		window.onbeforeunload = () => {};
		window.removeEventListener('resize', this.getWindowInfo);

		//取消所有事件总线
		this.$bus.$off();
	},
}
</script>

<style scoped>
.home {
	--sidebarWidth: 250px;

	position: relative;
}

.home::after {
	content: '';
	display: block;
	clear: both;
}

.home .sidebar {
	width: var(--sidebarWidth);
	height: 100vh;
	box-sizing: border-box;
	padding: 1.2rem;
	position: fixed;
	top: 0;
	left: 0;
	transition: transform 0.2s ease 0s;
	background-color: white;
	z-index: 100;
}

#disableSidebar {
	transform: translateX(-100%);
}

#enableSidebar {
	transform: translateX(0);
}

.home .mask {
	width: calc(100vw - var(--sidebarWidth));
	height: 100%;
	position: absolute;
	right: 0;
	z-index: 100;
}

.home .content {
	/* 减去滚动条的大小 */
	width: calc(100vw - var(--sidebarWidth) - (100vw - 100%));
	min-height: 100vh;
	background-color: #F7F3F2;
	box-sizing: border-box;
	padding: 1.3rem 2%;
	float: right;
}

.home .sidebar .user {
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	cursor: pointer;
	transition: color, background-color 0.2s;
	user-select: none;
	box-sizing: border-box;
	padding: 5px;
	border-radius: 10px;
}

.userBackground {
	background: rgba(0, 0, 0, 0.06);
}

.home .sidebar .user:hover {
	color: #2208cc;
}

.home .sidebar .user:hover .arrow i {
	border-color: #2208cc;
}

.home .sidebar .user .avatar,
.home .sidebar .user .avatar img {
	width: 32px;
	height: 32px;
}

.home .sidebar .user .avatar {
	border-radius: 50%;
	overflow: hidden;
	display: inline-block;
}

.home .sidebar .user .name {
	width: 60%;
	line-height: 32px;
}

.home .sidebar .user .arrow i {
	width: 1px;
	height: 1px;
	border: solid black;
	border-width: 0 2px 2px 0;
	display: inline-block;
	padding: 3px;
	transition: border-color, transform 0.2s;
	margin-top: 13px;
}

.arrowDown {
	transform: rotate(45deg);
	-webkit-transform: rotate(45deg);
}

.arrowTop {
	transform: rotate(-135deg);
	-webkit-transform: rotate(-135deg);
}

.home .sidebar .userDetail {
	width: 25vw;
	min-width: 200px;
	height: 11rem;
	background-color: white;
	position: absolute;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);;
	border-radius: 1rem;
	transition: all 0.2s;
	transform-origin: top left;
}

.enableUserDetail {
	opacity: 1;
	visibility: visible;
	transform: none;
}

.disableUserDetail {
	opacity: 0;
	visibility: hidden;
	transform: scale(0.8);
}

.home .sidebar .btns {
	margin-top: 2rem;
}

.home .sidebar .btns .btn {
	padding: 0.6rem 0.8rem;
	border-radius: 8px;
	cursor: pointer;
	margin-top: 1rem;
	transition: all 0.3s;
}

.home .sidebar .btns .btn:hover {
	background-color: #f7f3f2;
}

.home .sidebar .btns svg {
	display: inline-block;
	width: 18px;
	height: 18px;
	color: #726e6e;
	vertical-align: middle;
}

.home .sidebar .btns .title {
	display: inline-block;
	font-size: 0.9rem;
	vertical-align: middle;
	margin-left: 8px;
}

.btnActive {
	background-color: #eae7ff !important;
	color: #2b0aff;
	font-weight: 700;
}

/*移动端*/
@media screen and (max-width: 700px) {
	.home .content {
		float: none;
		width: 100vw;
	}
}
</style>