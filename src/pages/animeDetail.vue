<template>
	<div class="animeDetail" ref="animeDetail" v-loading.fullscreen="controlLoading">
		<header>
			<div class="back">
				<svg @click="back" width="20px" height="20.00px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
					<path fill="currentColor"
								d="M303.5 5.7c-9-7.6-22.1-7.6-31.1 0l-264 224c-10.1 8.6-11.3 23.7-2.8 33.8s23.7 11.3 33.8 2.8L64 245.5V432c0 44.2 35.8 80 80 80H432c44.2 0 80-35.8 80-80V245.5l24.5 20.8c10.1 8.6 25.3 7.3 33.8-2.8s7.3-25.3-2.8-33.8l-264-224zM112 432V204.8L288 55.5 464 204.8V432c0 17.7-14.3 32-32 32H384V312c0-22.1-17.9-40-40-40H232c-22.1 0-40 17.9-40 40V464H144c-17.7 0-32-14.3-32-32zm128 32V320h96V464H240z"></path>
				</svg>
				<svg width="35px" height="18.00px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
					<path fill="currentColor"
								d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z"></path>
				</svg>
				<div class="title">{{anime.title}}</div>
			</div>
			<div class="arrow" @click="down">
				<svg width="32px" height="32.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path fill="#000000"
								d="M511.5 789.9 80.6 359c-22.8-22.8-22.8-59.8 0-82.6 22.8-22.8 59.8-22.8 82.6 0l348.3 348.3 348.3-348.3c22.8-22.8 59.8-22.8 82.6 0 22.8 22.8 22.8 59.8 0 82.6L511.5 789.9 511.5 789.9zM511.5 789.9"/>
				</svg>
			</div>
		</header>
		<main ref="main">
			<!-- 动漫介绍 -->
			<div class="animeBox">
				<div class="anime">
					<div class="img">
						<img v-lazy="anime.cover" alt="">
					</div>
					<div class="info" v-show="anime.title!=null">
						<h3>{{anime.title}}</h3>
						<div>动画种类：{{anime.kind}}</div>
						<div>首播时间：{{anime.firstPlayDate}}</div>
						<div>播放状态：{{anime.status}}</div>
						<div>原作：{{anime.original}}</div>
						<div>剧情类型：{{anime.storyType}}</div>
						<div>制作公司：{{anime.company}}</div>
						<div>简介：{{anime.description}}</div>
					</div>
				</div>
			</div>

			<!-- 文件上传 -->
			<div class="uploadBox">
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
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB;一次性最大上传10个文件</div>
				</el-upload>
			</div>

			<!-- 瀑布流 -->
			<div class="wonderfulMoment">
				<wc-waterfall :gap="10" :cols="count">
					<div class="img" v-for="img in images" :key="img.id">
						<div class="control">
							<div class="detail" @click="openImageView(img.detailImageUrl)">
								<i class="el-icon-full-screen" />
							</div>
							<div class="delete" @click="deleteImage(img.id)">
								<i class="el-icon-delete" />
							</div>
							<a class="download" :href="toDownloadUrl(img.detailImageUrl)" download>
								<div>
									<i class="el-icon-download" />
								</div>
							</a>
						</div>
						<img class="briefImg" v-lazy="img.briefImageUrl" @load='imgOnLoad' alt="">
					</div>
				</wc-waterfall>
				<el-image-viewer v-if="showViewer" :url-list="viewImage" :on-close="closeImageView" />
			</div>

			<!-- 空标志 -->
			<el-empty style="height: 100vh;" v-if="!images.length" :image-size="250" description="暂无精彩瞬间，快来上传吧！"/>

			<!-- 滚动加载动画 -->
			<scroll-animation :loading="scrollLoading" />

			<!-- 结束标志 -->
			<end-hr content="我也是有底线的！" v-show="loadingAllAnimeFlag" />
		</main>
	</div>
</template>

<script>
import {reqGetDetailAnime, reqGetPageWonderfulMoment, reqUpload, reqRemoveWonderfulMoment} from "@/api";
import WcWaterfall from 'wc-waterfall';
import _ from "lodash";
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
			size: 20,

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
		}
	},
	computed: {
		//当前动漫记录id
		collectId() {
			return this.$route.query.collectId;
		},

		//当前动漫id
		animeId() {
			return this.$route.query.animeId;
		},

		//动漫是否全部加载完成，true代表加载完所有动漫
		loadingAllAnimeFlag() {
			return this.images.length === this.imagesTotal && this.images.length !== 0;
		},

		...mapState(['browserIdentity'])
	},
	methods: {
		/* 点击箭头滚动到内容区域 */
		down() {
			window.scrollTo({
				'top': this.$refs['main'].offsetTop,
				'behavior': 'smooth'
			});
		},

		//点击back按钮回到home
		back() {
			this.$router.back();
		},

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

			//开启加载动画
			this.controlLoading = true;

			//上传文件
			let result = await reqUpload(this.collectId, this.$refs.upload.uploadFiles);

			if (result.code !== 200) {
				//402为token过期，403为token有误
				if (result.code !== 402 && result.code !== 403) {
					this.$message.error('上传失败！');
				}

				//关闭加载动画
				this.controlLoading = false;

				return ;
			}

			this.$message.success('上传成功！');

			//清空上传列表
			this.$refs.upload.clearFiles();

			//更新数据
			await this.getFirstPageWonderfulMoment();

			//关闭加载动画
			this.controlLoading = false;
		},

		//获取动漫详细信息
		async getDetailAnime() {
			let result = await reqGetDetailAnime(this.animeId);
			if (result.code !== 200) {
				//402为token过期，403为token有误
				if (result.code !== 402 && result.code !== 403) {
					this.$message.error(result.msg);
				}

				return ;
			}
			this.anime = result.data || {};
		},

		//分页获取动漫精彩瞬间
		async getPageWonderfulMoment() {
			//开启加载动画
			this.scrollLoading = true;

			let result = await reqGetPageWonderfulMoment(this.current, this.size, this.collectId);

			if (result.code !== 200) {
				//402为token过期，403为token有误
				if (result.code !== 402 && result.code !== 403) {
					this.$message.error(result.msg);
				}

				//关闭加载动画
				this.scrollLoading = false;

				return ;
			}

			this.images = this.images.concat(result.data.records || []);
			this.hasNext = result.data.current < result.data.pages;
			this.current++;

			//关闭加载动画
			this.scrollLoading = false;
		},

		//动态加载数据
		lazyLoading() {
			let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight;

			//当距离底部的距离小于300px时，请求服务器数据
			if (bottomOfWindow < 300 && this.hasNext) {
				this.hasNext = false;
				this.getPageWonderfulMoment();
			}
		},

		//删除图片
		deleteImage: _.throttle(async function (id) {
			//开启加载动画
			this.controlLoading = true;

			let result = await reqRemoveWonderfulMoment(id);

			if (result.code !== 200) {
				//402为token过期，403为token有误
				if (result.code !== 402 && result.code !== 403) {
					this.$message.error('删除失败！');
				}

				//关闭加载动画
				this.controlLoading = false;

				return;
			}

			this.$message.success('删除成功！');

			//更新数据
			this.images = this.images.filter(item => item.id !== id);
			this.imagesTotal--;

			//pc端根据图片数量改变瀑布流列数
			if (this.browserIdentity === 1) {
				this.changeWaterfallCount();
			}

			//关闭加载动画
			this.controlLoading = false;
		}, 1000),

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
			if (!e.target.src.includes('default')) {
				e.target.parentNode.firstChild.style.display = 'flex';
			}
		},

		//打开图片预览
		openImageView(detailImageUrl) {
			this.viewImage = [];
			this.viewImage.push(detailImageUrl);
			this.showViewer = true;

			//关闭背后滚动
			document.body.style.overflow = 'hidden';
		},

		//关闭图片预览
		closeImageView() {
			this.showViewer = false;

			//开启背后滚动
			document.body.style.overflow = 'auto';
		},

		//将访问url转化为下载url
		toDownloadUrl(url) {
			return url.replace('upload-images', 'download');
		},

		//初始化图片数据
		async getFirstPageWonderfulMoment() {
			//获取第一页数据
			this.current = 1;
			let result = await reqGetPageWonderfulMoment(this.current, this.size, this.collectId);
			if (result.code !== 200) {
				//402为token过期，403为token有误
				if (result.code !== 402 && result.code !== 403) {
					this.$message.error(result.msg);
				}

				return ;
			}
			this.images = result.data.records || []
			this.hasNext = result.data.current < result.data.pages;
			this.imagesTotal = result.data.total;
			this.current++;

			//PC端动态改变瀑布流行数
			if (this.browserIdentity === 1) {
				this.changeWaterfallCount();
			} else {
				this.count = 1;
			}
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
/* 箭头跳动动画 */
@keyframes bounce {
	0%, 100% {
		transform: translateY(-25%);
		animation-timing-function: cubic-bezier(.8, 0, 1, 1);
	}
	50% {
		transform: none;
		animation-timing-function: cubic-bezier(0, 0, .2, 1);
	}
}

.animeDetail {
	header {
		width: 100%;
		height: 100vh;
		background: url("@/assets/animeDetail/background.jpg") no-repeat fixed center center;
		background-size: cover;
		position: relative;

		.back {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			background-color: #FFFFFF;
			position: fixed;
			z-index: 1000;
			top: 1rem;
			left: 1rem;
			font-size: 0.9rem;
			padding: 10px;
			border-radius: 10px;
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

			> svg:nth-child(1) {
				cursor: pointer;
				transition: color, transform .3s;
				&:hover {
					color: #2B0AFF;
					transform: translateY(-2px);
				}
			}

			> svg:nth-child(2) {
				color: #cac5c4;
			}
		}

		.arrow {
			position: absolute;
			bottom: 3rem;
			width: 100%;
			text-align: center;
			animation: bounce 1s infinite;
			cursor: pointer;
		}
	}

	main {
		min-height: 100vh;
		overflow: hidden;

		.animeBox {
			.anime {
				width: 95%;
				margin: 0 auto;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 1rem;
				box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
				border-radius: 5px;

				@media screen and (max-width: 768px) {
					display: block;
					width: 100%;
					box-sizing: border-box;
				}

				.img {
					width: 215px;
					height: 300px;
					overflow: hidden;

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

		.uploadBox {
			margin: 1rem 0;

			.upload {
				width: 70%;
				margin: 0 auto;
				box-sizing: border-box;
				padding: 1rem;
				box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
				border-radius: 5px;
				text-align: center;

				@media screen and (max-width: 768px) {
					width: 100%;
				}
			}
		}

		.wonderfulMoment {
			overflow: hidden;

			.img {
				font-size: 0;
				text-align: center;

				/* 修改图片加载动画和加载失败大小 */
				img[lazy="loading"],
				img[lazy="error"] {
					height: 250px;
				}

				.briefImg {
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
					font-size: 2rem;
					color: #FFFFFF;
					transition: background-color .5s;
					display: none;
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
						padding: 5px;
						cursor: pointer;
						transition: all .5s;
						border-radius: 10px;

						&:hover {
							background-color: rgb(43, 10, 255);
						}
					}
				}
			}
		}
	}
}
</style>

<style lang="scss">
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
</style>