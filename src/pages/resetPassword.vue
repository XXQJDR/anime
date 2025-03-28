<template>
	<div class="reset-password">
		<div class="box">
			<el-steps :space="200" :active="active" finish-status="success" align-center>
				<el-step title="身份验证"></el-step>
				<el-step title="密码重置"></el-step>
				<el-step title="重置完成"></el-step>
			</el-steps>
			<el-form :model="form1" class="form" ref="form1" :rules="rules" v-show="active === 0">
				<el-form-item prop="email">
					<el-input v-model="form1.email" placeholder="邮箱"></el-input>
				</el-form-item>
				<el-form-item prop="code">
					<div class="check-code">
						<el-input v-model="form1.code" placeholder="验证码"/>
						<el-button plain :disabled="btnDisabled" @click="getCode" ref="getCodeBtn">{{ btnMessage }}</el-button>
					</div>
				</el-form-item>
			</el-form>
			<el-form :model="form2" class="form" ref="form2" :rules="rules" v-show="active === 1">
				<el-form-item prop="password">
					<el-input v-model="form2.password" placeholder="密码" show-password></el-input>
				</el-form-item>
				<el-form-item prop="checkPassword">
					<el-input v-model="form2.checkPassword" placeholder="重置密码" show-password></el-input>
				</el-form-item>
			</el-form>
			<el-result icon="success" title="重置成功" subTitle="请返回登录页面重新登录" v-show="active === 2"></el-result>
			<el-button @click="next" type="primary" class="next" :loading="loading">{{ nextMessage }}</el-button>
		</div>
	</div>
</template>

<script>
import {reqGetResetPasswordEmailCode, reqResetPasswordVerify, reqResetPassword} from '@/api';

export default {
	name: "ResetPassword",
	data() {
		//自定义确认密码规则
		let validateCheckPassword = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.form2.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};

		return {
			//当前步骤
			active: 0,

			//数据
			form1: {
				email: '',
				code: ''
			},
			form2: {
				password: '',
				checkPassword: ''
			},

			//校验规则
			rules: {
				email: [
					{required: true, type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur'}
				],
				code: [
					{required: true, message: '验证码不能为空！', trigger: 'blur'}
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
				]
			},

			//倒计时
			time: 61,

			//加载标志
			loading: false,
		}
	},
	computed: {
		//按钮显示信息
		btnMessage() {
			return this.time === 61 ? '获取验证码' : `${this.time}秒后重新获取`;
		},

		//是否启用按钮
		btnDisabled() {
			return this.time !== 61;
		},

		//继续按钮显示信息
		nextMessage() {
			if (this.active === 0) {
				return '下一步';
			} else if (this.active === 1) {
				return '重置密码';
			} else {
				return '跳转';
			}
		},
	},
	methods: {
		getCode() {
			//校验邮箱
			this.$refs.form1.validateField('email', async (msg) => {
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

				let result = await reqGetResetPasswordEmailCode(this.form1.email);
				if (result.code !== 200) {
					this.$message.error(result.msg);
					this.time = 61;
					clearInterval(interval);
				}
			});
		},

		next() {
			//身份校验
			if (this.active === 0) {
				this.$refs.form1.validate(async (valid) => {
					if (!valid) {
						return;
					}

					//开启加载动画
					this.loading = true;

					//请求
					let result = await reqResetPasswordVerify(this.form1.email, this.form1.code);

					//关闭加载动画
					this.loading = false;

					if (result.code !== 200) {
						this.$message.error(result.msg);
						return;
					}

					this.active++;
				});
			} else if (this.active === 1) { //重置密码
				this.$refs.form2.validate(async (valid) => {
					if (!valid) {
						return;
					}

					//开启加载动画
					this.loading = true;

					//请求
					let result = await reqResetPassword(this.form1.email, this.form2.password);

					//关闭加载动画
					this.loading = false;

					if (result.code !== 200) {
						this.$message.error(result.msg);
						return;
					}

					this.active++;
				});
			} else { //跳转
				this.$router.push('/login');
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import "@/style/common";
.reset-password {
	width: 100vw;
	height: 100vh;
	background-color: #e8eaf2;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 1rem;
	box-sizing: border-box;
	overflow: hidden;

	.box {
		width: 450px;
		text-align: center;
		@include box-style;

		.form {
			margin-top: 3rem;

			.check-code {
				display: flex;

				.el-button {
					margin-left: 2px;
					width: 160px;

					/* 防止宽度被压缩 */
					flex: 0 0 auto;
				}
			}
		}

		.next {
			margin-top: 10px;
		}
	}
}
</style>

<style lang="scss">
.reset-password {
	.el-step__title {
		font-size: 1rem;
	}

	.el-form-item {
		margin-top: 30px;
	}

	.el-result {
		padding: 0;
		margin-top: 3rem;

		.el-result__title {
			margin-top: 10px;
		}
	}
}
</style>