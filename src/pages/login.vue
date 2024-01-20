<template>
	<div class="container" ref="container">
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
									src="/api/user/getImageCode"
									alt="code"
									@click="changeImageCode"
									ref="imageCode">
						</div>
					</el-form-item>
					<div class="forget">
						<a href="javascript:void(0);">忘记密码？</a>
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
import _ from "lodash";
import {reqLogin} from "@/api";
import {jwtDecode} from "jwt-decode";
import {mapState} from "vuex";

export default {
	name: 'LoginPage',
	data() {
		return {
			//登录中加载动画开启标志
			loading: false,

			//表单数据
			formData: {
				email: '',
				password: '',
				checkCode: ''
			},

			//校验规则
			rules: {
				email: [
					{required: true, type: 'email', message:'请输入正确的邮箱格式', trigger: 'blur'}
				],
				password: [
					{required: true, message: '密码不能为空', trigger: 'blur'},
					{pattern: /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,15}$/, message: '密码由字母、数字、特殊字符，任意2种组成，6-15位', trigger: 'manual'}
				],
				checkCode: [
					{required: true, message: '验证码不能为空', trigger: 'blur'},
					{pattern: /^[0-9A-Za-z]+$/, message: '验证码格式有误', trigger: 'blur'}
				]
			},
		}
	},
	computed: {
		...mapState(['browserIdentity']),
	},
	methods: {
		//提交表单回调
		async login() {
			this.$refs['loginForm'].validate(async (valid) => {
				if (valid) {
					//开启加载动画
					this.loading = true;

					let result = await reqLogin(this.formData.email, this.formData.password, this.formData.checkCode);
					if (result.code !== 200) {
						this.$message.error(result.msg);

						//关闭加载动画
						this.loading = false;
					} else {
						//解析token获取用户信息
						let token = result.data;
						let userInfo = jwtDecode(token);

						//将token存入vuex和localStorage
						this.$store.commit('TOKEN', token);
						localStorage.setItem('token', token);

						//将userInfo存入vuex和localStorage
						this.$store.commit('USER_INFO', userInfo);
						localStorage.setItem('userInfo', JSON.stringify(userInfo));

						//关闭加载动画
						this.loading = false;

						//跳转到首页
						await this.$router.push('/home');
					}
				}
			});
		},

		//更换图片验证码回调
		changeImageCode: _.throttle(function () {
			let baseSrc = this.$refs['imageCode'].src.split('?')[0];
			this.$refs['imageCode'].src = baseSrc+ '?' + Date.now();
		}, 1000),
	},
	mounted() {
		//防止移动端软键盘引起页面高度变下
		if (this.browserIdentity === 2) {
			this.$refs['container'].style.height = window.innerHeight  + 'px';
		}
	}
}
</script>

<style scoped lang="scss">
@font-face {
	font-family: 'logofont';
	font-display: swap;
	src: url("@/font/logo/Vampire Wars.ttf");
}

.container {
	display: flex;
	height: 100vh;

	.background {
		flex: 64% 1 1;
		background-image: url("@/assets/login/background.jpg");
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
				background-image: url("@/assets/logo.svg");
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

		* {
			font-size: 1rem;
		}

		.el-form-item__content {
			margin-top: -0.5rem;
		}

		.el-form-item__error {
			font-size: 0.8rem;
			white-space: nowrap;
		}
	}

	.el-input .el-input__inner {
		height: 38px;
		&:focus {
			border: 2px solid rgb(49, 130, 206);
		}
	}
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