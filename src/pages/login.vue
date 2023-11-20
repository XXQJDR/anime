<template>
	<div class="container">
		<div class="box">
			<div class="logo">
				<i/>
				<span>Anime</span>
			</div>
			<div class="title">登录</div>
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
					<el-input v-model="temp.email" @blur="blurHandle('email')" />
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="temp.password" show-password @blur="blurHandle('password')" />
				</el-form-item>
				<el-form-item label="验证码" prop="checkCode">
					<div style="display: flex; align-items: center">
						<el-input v-model="temp.checkCode" @blur="blurHandle('checkCode')" class="checkCodeInput" />
						<img src="data:image/jpg;base64,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" alt="">
					</div>
				</el-form-item>
				<div class="forget">
					<a href="javascript:void(0);">忘记密码？</a>
				</div>
				<div class="loginBtn">
					<button @click.prevent="login" :disabled="!verifyFlag">登录</button>
				</div>
				<div class="goRegister">
					没有账户？去<router-link to="/register">注册</router-link>
				</div>
			</el-form>
		</div>
		<div class="background"></div>
	</div>
</template>

<script>
export default {
	name: 'LoginPage',
	data() {
		return {
			//表单数据
			formData: {
				email: '',
				password: '',
				checkCode: ''
			},

			//临时变量，由于el-input不支持v-model.lazy。所以利用临时变量来实现延时收集数据
			temp: {
				email: '',
				password: '',
				checkCode: ''
			},

			//校验标志
			flag: {
				email: false,
				password: false,
				checkCode: false
			},

			//校验规则
			rules: {
				email: [
					{required: true, type: 'email', message:'请输入正确的邮箱格式', trigger: 'manual'}
				],
				password: [
					{required: true, message: '密码不能为空', trigger: 'manual'},
					{pattern: /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,15}$/, message: '密码由字母、数字、特殊字符，任意2种组成，6-15位', trigger: 'manual'}
				],
				checkCode: [
					{required: true, message: '验证码不能为空', trigger: 'manual'},
					{pattern: /^[0-9A-Za-z]+$/, message: '验证码格式有误', trigger: 'manual'}
				]
			},
		}
	},
	methods: {
		//提交表单回调
		login() {
			console.log(this.formData);
		},

		//输入框失去焦点回调
		blurHandle(type) {
			this.formData[type] = this.temp[type];

			//校验对应字段
			this.$refs.loginForm.validateField(type, errorMessage => {
				this.flag[type] = (errorMessage === '' || errorMessage == null);
			});
		}
	},
	computed: {
		//表单校验成功标志
		verifyFlag() {
			return this.flag.email && this.flag.password;
		}
	},
}
</script>

<style scoped>
.container {
	display: flex;
	height: 100vh;
	user-select: none;
}

.box {
	flex: 36% 1 1;
	box-sizing: border-box;
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

.logo span {
	font-family: "Segoe Script", serif;
	vertical-align: middle;
	font-size: 1.2rem;
	font-weight: bold;
}

.box .title {
	font-size: 2.5rem;
	background-image: linear-gradient(50deg, rgb(43, 10, 255), rgb(255, 91, 138) 49%, rgb(255, 91, 138) 53%, rgb(255, 91, 138) 55%, rgb(251, 166, 75) 77%, rgb(249, 155, 82));
	color: transparent;
	background-clip: text;
	margin-top: 2rem;
}

.loginForm {
	margin-top: 2rem;
}

.checkCodeInput {
	width: 70%;
}

.forget {
	margin-top: 2rem;
}

.forget a {
	font-size: 0.8rem;
	color: rgb(43, 10, 255);
}

.loginBtn {
	margin-top: 2rem;
}

.loginBtn button {
	width: 100%;
	box-sizing: border-box;
	padding: 8px 0;
	border: 1px solid #e5e0df;
	border-radius: 5px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06);
	background: linear-gradient(180deg, #FFFFFF 0%, #FCF9F5 100%);
	transition: opacity 0.5s;
}

.loginBtn button:disabled {
	opacity: 0.4;
	cursor: not-allowed;
}

.goRegister {
	text-align: center;
	font-size: 0.8rem;
	margin-top: 2rem;
}

.goRegister a {
	color: rgb(43, 10, 255);
}

/*移动端*/
@media screen and (max-width: 700px) {
	.background {
		display: none;
	}

	.box {
		padding: 2rem;
	}

	.loginForm {
		margin-top: 5rem;
	}
}

/*PC端*/
@media screen and (min-width: 770px) {
	.box {
		padding: 2rem 3rem;
	}
}
</style>

<!-- region 修改element-ui默认样式 -->
<style>
.loginForm .el-form-item {
	height: 81px;
}

.loginForm .el-form-item * {
	font-size: 1rem;
}

.loginForm .el-input .el-input__inner {
	height: 38px;
}

.loginForm .el-input .el-input__inner:focus {
	border: 2px solid rgb(49, 130, 206);
}

.loginForm .el-form-item .el-form-item__content {
	margin-top: -0.5rem;
}

.loginForm .el-form-item .el-form-item__error {
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
</style>