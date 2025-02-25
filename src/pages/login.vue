<template>
	<div class="login" ref="login">
		<div class="box">
			<div class="logo">
				<i/>
				<span class="logo-font">Anime</span>
			</div>
			<div class="title">登录</div>
			<div class="form">
				<el-form
						:model="formData"
						label-position="top"
						:rules="rules"
						class="loginForm"
						hide-required-asterisk
						status-icon
						ref="loginForm"
				>
					<el-form-item label="电子邮箱" prop="email">
						<el-input v-model="formData.email" />
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="formData.password" show-password />
					</el-form-item>
					<el-form-item label="验证码" prop="checkCode">
						<div style="display: flex; align-items: center">
							<el-input v-model="formData.checkCode" class="checkCodeInput" />
							<img
									style="cursor: pointer;width: 30%;height: 40px;"
									:src="checkCodeImage"
									alt="code"
									@click="getImageCode"
									ref="imageCode">
						</div>
					</el-form-item>
					<div class="forget">
						<router-link to="/resetPassword">忘记密码？</router-link>
					</div>
					<div class="loginBtn">
						<button @click.prevent="login">
							<i class="el-icon-loading" v-show="loading" />
							<span>登录</span>
						</button>
					</div>
					<div class="goRegister">
						没有账户？去<router-link to="/register">注册</router-link>
					</div>
				</el-form>
			</div>
		</div>
		<div class="background"></div>
	</div>
</template>

<script>
import {reqGetImageCode, reqGetUserInfoByToken, reqLogin} from "@/api";
import {mapState} from "vuex";

export default {
	name: 'LoginPage',
	data() {
		return {
			//登录中加载动画开启标志
			loading: false,

			//验证码key
			checkCodeKey: '',

			//验证码图片
			checkCodeImage: '',

			//表单数据
			formData: {
				email: '',
				password: '',
				checkCode: ''
			},

			//校验规则
			rules: {
				email: [
					{required: true, message: '邮箱不能为空', trigger: 'blur'}
				],
				password: [
					{required: true, message: '密码不能为空', trigger: 'blur'}
				],
				checkCode: [
					{required: true, message: '验证码不能为空', trigger: 'blur'},
				]
			},
		}
	},
	computed: {
		...mapState(['browserIdentity']),
	},
	methods: {
		//获取图形验证码
		async getImageCode() {
			let result = await reqGetImageCode();
			if (result.code !== 200) {
				this.$message.error('验证码获取失败');
				return;
			}
			this.checkCodeKey = result.data.key;
			this.checkCodeImage = result.data.image;
		},

		//获取用户信息
		async getUserInfo() {
			let result = await reqGetUserInfoByToken();
			if (result.code !== 200) {
				this.$message.error('用户信息获取失败');
				return;
			}

			//将userInfo存入vuex和localStorage
			let userInfo = result.data;
			this.$store.commit('USER_INFO', userInfo);
			localStorage.setItem('userInfo', JSON.stringify(userInfo));
		},

		//登录
		async login() {
			this.$refs['loginForm'].validate(async (valid) => {
				if (valid) {
					//开启加载动画
					this.loading = true;

					let result = await reqLogin(this.formData.email, this.formData.password, this.checkCodeKey, this.formData.checkCode);
					if (result.code !== 200) {
						this.$message.error(result.msg);

						//刷新验证码
						await this.getImageCode();

						//关闭加载动画
						this.loading = false;
					} else {
						//将token存入vuex和localStorage
						let token = result.data;
						this.$store.commit('TOKEN', token);
						localStorage.setItem('token', token);

						//获取用户信息
						await this.getUserInfo();

						//关闭加载动画
						this.loading = false;

						//跳转到首页
						await this.$router.push('/home');
					}
				}
			});
		}
	},
	created() {
		//获取验证码
		this.getImageCode();
	},
	mounted() {
		//防止移动端软键盘引起页面高度变下
		if (this.browserIdentity === 'MOBILE') {
			this.$refs['login'].style.height = window.innerHeight  + 'px';
		}
	}
}
</script>

<style scoped lang="scss">
@font-face {
	font-family: 'logofont';
	font-display: swap;
	src: url("@/assets/fonts/logo/Vampire Wars.ttf");
}

.login {
	display: flex;
	height: 100vh;

	.background {
		flex: 64% 1 1;
		background-image: url("@/assets/images/login/background.jpg");
		background-position: center bottom;
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: cover;

		@media screen and (max-width: 768px) {
			display: none;
		}
	}

	.box {
		flex: 36% 1 1;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding: 2rem 2rem;

		@media screen and (max-width: 768px) {
			padding: 2rem;
		}

		.logo {
			i {
				display: inline-block;
				width: 32px;
				height: 32px;
				background-image: url("@/assets/images/logo.svg");
				vertical-align: middle;
			}

			.logo-font {
				font-family: "logofont" !important;
				font-style: normal;
				vertical-align: middle;
				font-size: 1.8rem;
				letter-spacing: .5rem;
				margin-left: 5px;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				background-image: linear-gradient(50deg, rgb(43, 10, 255), rgb(255, 91, 138) 49%, rgb(255, 91, 138) 53%, rgb(255, 91, 138) 55%, rgb(251, 166, 75) 77%, rgb(249, 155, 82));
				color: transparent;
				background-clip: text;
			}
		}

		.title {
			font-size: 2.5rem;
			background-image: linear-gradient(50deg, rgb(43, 10, 255), rgb(255, 91, 138) 49%, rgb(255, 91, 138) 53%, rgb(255, 91, 138) 55%, rgb(251, 166, 75) 77%, rgb(249, 155, 82));
			color: transparent;
			background-clip: text;
			margin-top: 1rem;
		}

		.form {
			min-height: 480px;
			flex: 1;
			position: relative;

			@media screen and (max-width: 768px) {
				min-height: 440px;
			}

			.loginForm {
				width: 100%;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);

				.checkCodeInput {
					width: 70%;
				}

				.forget {
					margin-top: 2rem;

					a {
						font-size: 0.8rem;
						color: rgb(43, 10, 255);
					}
				}

				.loginBtn {
					margin-top: 2rem;

					button {
						width: 100%;
						box-sizing: border-box;
						padding: 8px 0;
						border: 1px solid #e5e0df;
						border-radius: 5px;
						box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06);
						background: linear-gradient(180deg, #FFFFFF 0%, #FCF9F5 100%);
						transition: opacity 0.5s;

						&:disabled {
							opacity: 0.4;
							cursor: not-allowed;
						}

						span {
							margin-left: 5px;
						}
					}
				}

				.goRegister {
					text-align: center;
					font-size: 0.8rem;
					margin-top: 2rem;

					a {
						color: rgb(43, 10, 255);
					}
				}
			}
		}
	}
}
</style>

<!-- region 修改element-ui默认样式 -->
<style lang="scss">
.loginForm {
	.el-form-item {
		height: 81px;

		.el-form-item__content {
			margin-top: -0.5rem;
		}
	}
}
</style>