<template>
	<div class="personal-info">
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
	//100vh - content上下内边距 - contentType - personalInfo上外边距
	min-height: calc(100vh - 2rem - 50px - 1rem);
	background-color: #FFFFFF;
	box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
	border-radius: 10px;
	padding: 10px;
	box-sizing: border-box;
	margin-top: 1rem;
	position: relative;

	@media screen and (max-width: 768px) {
		//100vh - content下边距 - 移动端顶部导航 - 移动端顶部导航下外边距 - contentType - personalInfo上外边距
		min-height: calc(100vh - 6px - 50px - 10px - 25px - 1rem);
		padding: 8px;
	}

	.item {
		display: flex;
		align-items: center;
		margin-top: 2rem;

		.title {
			width: 80px;
			text-align: right;
			font-size: 1.1rem;
			margin-left: 1rem;
			margin-right: 2.5rem;

			@media screen and (max-width: 768px) {
				width: 62px;
				margin-left: 0;
				margin-right: 1rem;
			}
		}

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
		position: absolute;
		bottom: 3rem;
		left: 50%;
		transform: translateX(-50%);

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
</style>

<style lang="scss">
.personal-info {
	.el-input {
		flex: 1;
		font-size: 1rem;

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