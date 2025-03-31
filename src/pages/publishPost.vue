<template>
	<div class="publish-post">
		<h2>发布帖子</h2>

		<!-- 文本框 -->
		<el-input
				type="textarea"
				:autosize="{minRows: 2}"
				placeholder="分享你的想法！"
				v-model="text"
		/>

		<!-- 图片上传 -->
		<div class="image-upload">

			<!-- 上传按钮 -->
			<div class="upload-options">
				<el-tooltip placement="top">
					<el-button @click="$refs.fileInput.click()">本地图片</el-button>
					<div slot="content">
						<div>1.图片最大不超过10MB</div>
						<div>2.最多添加10张图片</div>
						<div>3.
							<SvgIcon icon="crown" color="#fff"/>
							表示封面图片
						</div>
					</div>
				</el-tooltip>
				<el-button @click="dialogVisible = true">选择已上传图片</el-button>
			</div>
			<input
					type="file"
					ref="fileInput"
					accept="image/*"
					multiple
					hidden
					@change="handleImageUpload"
			>

			<!-- 图片预览 -->
			<div class="image-preview">
				<div class="box" v-for="(image, index) in images" :key="index">
					<div class="img">
						<div class="control">
							<SvgIcon
									icon="fullScreen"
									color="#FFF"
									size="32"
									class="detail"
									@click.native="openImageView(index)"
							/>
							<SvgIcon
									icon="crown"
									color="#FFF"
									size="32"
									class="mark-crown"
									@click.native="markCrown(index)"
							/>
							<SvgIcon
									icon="dustbin"
									color="#FFF"
									size="32"
									class="delete"
									@click.native="deleteImage(index)"
							/>
						</div>
						<img :src="image" alt="">
					</div>

					<!-- 封面标志 -->
					<SvgIcon icon="crown" class="crown" size="32" v-show="crownImageIndex === index"/>
				</div>
			</div>

			<!-- 大图预览 -->
			<el-image-viewer
					v-if="showViewer"
					:url-list="images"
					:on-close="closeImageView"
					:initialIndex="currentImageIndex"
			/>
		</div>

		<!-- 发布按钮 -->
		<el-button
				type="success"
				class="publish-btn"
				:disabled="publicBtnDisabled"
				@click="publish"
		>发布
		</el-button>

		<!-- 选择动漫图片对话框 -->
		<el-dialog
				:visible.sync="dialogVisible"
				:width="browserIdentity === 'MOBILE' ? '100%' : '80%'"
		>
			<div class="anime-image-select">
				<!-- 动漫列表 -->
				<div class="left">
					<!-- 搜索框 -->
					<input type="text" placeholder="请输入动漫名称！">

					<!-- 列表 -->
					<div class="anime-list">
						<div
								class="anime"
								:class="{'anime-active': i === currentAnimeIndex}"
								v-for="i in 10"
								:key="i"
								@click="selectAnime(i)"
						>
							<div class="img">
								<img src="https://cdn.aqdstatic.com:966/age/20250044.jpg" alt="">
							</div>
							<div class="name">地缚少年花子君 第二季</div>
						</div>
					</div>
				</div>

				<!-- 图片列表 -->
				<div class="right">
					<h3 class="title">请选择图片</h3>
					<div class="image-list">
						<div class="img" v-for="i in 10" :key="i">
							<img src="https://picsum.photos/300/200" alt=""></img>
						</div>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import elImageViewer from 'element-ui/packages/image/src/image-viewer';

export default {
	name: 'PublishPost',
	components: {elImageViewer},
	data() {
		return {
			text: '', //发布内容
			images: [], //上传图片
			showViewer: false, //大图预览标志
			currentImageIndex: 0, //当前大图预览索引
			crownImageIndex: 0, //封面图片索引
			dialogVisible: false, //对话框标志
			currentAnimeIndex: -1, //当前选中动漫索引
		}
	},
	computed: {
		//发布按钮禁用标志
		publicBtnDisabled() {
			return this.text.length === 0;
		},

		//浏览器身份
		browserIdentity() {
			return this.$store.state.browserIdentity;
		}
	},
	methods: {
		handleImageUpload(e) {
			const files = Array.from(e.target.files);

			files.forEach(file => {
				if (!file.type.match('image.*')) {
					this.$message.warning('请选择正确的图片文件');
					return;
				}

				const reader = new FileReader();

				reader.onload = (event) => {
					this.images.push(event.target.result);
					console.log(event.target);
				};

				reader.readAsDataURL(file);
			});
		},

		openImageView(index) {
			this.showViewer = true;
			this.currentImageIndex = index;

			//关闭背后滚动
			document.documentElement.style.overflowY = 'hidden';
		},

		closeImageView() {
			this.showViewer = false;

			//开启背后滚动
			document.documentElement.style.overflowY = 'auto';
		},

		markCrown(index) {
			if (index === this.crownImageIndex) {
				return;
			}

			this.$confirm('是否将当前图片设为封面？', '提示', {
				type: 'warning'
			}).then(() => {
				this.crownImageIndex = index;
				this.$message.success('设置成功！')
			}).catch(() => {
			});
		},

		deleteImage(index) {
			this.$confirm('是否删除该图片？', '提示', {
				type: 'warning'
			}).then(() => {
				if (index === this.crownImageIndex) {
					this.crownImageIndex = 0;
				} else if (index < this.crownImageIndex) {
					this.crownImageIndex--;
				}
				this.images.splice(index, 1);
				this.$message.success('删除成功！')
			}).catch(() => {
			});
		},

		selectAnime(index) {
			this.currentAnimeIndex = index;
		},

		publish() {

		}
	}
}
</script>

<style scoped lang="scss">
@import "@/style/common";

.publish-post {
	width: 900px;
	max-width: 100%;
	@include box-style;
	margin: 1rem auto;
	padding: 1rem;
	position: relative;

	h2 {
		text-align: center;
		margin-top: 1rem;
	}

	//文本框
	.el-textarea {
		font-size: 1rem;
		margin-top: 1rem;
	}

	//图片上传
	.image-upload {
		margin-top: 1rem;
		text-align: center;

		.el-button {
			font-size: 1rem;
		}

		//图片预览
		.image-preview {
			margin-top: 1rem;
			min-height: 200px;
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
			justify-content: center;

			@media screen and (max-width: 768px) {
				min-height: 180px;
			}

			.box {
				position: relative;

				.img {
					width: 200px;
					height: 200px;
					border-radius: 10px;
					overflow: hidden;
					position: relative;
					user-select: none;
					box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);

					@media screen and (max-width: 768px) {
						width: 180px;
						height: 180px;
					}

					.control {
						width: 100%;
						height: 100%;
						position: absolute;
						top: 0;
						left: 0;
						background-color: rgba(0, 0, 0, 0);
						transition: background-color .5s ease;
						display: flex;
						justify-content: space-evenly;
						align-items: center;

						&:hover {
							background-color: rgba(0, 0, 0, .4);

							.detail,
							.mark-crown,
							.delete {
								opacity: 1;
								visibility: visible;
							}
						}

						.detail,
						.mark-crown,
						.delete {
							opacity: 0;
							visibility: hidden;
							padding: 8px;
							cursor: pointer;

							&:hover {
								color: #2B0AFF !important;
							}
						}
					}

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
				}

				.crown {
					position: absolute;
					top: -15px;
					left: -15px;
					transform: rotateZ(-40deg);
				}
			}
		}
	}

	//发布按钮
	.publish-btn {
		width: 100%;
		margin-top: 1rem;
		font-size: 1rem;
	}

	.anime-image-select {
		display: flex;
		font-size: 1rem;

		.left {
			flex: 1;
			height: 500px;
			@include box-style;
			@include input-style;
			overflow-y: auto;

			input {
				text-align: center;
			}

			.anime-list {
				margin-top: 1rem;

				.anime-active {
					background-color: #eae7ff !important;
					color: #2b0aff;
					font-weight: 700;
				}

				.anime {
					display: flex;
					align-items: center;
					padding: 3px 0;
					border-bottom: 1px solid rgba(0, 0, 0, .1);
					cursor: pointer;
					transition: all .5s ease;
					border-radius: 10px;

					&:hover {
						background-color: #F7F3F2;
					}

					.img {
						height: 120px;
						border-radius: 10px;
						overflow: hidden;
						flex-shrink: 0;

						@media screen and (max-width: 768px) {
							height: 80px;
						}

						img {
							width: 100%;
							height: 100%;
							object-fit: cover;
						}
					}

					.name {
						margin-left: 5px;
					}
				}
			}
		}

		.right {
			flex: 1;
			height: 500px;
			@include box-style;
			margin-left: 10px;
			overflow-y: auto;

			@media screen and (max-width: 768px) {
				margin-left: 5px;
			}

			.title {
				color: #000000;
				text-align: center;
			}

			.image-list {
				margin-top: 1rem;

				.img {
					width: 100%;
					border-radius: 10px;
					overflow: hidden;
					flex-shrink: 0;
					cursor: pointer;

					@media screen and (max-width: 768px) {
						height: 80px;
					}

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
				}
			}
		}
	}
}
</style>

<style lang="scss">
.publish-post {
	.el-textarea__inner {
		color: #000000;
		transition: all .3s ease;

		&:focus {
			border-color: #2b0aff;
			box-shadow: #2b0aff 0 0 0 1px;
		}
	}

	.el-dialog {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		margin-top: 0 !important;
		margin-bottom: 0 !important;

		.el-dialog__body {
			@media screen and (max-width: 768px) {
				padding: 5px;
			}
		}
	}
}
</style>