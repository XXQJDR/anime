<template>
	<div class="personal-info" v-loading.fullscreen="loading">
		<div class="basic">
			<div class="type">基本信息</div>
			<el-divider/>
			<div class="item">
				<div class="title">头像</div>
				<div class="avatar" @click="dialogVisible = true">
					<img v-lazy="$store.state.userInfo.avatar" alt=""/>
				</div>
			</div>
			<div class="item">
				<div class="title">用户名</div>
				<input type="text" v-model="username">
			</div>
			<div class="item">
				<div class="title">创建日期</div>
				<div class="content">{{ $store.state.userInfo.createDate }}</div>
			</div>
			<div class="btn">
				<el-button type="primary" @click="changeBasicInfo" :disabled="changeBtnDisabled">保存</el-button>
				<el-button @click="cancelChangeBasicInfo">取消</el-button>
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
				<el-button @click="cancelUpload">取消</el-button>
      </span>
			</el-dialog>
		</div>

		<div class="security">
			<div class="type">安全信息</div>
			<el-divider/>
			<div class="item" @click="changeEmail">
				<div class="title">邮箱</div>
				<div class="content">
					<div>3124140355@qq.com</div>
					<SvgIcon icon="rightArrow" color="#999"/>
				</div>
			</div>
			<div class="item" @click="changePassword">
				<div class="title">修改密码</div>
				<div class="content">
					<SvgIcon icon="rightArrow" color="#999"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {VueCropper} from 'vue-cropper';
import {reqUpdateUserInfo, reqUploadAvatar} from "@/api";

export default {
	name: 'PersonalInfo',
	components: {VueCropper},
	data() {
		return {
			username: this.$store.state.userInfo.username,
			dialogVisible: false,
			uploadImg: '',
			loading: false, //上传图片加载动画标志
		}
	},
	computed: {
		//浏览器身份
		browserIdentity() {
			return this.$store.state.browserIdentity;
		},

		//修改按钮是否禁用
		changeBtnDisabled() {
			return this.username === this.$store.state.userInfo.username;
		}
	},
	methods: {
		//选择图片
		handleFileChange(e) {
			const file = e.target.files[0];
			if (!file) return;

			if (!/\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
				this.$message.error('图片格式不正确')
				return;
			}

			//图片大小不能超过10MB
			if (file.size > 1024 * 1024 * 10) {
				this.$message.error('图片大小不能超过10MB');
				return;
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

			//开启加载动画
			this.loading = true;

			this.$refs.cropper.getCropBlob(async data => {
				let result = await reqUploadAvatar(data);

				this.loading = false;
				this.dialogVisible = false;
				this.uploadImg = '';
				this.$refs.cropper.clearCrop();

				if (result.code !== 200) {
					this.$message.error("头像上传失败！");
					return;
				}

				//更新用户信息
				let userInfo = result.data;
				this.$store.commit('USER_INFO', userInfo);
				localStorage.setItem('userInfo', JSON.stringify(userInfo));

				this.$message.success("头像上传成功！");

				//刷新页面
				setTimeout(() => {
					window.location.reload();
				}, 300);
			});
		},

		//取消上传
		cancelUpload() {
			this.dialogVisible = false;
			this.uploadImg = '';
		},

		//修改
		async changeBasicInfo() {
			let result = await reqUpdateUserInfo(this.username);
			if (result.code !== 200) {
				this.$message.error("修改失败！");
				return;
			}

			//更新用户信息
			let userInfo = result.data;
			this.$store.commit('USER_INFO', userInfo);
			localStorage.setItem('userInfo', JSON.stringify(userInfo));
			this.$message.success("修改成功！");
		},

		//取消修改
		cancelChangeBasicInfo() {
			this.username = this.$store.state.userInfo.username;
		},

		//修改邮箱
		changeEmail() {

		},

		//修改密码
		changePassword() {

		}
	}
}
</script>

<style scoped lang="scss">
@import "@/style/common";

.personal-info {
	margin-top: 1rem;

	.basic,
	.security {
		@include box-style;

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

			@include input-style;

			input {
				padding-left: 15px;
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