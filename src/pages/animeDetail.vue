<template>
	<div class="anime-detail" v-loading.fullscreen="controlLoading">
		<!-- el-rate与$confirm配合评分后按alt重复弹出提示框，解决方法为让a元素获得焦点 -->
		<a href="javascript:void(0)" class="solve-rate-bug-a" ref="solveRateBugA"></a>
		<div class="back" @click="$router.back()">
			<SvgIcon icon="home" size="24"/>
			<SvgIcon icon="rightArrow" size="28" color="#cac5c4"/>
			<div>{{ anime.name }}</div>
		</div>

		<!-- 动漫介绍 -->
		<div class="anime-box">
			<el-skeleton :loading="skeletonLoading" animated :count="1" class="anime">
				<div slot="template">
					<div class="skeleton-img">
						<el-skeleton-item variant="image"/>
					</div>
					<div class="skeleton-text">
						<el-skeleton-item variant="h3"/>
						<el-skeleton-item variant="text"/>
						<el-skeleton-item variant="text"/>
						<el-skeleton-item variant="text"/>
						<el-skeleton-item variant="text"/>
						<el-skeleton-item variant="text"/>
						<el-skeleton-item variant="text"/>
						<el-skeleton-item variant="text"/>
						<el-skeleton-item variant="text"/>
						<el-skeleton-item variant="text"/>
						<el-skeleton-item variant="text"/>
						<el-skeleton-item variant="text"/>
					</div>
				</div>
				<template>
					<div>
						<div class="img">
							<img :src="anime.cover" alt="">
						</div>
						<div class="info">
							<h3>{{ anime.name }}</h3>
							<el-rate
									v-model="anime.score"
									:icon-classes="iconClasses"
									void-icon-class="icon-rate-face-off"
									:colors="['#99A9BF', '#F7BA2A', '#FF9900']"
									show-text
									:texts="['不评价', '有点无聊', '一般', '满意', '神作']"
									v-show="anime.watchStatus === 'FINISHED'"
									@change="rateAnime"
							>
							</el-rate>
							<div>动画种类：{{ anime.kind }}</div>
							<div>首播时间：{{ anime.firstPlayDate }}</div>
							<div>播放状态：{{ anime.playStatus }}</div>
							<div>原作：{{ anime.original }}</div>
							<div>剧情类型：{{ anime.storyType }}</div>
							<div>制作公司：{{ anime.company }}</div>
							<div>简介：{{ anime.description }}</div>
						</div>
					</div>
				</template>
			</el-skeleton>
		</div>

		<!-- 文件上传 -->
		<div class="upload-box">
			<el-upload
					ref="upload"
					class="upload"
					action="#"
					multiple
					:limit="10"
					:on-exceed="handleOnExceed"
					:auto-upload="false"
			>
				<el-button type="primary" slot="trigger">选择文件</el-button>
				<el-button @click="manualUpload" type="success">上传到服务器</el-button>
				<div slot="tip" class="el-upload__tip">
					只能上传jpg/png文件，且不超过10MB;一次性最大上传10个文件
				</div>
			</el-upload>
		</div>

		<div class="wonderful-moment-box">
			<!-- 瀑布流 -->
			<div class="wonderful-moment">
				<wc-waterfall :gap="10" :cols="count">
					<div class="img" v-for="img in images" :key="img.id">
						<div class="control">
							<SvgIcon
									icon="fullScreen"
									color="#FFF"
									size="38"
									class="detail"
									@click.native="openImageView(img.detailUrl)"
							/>
							<SvgIcon
									icon="dustbin"
									color="#FFF"
									size="38"
									class="delete"
									@click.native="deleteImage(img.id)"
							/>
							<a :href="img.detailUrl" download>
								<SvgIcon
										icon="download"
										color="#FFF"
										size="38"
										class="delete"
								/>
							</a>
						</div>
						<img class="brief-img" v-lazy="img.briefUrl" @load='imgOnLoad' alt="">
					</div>
				</wc-waterfall>
				<el-image-viewer
						v-if="showViewer"
						:url-list="viewImage"
						:on-close="closeImageView"
				/>
			</div>

			<!-- 空标志 -->
			<el-empty v-if="!images.length" description="暂无精彩瞬间，快来上传吧！"/>

			<!-- 滚动加载动画 -->
			<scroll-animation :loading="scrollLoading"/>

			<!-- 结束标志 -->
			<end-hr content="我也是有底线的！" v-show="showEndHr"/>
		</div>
	</div>
</template>

<script>
import {reqGetDetailAnime, reqGetPageAnimeResource, reqDeleteAnimeResource, reqUpload, reqRateAnime} from "@/api";
import WcWaterfall from 'wc-waterfall';
import elImageViewer from 'element-ui/packages/image/src/image-viewer';
import {mapState} from "vuex";
import ScrollAnimation from "@/components/scrollAnimation.vue";
import EndHr from "@/components/endHr.vue";

export default {
	name: 'AnimeDetail',
	components: {WcWaterfall, elImageViewer, ScrollAnimation, EndHr},
	data() {
		return {
			//允许的文件类型
			fileType: ['jpg', 'png', 'jpeg'],

			//动漫信息
			anime: {},

			//图片数组
			images: [],

			//当前页
			current: 1,

			//每页展示数量
			size: 10,

			//是否还有下一页数据
			hasNext: false,

			//瀑布流列数
			count: 4,

			//图片预览标志
			showViewer: false,

			//预览图片
			viewImage: [],

			//操作加载标志
			controlLoading: false,

			//滚动加载标志
			scrollLoading: false,

			//图片总数
			imagesTotal: 0,

			//骨架屏开启标志
			skeletonLoading: true,

			//临时评分
			scoreTemp: 0,

			//rate样式
			iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
		}
	},
	computed: {
		//当前动漫记录id
		animeUserId() {
			return this.$route.query.animeUserId;
		},

		//是否显示结束分割线
		showEndHr() {
			return this.current > 2;
		},

		...mapState(['browserIdentity'])
	},
	methods: {
		//文件个数超过最大个数回调
		handleOnExceed() {
			this.$message.error('一次性最大上传10个文件！');
		},

		//校验文件
		checkFile(fileList) {
			if (fileList.length <= 0) {
				this.$message.error('请选择文件！');
				return false;
			}

			for (let file of fileList) {
				//判断文件类型
				let splitArr = file.name.split('.');
				if (!this.fileType.includes(splitArr[splitArr.length - 1].toLowerCase())) {
					this.$message.error(file.name + '文件类型错误！');
					return false;
				}

				//判断文件大小
				if (file.size / 1024 / 1024 > 10) {
					this.$message.error(file.name + '上传文件最大大小为10MB！');
					return false;
				}
			}

			return true;
		},

		//自定义上传
		async manualUpload() {
			//校验文件
			if (!this.checkFile(this.$refs.upload.uploadFiles)) {
				return;
			}

			try {
				//开启加载动画
				this.controlLoading = true;

				//上传文件
				let result = await reqUpload(this.animeUserId, this.$refs.upload.uploadFiles);

				if (result.code !== 200) {
					this.$message.error('上传失败！');
					return;
				}

				this.$message.success('上传成功！');

				//清空上传列表
				this.$refs.upload.clearFiles();

				//更新数据
				await this.getFirstPageWonderfulMoment();
			} finally {
				//关闭加载动画
				this.controlLoading = false;
			}
		},

		//获取动漫详细信息
		async getDetailAnime() {
			try {
				//开启骨架屏
				this.skeletonLoading = true;

				let result = await reqGetDetailAnime(this.animeUserId);
				if (result.code !== 200) {
					this.$message.error(result.msg);
					return;
				}
				this.anime = result.data || {};
				this.scoreTemp = this.anime.score;
			} finally {
				//关闭骨架屏
				this.skeletonLoading = false;
			}
		},

		//分页获取动漫精彩瞬间
		async getPageAnimeResource() {
			try {
				//开启加载动画
				this.scrollLoading = true;

				let result = await reqGetPageAnimeResource(++this.current, this.size, this.animeUserId);
				if (result.code !== 200) {
					this.$message.error(result.msg);
					return;
				}

				this.images = this.images.concat(result.data.records || []);
				this.hasNext = result.data.current < result.data.pages;
			} finally {
				//关闭加载动画
				this.scrollLoading = false;
			}
		},

		//动态加载数据
		lazyLoading() {
			let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight; //document的滚动高度
			let nowScotop = document.documentElement.clientHeight || document.body.clientHeight;  //可视区高度
			let wheight = document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度

			let bottomOfWindow = scrollHeight - wheight - nowScotop;

			//当距离底部的距离小于300px时，请求服务器数据
			if (bottomOfWindow < 300 && this.hasNext) {
				this.hasNext = false;
				this.getPageAnimeResource();
			}
		},

		//删除图片
		deleteImage(id) {
			this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
				type: 'warning',
			}).then(async () => {
				try {
					//开启加载动画
					this.controlLoading = true;

					let result = await reqDeleteAnimeResource(id, this.current, this.size);
					if (result.code !== 200) {
						this.$message.error('删除失败！');
						return;
					}
					this.$message.success('删除成功！');

					//更新数据
					this.images = this.images.filter(item => item.id !== id);
					if (result.data != null) {
						this.images.push(result.data);
					}
					this.imagesTotal--;

					//pc端根据图片数量改变瀑布流列数
					if (this.browserIdentity === 'PC') {
						this.changeWaterfallCount();
					}
				} finally {
					//关闭加载动画
					this.controlLoading = false;
				}
			}).catch(() => {
			});
		},

		//根据浏览器可视宽度改变瀑布流行数
		changeWaterfallCount() {
			//获取瀑布流最大列数
			let maxCount;
			if (window.innerWidth < 768) {
				maxCount = 1;
			} else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
				maxCount = 2;
			} else if (window.innerWidth >= 1200 && window.innerWidth < 1668) {
				maxCount = 3;
			} else {
				maxCount = 4;
			}

			this.count = this.images.length < maxCount ? this.images.length : maxCount;
		},

		//图片加载成功回调
		imgOnLoad(e) {
			if (!e.target.src.includes('image-loading')) {
				e.target.parentNode.firstChild.style.display = 'flex';
			}
		},

		//打开图片预览
		openImageView(detailUrl) {
			this.viewImage = [];
			this.viewImage.push(detailUrl);
			this.showViewer = true;

			//关闭背后滚动
			document.documentElement.style.overflowY = 'hidden';
		},

		//关闭图片预览
		closeImageView() {
			this.showViewer = false;

			//开启背后滚动
			document.documentElement.style.overflowY = 'auto';
		},

		//初始化图片数据
		async getFirstPageWonderfulMoment() {
			//获取第一页数据
			this.current = 1;
			let result = await reqGetPageAnimeResource(this.current, this.size, this.animeUserId);
			if (result.code !== 200) {
				this.$message.error(result.msg);
				return;
			}
			this.images = result.data.records || []
			this.hasNext = result.data.current < result.data.pages;
			this.imagesTotal = result.data.total;

			//PC端动态改变瀑布流行数
			if (this.browserIdentity === 'PC') {
				this.changeWaterfallCount();
			} else {
				this.count = 1;
			}
		},

		//动漫评价
		rateAnime(score) {
			this.$refs.solveRateBugA.focus();
			this.$confirm('确认给出该评分？', '提示', {
				type: 'warning',
			}).then(async () => { //确认评分
				let result = await reqRateAnime(this.animeUserId, score);
				if (result.code !== 200) {
					this.$message.error(result.msg);
					this.score = 0;
					return;
				}

				this.scoreTemp = score;
				this.$message.success('评分成功！');
			}).catch(() => { //取消评分
				this.anime.score = this.scoreTemp;
			});
		}
	},
	created() {
		//获取动漫信息
		this.getDetailAnime();

		//初始化图片数据
		this.getFirstPageWonderfulMoment();
	},
	mounted() {
		//设置500毫秒延时，防止路由切换滚动行为导致加载数据
		setTimeout(() => {
			//当滚动条接近底部时加载数据
			window.addEventListener('scroll', this.lazyLoading);

			//动态获取瀑布流行数
			window.addEventListener('resize', this.changeWaterfallCount);
		}, 500);
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.lazyLoading);
		window.removeEventListener('resize', this.changeWaterfallCount);
	},
}
</script>

<style scoped lang="scss">
@import "@/style/common";
.anime-detail {
	box-sizing: border-box;
	padding: 0 10px;

	.solve-rate-bug-a {
		position: absolute;
		top: 0;
		right: 20px;
	}

	.back {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		position: fixed;
		z-index: 100;
		top: 1rem;
		left: 1rem;
		font-size: 0.9rem;
		@include box-style;
		cursor: pointer;
		transition: all .3s ease;

		&:hover {
			background-color: #eae7ff;
			color: #2B0AFF;

			.svg-icon {
				color: #2B0AFF !important;
			}
		}

		> svg:nth-child(2) {
			margin: 0 5px;
		}
	}

	/* 骨架屏样式 */
	.el-skeleton > div {
		display: flex;
		align-items: center;

		@media screen and (max-width: 768px) {
			display: block;
		}

		.skeleton-img {
			@media screen and (max-width: 768px) {
				margin-bottom: 10px;
			}

			.el-skeleton__item {
				width: 215px;
				height: 300px;

				@media screen and (max-width: 768px) {
					margin: 0 auto;
					width: 150px;
					height: 208px;
				}
			}
		}

		.skeleton-text {
			flex: 1;
			margin-left: 15px;

			@media screen and (max-width: 768px) {
				margin-left: 0;
			}

			.el-skeleton__h3 {
				width: 250px;
				display: block;
				margin-bottom: 10px;

				@media screen and (max-width: 768px) {
					width: 150px;
					margin: 0 auto;
					margin-bottom: 4px;
				}
			}

			.el-skeleton__text {
				&:nth-child(-n + 6) {
					width: 250px;
					display: block;
					margin-bottom: 10px;

					@media screen and (max-width: 768px) {
						width: 150px;
						margin-bottom: 4px;
					}
				}
			}
		}
	}

	.anime-box {
		width: 95%;
		margin: 0 auto;
		margin-top: 4.5rem;
		@include box-style;

		@media screen and (max-width: 768px) {
			width: 100%;
			margin-top: 5rem;
		}

		.anime > div {
			display: flex;
			justify-content: center;
			align-items: center;

			@media screen and (max-width: 768px) {
				display: block;
				width: 100%;
			}

			.img {
				width: 215px;
				height: 300px;
				overflow: hidden;
				border-radius: 10px;

				@media screen and (max-width: 768px) {
					margin: 0 auto;
					width: 150px;
					height: 208px;
				}

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}

			.info {
				flex: 1;
				margin-left: 15px;

				@media screen and (max-width: 768px) {
					width: 100%;
					min-width: 0;
					box-sizing: border-box;
					margin-left: 0;
				}

				div {
					margin-top: 8px;
				}

				h3 {
					@media screen and (max-width: 768px) {
						text-align: center;
						margin-top: 5px;
					}
				}
			}
		}
	}

	.upload-box {
		margin: 1rem 0;

		.upload {
			width: 95%;
			margin: 0 auto;
			text-align: center;
			@include box-style;

			@media screen and (max-width: 768px) {
				width: 100%;
			}
		}
	}

	.wonderful-moment-box {
		width: 95%;
		margin: 0 auto;
		margin-bottom: 1rem;
		@include box-style;

		@media screen and (max-width: 768px) {
			width: 100%;
		}

		.wonderful-moment {
			overflow: hidden;

			.img {
				font-size: 0;
				text-align: center;
				min-height: 70px;
				display: flex;
				align-items: center;
				background-color: #FFFFFF;
				box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
				border-radius: 10px;
				overflow: hidden;
				user-select: none;

				/* 修改图片加载动画和加载失败大小 */
				img[lazy="loading"],
				img[lazy="error"] {
					/* 保持宽高之比为16 / 9 */
					aspect-ratio: 16 / 9;
				}

				.brief-img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}

				.control {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					background-color: rgba(0, 0, 0, 0);
					transition: background-color .5s ease;
					justify-content: space-evenly;
					align-items: center;

					&:hover {
						background-color: rgba(0, 0, 0, .4);

						.detail,
						.delete,
						.download {
							opacity: 1;
							visibility: visible;
						}
					}

					.detail,
					.delete,
					.download {
						opacity: 0;
						visibility: hidden;
						padding: 8px;
						cursor: pointer;

						&:hover {
							color: #2B0AFF !important;
						}
					}
				}
			}
		}
	}
}
</style>

<style lang="scss">
@import '@/assets/fonts/rate/style.css';

.anime-detail {
	.upload {
		.el-button--success,
		.el-upload--text .el-button,
		.el-upload__tip,
		.el-upload-list .el-upload-list__item * {
			font-size: 1rem;
		}

		.el-button--success {
			margin-left: 10px;
		}

		.el-upload-list {
			margin-top: 10px;
		}

		.el-upload-list .el-upload-list__item {
			line-height: 45px;
			margin: 0;

			.el-icon-close {
				top: 10px;
				font-size: 1.5rem;
			}

			.el-upload-list__item-status-label {
				top: 10px;

				.el-icon-upload-success {
					font-size: 1.5rem;
				}
			}
		}
	}

	.el-rate {
		margin: 15px 0 !important;

		.el-rate__icon,
		.el-rate__text {
			font-size: 1.2rem;
		}
	}
}
</style>