<template>
	<div class="container">
		<div class="box">
			<div class="logo">
				<i/>
				<span>Anime</span>
			</div>
			<div class="title">注册</div>
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
					<el-input v-model="temp.email" @blur="blurHandle('email')" />
				</el-form-item>
				<el-form-item label="用户名" prop="username">
					<el-input v-model="temp.username" @blur="blurHandle('username')" />
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="temp.password" show-password @blur="blurHandle('password')" />
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPassword">
					<el-input v-model="temp.checkPassword" show-password @blur="blurHandle('checkPassword')" />
				</el-form-item>
				<el-form-item label="验证码" prop="checkCode">
					<el-input v-model="temp.checkCode" @blur="blurHandle('checkCode')" class="checkCodeInput" />
				</el-form-item>
				<div class="registerBtn">
					<button @click.prevent="register" :disabled="!verifyFlag">登录</button>
				</div>
				<div class="goLogin">
					已有账户？去<router-link to="/login">登录</router-link>
				</div>
			</el-form>
		</div>
		<div class="background"></div>
	</div>
</template>

<script>
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
			//表单数据
			formData: {
				email: '',
				username: '',
				password: '',
				checkPassword: '',
				checkCode: ''
			},

			//临时变量，由于el-input不支持v-model.lazy。所以利用临时变量来实现延时收集数据
			temp: {
				email: '',
				username: '',
				password: '',
				checkPassword: '',
				checkCode: ''
			},

			//校验标志
			flag: {
				email: '',
				username: '',
				password: '',
				checkPassword: '',
				checkCode: ''
			},

			//校验规则
			rules: {
				email: [
					{required: true, type: 'email', message:'请输入正确的邮箱格式', trigger: 'manual'}
				],
				username: [
					{required: true, min: 3, max: 10, message: '用户名3-10位', trigger: 'manual'}
				],
				password: [
					{required: true, message: '密码不能为空', trigger: 'manual'},
					{pattern: /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,15}$/, message: '密码由字母、数字、特殊字符，任意2种组成，6-15位', trigger: 'manual'}
				],
				checkPassword: [
					{validator: validateCheckPassword, trigger: 'manual'}
				],
				checkCode: [
					{required: true, message:'验证码不能为空', trigger: 'manual'}
				]
			},
		}
	},
	methods: {
		//注册按钮回调
		register() {
			console.log(this.formData);
		},

		//输入框失去焦点回调
		blurHandle(type) {
			this.formData[type] = this.temp[type];

			//校验对应字段
			this.$refs.registerForm.validateField(type, errorMessage => {
				this.flag[type] = (errorMessage === '' || errorMessage == null);
			});
		}
	},
	computed: {
		//表单校验成功标志
		verifyFlag() {
			return this.flag.email && this.flag.password && this.flag.checkPassword && this.flag.checkCode;
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

.box .registerForm {
	margin-top: 1rem;
}

.registerBtn {
	margin-top: 2rem;
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
	margin-top: 1rem;
}

.goLogin a {
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
}

/*PC端*/
@media screen and (min-width: 770px) {
	.box {
		padding: 3rem 5rem;
	}
}
</style>

<!-- region 修改element-ui默认样式 -->
<style>
.registerForm .el-form-item {
	margin-bottom: 1rem;
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