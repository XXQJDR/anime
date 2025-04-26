<template>
	<div class="ai-chat">
		<!-- 对话内容区域 -->
		<div class="chat-messages" ref="messagesContainer">
			<div
					v-for="(message, index) in messages"
					:key="index"
					:class="['message', message.role]"
			>
				<div class="avatar">
					<img
							v-if="message.role === 'user'"
							:src="userInfo.avatar"
							alt="用户"
					>
					<img
							v-else
							:src="aiAvatar"
							alt="AI助手"
					>
				</div>
				<div class="content">
					<div class="text" v-html="formatMessage(message.content)"></div>
					<div class="ai-model">{{ message.name }}</div>
				</div>
			</div>

			<!-- 加载状态 -->
			<div v-if="isLoading" class="message ai">
				<div class="avatar">
					<img src="http://192.168.52.130:9000/anime/avatar/defaultAvatar.svg" alt="AI助手">
				</div>
				<div class="content">
					<div class="loading-dots">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
		</div>

		<!-- 输入区域 -->
		<div class="chat-input">
			<el-select v-model="model" placeholder="请选择">
				<el-option value="DeepSeek-R1"></el-option>
				<el-option value="Doubao-lite-32k"></el-option>
			</el-select>
			<textarea
					v-model="userInput"
					placeholder="输入您的问题..."
					ref="textarea"
					@keydown.enter.exact.prevent="sendMessage"
					@keydown.shift.enter.exact="handleShiftEnter"
					@input="adjustTextareaHeight"
			></textarea>
			<button
					class="send-btn"
					:disabled="!userInput.trim() || isLoading"
					@click="sendMessage"
			>
				<SvgIcon icon="send" color="#fff"/>
			</button>
		</div>
	</div>
</template>

<script>
import {fetchEventSource} from '@microsoft/fetch-event-source';

export default {
	name: 'AIChat',
	data() {
		return {
			userInput: '',
			isLoading: false,
			msg: '',
			model: 'DeepSeek-R1',
			eventSource: null,
			aiAvatar: process.env.VUE_APP_AI_AVATAR_URL,
			messages: JSON.parse(localStorage.getItem('messages')) ||
					[{role: 'ai', content: '您好！我是AI助手，有什么可以帮您的吗？', name: 'DeepSeek-R1'}]
		}
	},
	computed: {
		userInfo() {
			return this.$store.state.userInfo
		},

		token() {
			return this.$store.state.token
		}
	},
	methods: {
		//发送信息
		sendMessage() {
			if (!this.userInput.trim() || this.isLoading) return;

			//添加到消息列表
			this.messages.push({
				role: 'user',
				content: this.userInput,
				name: this.userInfo.username
			});

			//保存消息列表到localStorage
			this.saveMessages();

			//重置输入框
			this.msg = this.userInput;
			this.userInput = '';

			//调整textarea高度
			this.resetTextareaHeight();

			// 滚动到底部
			this.$nextTick(() => {
				this.scrollToBottom()
			});

			// 模拟AI回复
			this.getAIResponse()
		},

		async getAIResponse() {
			//开启加载动画
			this.isLoading = true;

			//标记是否已收到第一条有效消息
			let hasReceivedFirstMessage = false;

			await fetchEventSource(`/api/user/ai/chat`, {
				method: 'POST',
				openWhenHidden: true, //防止ai输出时切换页面重复请求接口
				headers: {
					"Accept": 'text/event-stream',
					"content-type": 'application/json',
					"Authorization": 'Bearer ' + this.token
				},
				body: JSON.stringify({
					model: this.model,
					msg: this.msg,
				}),
				onopen: (response) => {
					//清空输入框
					this.userInput = '';

					//连接失败
					if (!response.ok) {
						this.isLoading = false;
						this.messages.push({
							role: 'ai',
							content: '抱歉，处理您的请求时出错了。请稍后再试。',
							name: this.model
						});
					}
				},
				onmessage: event => {
					if (event.data !== '[DONE]') {
						let result = JSON.parse(event.data);
						let content = result.choices[0].delta.content;
						if (content.length > 0 && content !== '\n\n') {
							//如果是第一条有效消息
							if (!hasReceivedFirstMessage) {
								this.isLoading = false;
								hasReceivedFirstMessage = true;
								this.messages.push({
									role: 'ai',
									content: '',
									name: this.model
								});
							}

							this.messages[this.messages.length - 1].content += content;
						}
					}

					// 滚动到底部
					this.$nextTick(() => {
						this.scrollToBottom()
					});
				},
				onclose: () => {
					//保存消息列表到localStorage
					this.saveMessages();
				},
				onerror: err => {
					this.isLoading = false;
					this.messages.push({
						role: 'ai',
						content: '抱歉，处理您的请求时出错了。请稍后再试。',
						name: this.model
					});

					//保存消息列表到localStorage
					this.saveMessages();
					throw err;
				}
			});
		},

		//滚动到底部
		scrollToBottom() {
			let container = this.$refs.messagesContainer;
			if (container) {
				container.scrollTop = container.scrollHeight;
			}
		},

		//简单的Markdown转HTML（简化版）
		formatMessage(text) {
			return text
					.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
					.replace(/\*(.*?)\*/g, '<em>$1</em>')
					.replace(/\n/g, '<br>')
		},

		//Shift+Enter换行
		handleShiftEnter(e) {
			const cursorPos = e.target.selectionStart
			this.userInput = this.userInput.substring(0, cursorPos) + this.userInput.substring(cursorPos)

			// 保持光标位置
			this.$nextTick(() => {
				e.target.selectionStart = cursorPos + 1
				e.target.selectionEnd = cursorPos + 1
			})
		},

		//设置textarea高度
		adjustTextareaHeight() {
			let textarea = this.$refs.textarea;
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
		},

		//重置textarea高度
		resetTextareaHeight() {
			this.$refs.textarea.style.height = 'auto';
		},

		//将信息列表保存至localStorage
		saveMessages() {
			if (this.messages.length >= 31) {
				//删除两条消息
				this.messages.splice(0, 2);

				if (this.messages.length % 2 === 1) {
					this.messages.shift();
				}
			}

			localStorage.setItem('messages', JSON.stringify(this.messages));
		},
	},
	mounted() {
		this.adjustTextareaHeight();
		this.scrollToBottom();
	}
}
</script>

<style lang="scss" scoped>
$background-color: #f5f7fa;
$border-color: #e1e4e8;
$header-bg-color: #ffffff;
$text-primary: #1a1a1a;
$text-secondary: #666666;
$icon-color: #666666;
$hover-bg-color: #f0f2f5;
$messages-bg-color: #ffffff;
$user-message-bg: #eae7ff;
$user-message-text: #1a1a1a;
$ai-message-bg: #f0f2f5;
$ai-message-text: #1a1a1a;
$loading-dots-color: #999999;
$input-bg-color: #ffffff;
$primary-color: #5e44ed;
$disabled-color: #cccccc;
@import '@/style/common';

.ai-chat {
	display: flex;
	flex-direction: column;
	height: calc(100vh - 2rem - 50px - 1rem);
	margin-top: 1rem;
	@include box-style;
	padding-bottom: 0;

	@media screen and (max-width: 768px) {
		margin-top: 0;
		height: calc(100vh - 6px - 50px - 10px - 30px);
	}

	.chat-messages {
		flex: 1;
		overflow-y: auto;
		padding: 1rem 0;
		background-color: $messages-bg-color;

		.message {
			display: flex;
			margin-bottom: 20px;
			animation: fadeIn 0.3s ease-out;

			&.user {
				flex-direction: row-reverse;

				.content {
					align-items: flex-end;

					.text {
						background-color: $user-message-bg;
						color: $user-message-text;
						border-radius: 18px 18px 0 18px;
					}
				}
			}

			&.ai {
				.content {
					align-items: flex-start;

					.text {
						background-color: $ai-message-bg;
						color: $ai-message-text;
						border-radius: 18px 18px 18px 0;
					}
				}
			}

			.avatar {
				width: 40px;
				height: 40px;
				margin: 0 10px;
				flex-shrink: 0;

				@media screen and (max-width: 768px) {
					margin: 0 5px;
				}

				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
					object-fit: cover;
				}
			}

			.content {
				max-width: 70%;
				display: flex;
				flex-direction: column;
				gap: 4px;

				.text {
					padding: 12px 16px;
					line-height: 1.5;
					word-break: break-word;
					box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
				}

				.ai-model {
					font-size: 12px;
					color: $text-secondary;
				}
			}
		}

		.loading-dots {
			display: flex;
			padding: 12px 16px;
			gap: 8px;

			span {
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background-color: $loading-dots-color;
				display: inline-block;
				animation: bounce 1.4s infinite ease-in-out;

				&:nth-child(1) {
					animation-delay: -0.32s;
				}

				&:nth-child(2) {
					animation-delay: -0.16s;
				}
			}
		}
	}

	.chat-input {
		padding: 10px;
		border-top: 1px solid $border-color;
		background-color: $input-bg-color;
		display: flex;
		align-items: center;
		gap: 12px;

		textarea {
			flex: 1;
			border: 1px solid $border-color;
			border-radius: 20px;
			resize: none;
			outline: none;
			transition: all .3s ease;
			white-space: pre-wrap;
			padding: 12px 16px;
			box-sizing: border-box;
			overflow-y: hidden;

			&:focus {
				border-color: #2b0aff;
				box-shadow: #2b0aff 0 0 0 1px;
			}

			&:hover {
				border-color: #C0C4CC;
			}
		}

		.send-btn {
			width: 44px;
			height: 44px;
			border-radius: 50%;
			border: none;
			background-color: $primary-color;
			color: white;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: background-color 0.2s;

			&:disabled {
				background-color: $disabled-color;
				cursor: not-allowed;
			}

			&:not(:disabled):hover {
				background-color: darken($primary-color, 10%);
			}
		}
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes bounce {
	0%, 80%, 100% {
		transform: translateY(0);
	}
	40% {
		transform: translateY(-6px);
	}
}
</style>

<style lang="scss">
.ai-chat {
	.el-select {
		width: 150px;

		@media screen and (max-width: 768px) {
			min-width: 60px;
			max-width: 60px;
		}

		.el-input__inner {
			box-sizing: border-box;
		}
	}
}
</style>