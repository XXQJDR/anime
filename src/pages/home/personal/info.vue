<template>
	<div class="personal-info">
		<div class="basic">
			<div class="type">基本信息</div>
			<el-divider />
			<div class="item">
				<div class="title">头像</div>
				<div class="avatar" @click="dialogVisible = true">
					<img :src="cropperImg" alt=""/>
				</div>
			</div>
			<div class="item">
				<div class="title">用户名</div>
				<el-input v-model="username"/>
			</div>
			<div class="item">
				<div class="title">创建日期</div>
				<div class="content">2023-01-01</div>
			</div>
			<div class="btn">
				<el-button type="primary">保存</el-button>
				<el-button>取消</el-button>
			</div>

			<!--头像修改dialog-->
			<el-dialog
					title="上传图片"
					:visible.sync="dialogVisible"
					center
					:width="browserIdentity === 'MOBILE' ? '100%' : '50%'"
					:show-close="false"
					:close-on-press-escape="false"
					:close-on-click-modal="false"
			>
				<div class="cropper">
					<VueCropper
							ref="cropper"
							:img="uploadImg"
							outputType="webp"
							autoCrop
							autoCropWidth="200"
							autoCropHeight="200"
							fixed
							fixedBox
							:canMoveBox="false"
							centerBox
					></VueCropper>
				</div>
				<div class="control">
					<input
							type="file"
							ref="fileInput"
							accept="image/*"
							@change="handleFileChange"
							hidden
					>
					<el-button @click="$refs.fileInput.click()">选择图片</el-button>
					<el-button @click="$refs.cropper.rotateLeft()">左旋转</el-button>
					<el-button @click="$refs.cropper.rotateRight()">右旋转</el-button>
				</div>
				<span slot="footer" class="dialog-footer">
        <el-button @click="upload" type="primary">上传</el-button>
				<el-button @click="cancel">取消</el-button>
      </span>
			</el-dialog>
		</div>

		<div class="security">
			<div class="type">安全信息</div>
			<el-divider />
			<div class="item">
				<div class="title">邮箱</div>
				<div class="content">
					<div>3124140355@qq.com</div>
					<SvgIcon icon="rightArrow" color="#999" />
				</div>
			</div>
			<div class="item">
				<div class="title">修改密码</div>
				<div class="content">
					<SvgIcon icon="rightArrow" color="#999" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {VueCropper} from 'vue-cropper';

export default {
	name: 'PersonalInfo',
	components: {VueCropper},
	data() {
		return {
			username: 'ensolitude',
			dialogVisible: false,
			uploadImg: '',
			cropperImg: 'http://q.qlogo.cn/headimg_dl?dst_uin=3124140355&spec=640&img_type=jpg'
		}
	},
	computed: {
		browserIdentity() {
			return this.$store.state.browserIdentity;
		}
	},
	methods: {
		//选择图片
		handleFileChange(e) {
			const file = e.target.files[0];
			if (!file) return;

			if (!/\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
				this.$message.error('图片格式不正确')
				return
			}

			const reader = new FileReader();
			reader.onload = (e) => {
				this.uploadImg = e.target.result
			}
			reader.readAsDataURL(file);
		},

		//上传
		upload() {
			if (this.uploadImg === '') {
				this.$message.warning('请选择图片');
				return;
			}

			this.$refs.cropper.getCropData(data => {
				this.cropperImg = data;
				this.dialogVisible = false;
				this.uploadImg = '';
				this.$message.success('上传成功');
			});
		},

		//取消
		cancel() {
			this.dialogVisible = false;
			this.uploadImg = '';
		}
	}
}
</script>

<style scoped lang="scss">
.personal-info {
	margin-top: 1rem;

	.basic,
	.security {
		background-color: #FFFFFF;
		box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
		border-radius: 10px;
		padding: 10px;
		box-sizing: border-box;

		@media screen and (max-width: 768px) {
			padding: 8px;
		}

		.type {
			font-size: 1.2rem;
			font-weight: bold;
		}

		.el-divider {
			margin: 10px 0;

			@media screen and (max-width: 768px) {
				margin: 8px 0;
			}
		}

		.item {
			display: flex;
			align-items: center;
			margin-top: 1.5rem;

			.title {
				width: 80px;
				text-align: right;
				margin-left: 1rem;
				margin-right: 2.5rem;

				@media screen and (max-width: 768px) {
					width: 62px;
					margin-left: 0;
					margin-right: 1rem;
				}
			}
		}
	}

	/* 基本信息 */
	.basic {
		.item {
			.avatar {
				width: 100px;
				height: 100px;
				border-radius: 50%;
				overflow: hidden;
				cursor: pointer;

				@media screen and (max-width: 768px) {
					width: 70px;
					height: 70px;
				}

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
		}

		.btn {
			text-align: center;
			margin-top: 1.5rem;

			.el-button {
				font-size: 1rem;
			}
		}

		.cropper {
			height: 420px;
		}

		.control {
			text-align: center;
			margin-top: 1rem;
		}
	}

	/* 安全信息 */
	.security {
		margin-top: .6rem;

		.item {
			justify-content: space-between;
			cursor: pointer;
			border-radius: 5px;
			padding: 15px 0;
			transition: background-color .3s ease;
			margin-top: .6rem;
			padding-right: 10px;

			&:hover {
				background-color: #f7f3f2;
			}

			.content {
				display: flex;
				justify-content: center;
				align-items: center;

				.svg-icon {
					margin-left: 10px;
				}
			}
		}
	}
}
</style>

<style lang="scss">
.personal-info {
	.el-input {
		flex: 1;

		.el-input__inner {
			color: #000000;
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
			padding: 0 10px;
		}

		.el-dialog__footer {
			padding: 20px 0;
		}
	}

	.cropper-crop-box {
		border-radius: 50%;
		overflow: hidden;
	}
}
</style>