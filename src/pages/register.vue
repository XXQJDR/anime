<template>
	<div class="register" ref="register">
		<div class="box">
			<div class="logo">
				<i/>
				<span class="logo-font">Anime</span>
			</div>
			<div class="title">注册</div>
			<div class="form">
				<el-form
						:model="formData"
						label-position="top"
						class="register-form"
						hide-required-asterisk
						status-icon
						ref="registerForm"
						:rules="rules"
				>
					<el-form-item label="电子邮箱" prop="email">
						<el-input v-model="formData.email"/>
					</el-form-item>
					<el-form-item label="用户名" prop="username">
						<el-input v-model="formData.username"/>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="formData.password" show-password/>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPassword">
						<el-input v-model="formData.checkPassword" show-password/>
					</el-form-item>
					<el-form-item label="验证码" prop="checkCode">
						<div class="checkCode">
							<el-input v-model="formData.checkCode" class="checkCodeInput"/>
							<el-button plain :disabled="btnDisabled" @click="getCode" ref="getCodeBtn">{{ btnMessage }}</el-button>
						</div>
					</el-form-item>
					<div class="register-btn">
						<button @click.prevent="register">
							<i class="el-icon-loading" v-show="loading"/>
							<span>注册</span>
						</button>
					</div>
					<div class="go-login">
						已有账户？去
						<router-link to="/login">登录</router-link>
					</div>
				</el-form>
			</div>
		</div>
		<div class="background"></div>
	</div>
</template>

<script>
import {reqCheckEmailRegistered, reqGetRegisterEmailCode, reqRegister} from "@/api";
import {mapState} from "vuex";

export default {
	name: 'RegisterPage',
	data() {
		//自定义确认密码规则
		let validateCheckPassword = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.formData.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};

		//自定义邮箱验证码规则
		let validateCheckCode = async (rule, value, callback) => {
			let result = await reqCheckEmailRegistered(this.formData.email);
			if (result.code !== 200) {
				callback(new Error('该邮箱已注册！'));
			} else {
				callback();
			}
		};

		return {
			//注册中加载动画开启标志
			loading: false,

			//表单数据
			formData: {
				email: '',
				username: '',
				password: '',
				checkPassword: '',
				checkCode: ''
			},

			//校验规则
			rules: {
				email: [
					{required: true, type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur'},
					{validator: validateCheckCode, trigger: 'blur'}
				],
				username: [
					{required: true, min: 3, max: 10, message: '用户名3-10位', trigger: 'blur'}
				],
				password: [
					{required: true, message: '密码不能为空', trigger: 'blur'},
					{
						pattern: /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,15}$/,
						message: '密码由字母、数字、特殊字符，任意2种组成，6-15位',
						trigger: 'blur'
					}
				],
				checkPassword: [
					{validator: validateCheckPassword, trigger: 'blur'}
				],
				checkCode: [
					{required: true, message: '验证码不能为空！', trigger: 'blur'}
				]
			},

			//倒计时
			time: 61
		}
	},
	computed: {
		...mapState(['browserIdentity']),

		//按钮显示信息
		btnMessage() {
			return this.time === 61 ? '获取验证码' : `${this.time}秒后重新获取`;
		},

		//是否启用按钮
		btnDisabled() {
			return this.time !== 61;
		},
	},
	methods: {
		//注册按钮回调
		async register() {
			this.$refs['registerForm'].validate(async (valid) => {
				if (valid) {
					//开启加载动画
					this.loading = true;

					let result = await reqRegister(this.formData.username, this.formData.password, this.formData.email, this.formData.checkCode);
					this.$message({
						type: result.code === 200 ? 'success' : 'error',
						message: result.code === 200 ? '注册成功！' : '注册失败！'
					});

					//关闭加载动画
					this.loading = false;

					//注册成功后跳转至登录页面
					if (result.code === 200) {
						await this.$router.push('/login');
					}
				}
			});
		},

		//获取验证码回调
		getCode() {
			//判断是否输入邮箱
			this.$refs.registerForm.validateField('email', async (msg) => {
				if (msg.length !== 0) {
					return;
				}

				//开始倒计时
				this.time--;
				let interval = setInterval(() => {
					this.time--;
					if (this.time === 0) {
						this.time = 61;
						clearInterval(interval);
					}
				}, 1000);

				//获取验证码
				let result = await reqGetRegisterEmailCode(this.formData.email);
				if (result.code !== 200) {
					this.$message.error(result.msg);
					this.time = 61;
					clearInterval(interval);
				}
			});
		}
	},
	mounted() {
		//防止移动端软键盘引起页面高度变下
		if (this.browserIdentity === 'MOBILE') {
			this.$refs['register'].style.height = window.innerHeight + 'px';
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

.register {
	display: flex;
	height: 100vh;
	background-color: #FFFFFF;
	overflow: hidden;

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
		padding: 1rem;

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
				font-size: 1.4rem;
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
			font-size: 1.8rem;
			background-image: linear-gradient(50deg, rgb(43, 10, 255), rgb(255, 91, 138) 49%, rgb(255, 91, 138) 53%, rgb(255, 91, 138) 55%, rgb(251, 166, 75) 77%, rgb(249, 155, 82));
			color: transparent;
			background-clip: text;
			margin: 10px 0;

			@media screen and (max-width: 768px) {
				font-size: 2.5rem;
				margin: 20px 0;
			}
		}

		.form {
			flex: 1;
			position: relative;

			.register-form {
				width: 100%;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);

				.checkCode {
					display: flex;

					.el-button {
						margin-left: 2px;
						width: 160px;

						/* 防止宽度被压缩 */
						flex: 0 0 auto;
					}
				}

				.register-btn {
					margin-top: 1rem;
					position: relative;

					@media screen and (max-width: 768px) {
						margin-top: 2rem;
					}

					button {
						width: 100%;
						box-sizing: border-box;
						padding: 8px 0;
						border: 1px solid #e5e0df;
						border-radius: 5px;
						box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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

				.go-login {
					text-align: center;
					font-size: 0.8rem;
					margin-top: 1rem;

					@media screen and (max-width: 768px) {
						margin-top: 2rem;
					}

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
.register-form {
	.el-form-item {
		margin-bottom: 0.5rem;

		.el-form-item__content {
			margin-top: -0.5rem;
		}
	}
}
</style>