<template>
	<div class="animeDetail">
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
						<img :src="anime.cover" alt="">
					</div>
					<div class="info">
						<h3>{{anime.title}}</h3>
						<div class="other">
							<div class="otherItem notNecessary">
								<span class="key">动画种类</span>
								<span>：</span>
								<span class="value">{{anime.kind}}</span>
							</div>
							<div class="otherItem">
								<span class="key">首播时间</span>
								<span>：</span>
								<span class="value">{{anime.firstPlayDate}}</span>
							</div>
							<div class="otherItem">
								<span class="key">播放状态</span>
								<span>：</span>
								<span class="value">{{anime.status}}</span>
							</div>
							<div class="otherItem">
								<span class="key">原作</span>
								<span>：</span>
								<span class="value">{{anime.original}}</span>
							</div>
							<div class="otherItem notNecessary">
								<span class="key">剧情类型</span>
								<span>：</span>
								<span class="value">{{anime.storyType}}</span>
							</div>
							<div class="otherItem">
								<span class="key">制作公司</span>
								<span>：</span>
								<span class="value">{{anime.company}}</span>
							</div>
						</div>
						<div class="intro">
							<span class="key">简介</span>
							<span>：</span>
							<span class="value">{{anime.description}}</span>
						</div>
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
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
				</el-upload>
			</div>

			<!-- 轮播图 -->
			<div class="carouselImg" v-if="images.length">
				<CarouselImg ref="carouselImg" :images="images"/>
				<div class="deleteBtn" @click="deleteImage">
					<svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path data-v-5d45e6f4="" fill="#ff0000" d="M177.1 48h93.7c2.7 0 5.2 1.3 6.7 3.6l19 28.4h-145l19-28.4c1.5-2.2 4-3.6 6.7-3.6zM354.2 80L317.5 24.9C307.1 9.4 289.6 0 270.9 0H177.1c-18.7 0-36.2 9.4-46.6 24.9L93.8 80H80.1 32 24C10.7 80 0 90.7 0 104s10.7 24 24 24H35.6L59.6 452.7c2.5 33.4 30.3 59.3 63.8 59.3H324.6c33.5 0 61.3-25.9 63.8-59.3L412.4 128H424c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8H367.9 354.2zm10.1 48L340.5 449.2c-.6 8.4-7.6 14.8-16 14.8H123.4c-8.4 0-15.3-6.5-16-14.8L83.7 128H364.3z"></path></svg>
				</div>
			</div>
			<el-empty style="height: 100vh;" v-if="!images.length" :image-size="250" description="暂无精彩瞬间，快来上传吧！"/>
		</main>
	</div>
</template>

<script>
import CarouselImg from "@/components/carouselImg.vue";
import {reqGetDetailAnime, reqUpload, reqRemoveWonderfulMoment} from "@/api";
import {mapState} from "vuex";

export default {
	name: 'AnimeDetail',
	components: {CarouselImg},
	data() {
		return {
			//允许的文件类型
			fileType: ['jpg', 'png', 'jpeg'],

			//动漫信息
			anime: {},
		}
	},
	computed: {
		collectId() {
			return this.$route.query.collectId;
		},

		//当前轮播图展示的序号
		currentImageIndex() {
			return this.mySwiper.realIndex;
		},

		...mapState(['images', 'mySwiper']),
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
			this.$message.error('文件个数超过最大个数');
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
				if (!this.fileType.includes(splitArr[splitArr.length - 1])) {
					this.$message.error(file.name + '文件类型错误！');
					return false;
				}

				//判断文件大小
				if (file.size / 1024 / 1024 > 10) {
					this.$message.error(file.name + '文件大小超过最大大小！');
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

			//上传文件
			let result = await reqUpload(this.collectId, this.$refs.upload.uploadFiles);
			this.$message({
				type: result.code === 200 ? 'success' : 'error',
				message: result.code === 200 ? '上传成功！' : '上传失败！'
			});

			if (result.code !== 200) {
				return ;
			}

			//更新数据
			await this.getDetailAnime();
			this.mySwiper.updateSlides();

			//清空上传列表
			this.$refs.upload.clearFiles();
		},

		//获取动漫详细信息
		async getDetailAnime() {
			let result = await reqGetDetailAnime(this.collectId);
			if (result.code !== 200) {
				this.$message.error(result.msg);
				return ;
			}
			this.anime = result.data.anime || {};
			this.$store.commit('IMAGES', result.data.images || [])
		},

		//删除图片
		async deleteImage() {
			let result = await reqRemoveWonderfulMoment(this.images[this.currentImageIndex]);
			this.$message({
				type: result.code === 200 ? 'success' : 'error',
				message: result.code === 200 ? '删除成功！' : '删除失败！'
			});

			//更新数据
			await this.getDetailAnime();
			this.mySwiper.updateSlides();
		}
	},
	created() {
		this.getDetailAnime();
	},
}
</script>

<style scoped>
/* region header */
.animeDetail header {
	width: 100%;
	height: 100vh;
	background: url("@/assets/animeDetail/background.jpg") no-repeat fixed center center;
	background-size: cover;
	position: relative;
}

.animeDetail header .back {
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
}

.animeDetail header .back > svg:nth-child(1) {
	cursor: pointer;
	transition: color, transform .3s;
}

.animeDetail header .back > svg:nth-child(1):hover {
	color: #2B0AFF;
	transform: translateY(-2px);
}

.animeDetail header .back > svg:nth-child(2) {
	color: #cac5c4;
}

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

.animeDetail header .arrow {
	position: absolute;
	bottom: 3rem;
	width: 100%;
	text-align: center;
	animation: bounce 1s infinite;
	cursor: pointer;
}

/* endregion */

/* region main */
.animeDetail main {
	min-height: 100vh;
	overflow: hidden;
}

.animeDetail main .animeBox .anime {
	width: 95%;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	border-radius: 5px;
}

.animeDetail main .animeBox .anime .img img {
	height: 300px;
}

.animeDetail main .animeBox .anime .info {
	min-width: 700px;
	margin-left: 15px;
}

.animeDetail main .animeBox .anime .info .other {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-auto-rows: 30px;
	line-height: 30px;
	margin-top: 15px;
}

.animeDetail main .animeBox .anime .info .other .otherItem {
	justify-items: start;
}

.animeDetail main .animeBox .anime .info .other .otherItem .key {
	display: inline-block;
	width: 76px;
	text-align: right;
}

.animeDetail main .animeBox .anime .info .intro {
	margin-top: 5px;
}

.animeDetail main .uploadBox {
	margin: 1rem 0;
}

.animeDetail main .uploadBox .upload {
	width: 70%;
	margin: 0 auto;
	box-sizing: border-box;
	padding: 1rem;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	border-radius: 5px;
	text-align: center;
}

.animeDetail main .carouselImg {
	height: 100vh;
	position: relative;
}

.animeDetail main .carouselImg .deleteBtn {
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	background-color: rgba(255, 255, 255, .7);
	position: absolute;
	top: 10px;
	right: 10px;
	z-index: 100;
	cursor: pointer;
}

.animeDetail main .carouselImg .deleteBtn svg {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	transition: transform .3s;
}

.animeDetail main .carouselImg .deleteBtn:hover svg {
	transform: translateY(-3px) translate(-50%, -50%);
}
/* endregion */

@media screen and (max-width: 700px) {
	.animeDetail main .animeBox .anime {
		display: block;
		width: 100%;
		box-sizing: border-box;
	}

	.animeDetail main .animeBox .anime .img {
		text-align: center;
	}

	.animeDetail main .animeBox .anime .info {
		width: 100%;
		min-width: 0;
		box-sizing: border-box;
		margin-left: 0;
	}

	.animeDetail main .animeBox .anime .info h3 {
		text-align: center;
	}

	.animeDetail main .animeBox .anime .info .other .otherItem .key {
		width: 68px;
		font-size: 1.2rem;
	}

	.animeDetail main .animeBox .anime .info .intro {
		font-size: 1.2rem;
	}

	.animeDetail main .uploadBox .upload {
		width: 100%;
	}

	.animeDetail main .carouselImg {
		width: 100%;
		height: 300px;
	}
}
</style>

<style>
.upload .el-button--success,
.upload .el-upload--text .el-button,
.upload .el-upload__tip,
.upload .el-upload-list .el-upload-list__item * {
	font-size: 1rem;
}

.upload .el-button--success {
	margin-left: 10px;
}

.upload .el-upload-list {
	margin-top: 10px;
}

.upload .el-upload-list .el-upload-list__item {
	line-height: 45px;
	margin: 0;
}

.upload .el-upload-list .el-upload-list__item .el-icon-close {
	top: 10px;
	font-size: 1.5rem;
}

.upload .el-upload-list .el-upload-list__item .el-upload-list__item-status-label {
	top: 10px;
}

.upload .el-upload-list .el-upload-list__item .el-upload-list__item-status-label .el-icon-upload-success {
	font-size: 1.5rem;
}
</style>