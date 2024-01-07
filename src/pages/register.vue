<template>
	<div class="container" ref="container">
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
						class="registerForm"
						hide-required-asterisk
						status-icon
						ref="registerForm"
						:rules="rules"
				>
					<el-form-item label="电子邮箱" prop="email">
						<el-input v-model="formData.email" />
					</el-form-item>
					<el-form-item label="用户名" prop="username">
						<el-input v-model="formData.username" />
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="formData.password" show-password />
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPassword">
						<el-input v-model="formData.checkPassword" show-password />
					</el-form-item>
					<el-form-item label="验证码" prop="checkCode">
						<div class="checkCode">
							<el-input v-model="formData.checkCode" class="checkCodeInput" />
							<div @click="getCode" v-show="time === 61" class="codeBtn1">获取验证码</div>
							<div v-show="time !== 61" class="codeBtn2">{{ time }}秒后重新获取</div>
						</div>
					</el-form-item>
					<div class="registerBtn">
						<button @click.prevent="register">
							<i class="el-icon-loading" v-show="loading" />
							<span>登录</span>
						</button>
					</div>
					<div class="goLogin">
						已有账户？去<router-link to="/login">登录</router-link>
					</div>
				</el-form>
			</div>
		</div>
		<div class="background"></div>
	</div>
</template>

<script>
import {reqGetEmailCode, reqRegister} from "@/api";
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
					{required: true, type: 'email', message:'请输入正确的邮箱格式', trigger: 'blur'}
				],
				username: [
					{required: true, min: 3, max: 10, message: '用户名3-10位', trigger: 'blur'}
				],
				password: [
					{required: true, message: '密码不能为空', trigger: 'blur'},
					{pattern: /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,15}$/, message: '密码由字母、数字、特殊字符，任意2种组成，6-15位', trigger: 'blur'}
				],
				checkPassword: [
					{validator: validateCheckPassword, trigger: 'blur'}
				],
				checkCode: [
					{required: true, message:'验证码不能为空', trigger: 'blur'}
				]
			},

			//倒计时
			time: 61
		}
	},
	computed: {
		...mapState(['browserIdentity']),
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
						message: result.msg
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
		async getCode() {
			//判断是否输入邮箱
			this.$refs.registerForm.validateField('email');

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
			let result = await reqGetEmailCode(this.formData.email);
			this.$message({
				type: result.code === 200 ? 'success' : 'error',
				message: result.msg
			});
		}
	},
	mounted() {
		//防止移动端软键盘引起页面高度变下
		if (this.browserIdentity === 2) {
			this.$refs['container'].style.height = window.innerHeight  + 'px';
		}
	}
}
</script>

<style scoped>
.container {
	display: flex;
	height: 100vh;
}

.box {
	flex: 36% 1 1;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}

.background {
	flex: 64% 1 1;
	background-image: url("@/assets/login/background.jpg");
	background-position: center bottom;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: cover;
}

.logo i {
	display: inline-block;
	width: 32px;
	height: 32px;
	background-image: url("@/assets/logo.svg");
	vertical-align: middle;
}

@font-face {
	font-family: 'logofont';
	font-display: swap;
	src: url("@/font/logo/Vampire Wars.ttf");
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

.box .title {
	font-size: 2.5rem;
	background-image: linear-gradient(50deg, rgb(43, 10, 255), rgb(255, 91, 138) 49%, rgb(255, 91, 138) 53%, rgb(255, 91, 138) 55%, rgb(251, 166, 75) 77%, rgb(249, 155, 82));
	color: transparent;
	background-clip: text;
}

.box .form {
	flex: 1;
	position: relative;
}

.box .registerForm {
	width: 100%;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}

.checkCode {
	display: flex;
}

.codeBtn1,
.codeBtn2 {
	width: 50%;
	border-radius: 5px;
	background-color: #9C77D1;
	color: #FFFFFF;
	box-shadow: 0 0 1px black;
	font-size: 1rem;
	text-align: center;
}

.codeBtn1 {
	cursor: pointer;
	transition: font-size .3s;
}

.codeBtn1:hover {
	font-size: 1.05rem;
}

.codeBtn2 {
	cursor: not-allowed;
}

.registerBtn button {
	width: 100%;
	box-sizing: border-box;
	padding: 8px 0;
	border: 1px solid #e5e0df;
	border-radius: 5px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06);
	background: linear-gradient(180deg, #FFFFFF 0%, #FCF9F5 100%);
	transition: opacity 0.5s;
}

.registerBtn button:disabled {
	opacity: 0.4;
	cursor: not-allowed;
}

.goLogin {
	text-align: center;
	font-size: 0.8rem;
}

.goLogin a {
	color: rgb(43, 10, 255);
}

/*移动端*/
@media screen and (max-width: 768px) {
	.background {
		display: none;
	}

	.box {
		padding: 2rem;
	}

	.box .title,
	.registerBtn,
	.goLogin {
		margin-top: 2rem;
	}
}

/*PC端*/
@media screen and (min-width: 770px) {
	.box {
		padding: 2rem 2rem;
	}

	.box .title,
	.goLogin,
	.registerBtn {
		margin-top: 1rem;
	}
}
</style>

<!-- region 修改element-ui默认样式 -->
<style>
.registerForm .el-form-item {
	margin-bottom: 0.5rem;
}

.registerForm .el-input .el-input__inner {
	height: 38px;
}

.registerForm .el-input .el-input__inner:focus {
	border: 2px solid rgb(49, 130, 206);
}

.registerForm .el-form-item * {
	font-size: 1rem;
}

.registerForm .el-form-item .el-form-item__content {
	margin-top: -0.5rem;
}

.registerForm .el-form-item .el-form-item__error {
	font-size: 0.8rem;
	white-space: nowrap;
}

.el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-input__inner:focus,
.el-form-item.is-error .el-textarea__inner,
.el-form-item.is-error .el-textarea__inner:focus,
.el-message-box__input input.invalid,
.el-message-box__input input.invalid:focus {
	border: 2px solid #F56C6C;
}

.registerForm .el-form-item .checkCodeInput {
	width: 50%;
}
</style>