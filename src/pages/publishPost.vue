<template>
	<div class="publish-post" v-loading.fullscreen.lock="loading">
		<div class="back" @click="$router.back()">
			<SvgIcon icon="home" size="24"/>
			<SvgIcon icon="rightArrow" size="28" color="#cac5c4"/>
			<span>返回</span>
		</div>

		<h2>发布帖子</h2>

		<!-- 文本框 -->
		<el-input
				type="textarea"
				:autosize="{minRows: 2}"
				placeholder="分享你的想法！"
				v-model="content"
		/>

		<!-- 图片上传 -->
		<div class="image-upload">

			<!-- 上传按钮 -->
			<el-tooltip placement="top">
				<el-button @click="$refs.fileInput.click()">选择图片</el-button>
				<div slot="content">
					<div>1.图片最大不超过10MB</div>
					<div>2.至少添加1张，最多添加10张图片</div>
					<div>3.
						<SvgIcon icon="crown" color="#fff"/>
						表示封面图片
					</div>
				</div>
			</el-tooltip>
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
				<div class="box" v-for="(image, index) in previewImages" :key="index">
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
					<SvgIcon icon="crown" class="crown" size="32" v-show="coverImageIndex === index"/>
				</div>
			</div>

			<!-- 大图预览 -->
			<el-image-viewer
					v-if="showViewer"
					:url-list="previewImages"
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
	</div>
</template>

<script>
import elImageViewer from 'element-ui/packages/image/src/image-viewer';
import {reqPublishPost} from "@/api";

export default {
	name: 'PublishPost',
	components: {elImageViewer},
	data() {
		return {
			content: '', //发布内容
			previewImages: [], //上传图片
			showViewer: false, //大图预览标志
			currentImageIndex: 0, //当前大图预览索引
			coverImageIndex: 0, //封面图片索引
			compressedFiles: [], //存储压缩后的文件信息
			loading: false, //加载标志
		}
	},
	computed: {
		//发布按钮禁用标志
		publicBtnDisabled() {
			return this.content.length === 0 || this.previewImages.length === 0;
		}
	},
	methods: {
		//处理上传图片
		async handleImageUpload(e) {
			const files = Array.from(e.target.files);

			if (this.previewImages.length + files.length > 10) {
				this.$message.warning('最多添加10张图片');
				return;
			}

			for (const file of files) {
				if (!file.type.match('image.*')) {
					this.$message.warning('请选择正确的图片文件');
					continue;
				}

				// 压缩并获取Blob对象
				const compressedBlob = await this.compressImage(file);
				if (compressedBlob) {
					// 转换为可预览的DataURL
					const dataUrl = URL.createObjectURL(compressedBlob);
					this.previewImages.push(dataUrl);

					// 也可以直接上传压缩后的文件
					const compressedFile = new File([compressedBlob], file.name, {
						type: file.type,
						lastModified: Date.now()
					});
					this.compressedFiles.push(compressedFile);
				}
			}
		},

		//压缩图片
		compressImage(file) {
			return new Promise((resolve) => {
				const reader = new FileReader();
				reader.onload = (event) => {
					const img = new Image();
					img.src = event.target.result;

					img.onload = () => {
						const canvas = document.createElement('canvas');
						const ctx = canvas.getContext('2d');

						// 保持原始尺寸
						canvas.width = img.naturalWidth;
						canvas.height = img.naturalHeight;

						// 绘制原始尺寸图像
						ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

						// 获取原始图片类型
						const mimeType = file.type || 'image/jpeg';

						// 设置压缩质量（建议范围）
						let quality = 0.7; // 默认质量
						if (mimeType === 'image/png') quality = 0.9; // PNG需要更高设置

						// 转换为Blob对象
						canvas.toBlob(
								(blob) => resolve(blob),
								mimeType,
								quality
						);
					};
				};
				reader.readAsDataURL(file);
			});
		},

		//打开大图预览
		openImageView(index) {
			this.showViewer = true;
			this.currentImageIndex = index;

			//关闭背后滚动
			document.documentElement.style.overflowY = 'hidden';
		},

		//关闭大图预览
		closeImageView() {
			this.showViewer = false;

			//开启背后滚动
			document.documentElement.style.overflowY = 'auto';
		},

		//标记为封面
		markCrown(index) {
			if (index === this.coverImageIndex) {
				return;
			}

			this.$confirm('是否将当前图片设为封面？', '提示', {
				type: 'warning'
			}).then(() => {
				this.coverImageIndex = index;
				this.$message.success('设置成功！')
			}).catch(() => {
			});
		},

		//删除图片
		deleteImage(index) {
			this.$confirm('是否删除该图片？', '提示', {
				type: 'warning'
			}).then(() => {
				if (index === this.coverImageIndex) {
					this.coverImageIndex = 0;
				} else if (index < this.coverImageIndex) {
					this.coverImageIndex--;
				}
				this.previewImages.splice(index, 1);
				this.compressedFiles.splice(index, 1);
				this.$message.success('删除成功！');
			}).catch(() => {
			});
		},

		// 清理上传内容
		clearUploadedFiles() {
			//释放所有预览图片的 Object URL
			this.previewImages.forEach(url => {
				URL.revokeObjectURL(url);
			});

			//清空预览图片数组
			this.previewImages = [];

			//清空压缩后的文件数组
			this.compressedFiles = [];

			this.content = '';
		},

		//发布帖子
		async publish() {
			this.loading = true;
			let result = await reqPublishPost(this.content, this.coverImageIndex, this.compressedFiles);
			if (result.code !== 200) {
				this.$message.error('发布失败！');
				this.loading = false;
				return;
			}
			this.$message.success('发布成功！');

			//清理内存
			this.clearUploadedFiles();
			this.loading = false;
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

	.back {
		position: absolute;
		@include box-style;
		cursor: pointer;
		transition: all .3s ease;
		display: flex;
		align-items: center;

		&:hover {
			background-color: #eae7ff;
			color: #2B0AFF;

			.svg-icon {
				color: #2B0AFF !important;
			}
		}
	}

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

						//防止图片下圆角显示不正常
						display: block;
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
}
</style>