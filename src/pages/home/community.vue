<template>
	<div class="community">
		<!-- 搜索框 -->
		<div class="search">
			<SvgIcon icon="search" size="20" color="#cac5c4"/>
			<input
					type="text"
					placeholder="请输入关键词(搜索请按回车键)"
			/>
		</div>
		<div class="post-list">
			<div class="post" v-for="i in 3">
				<!-- 封面 -->
				<div class="cover">
					<img src="https://cdn.aqdstatic.com:966/age/20180017.jpg" alt="">
				</div>

				<!-- 信息 -->
				<div class="info">
					<div class="title">每个人心中都有一个太太</div>
					<div class="desc">每个人心中都有一个太太，而我已经找到！</div>
					<div class="data">
						<div class="like">
							<SvgIcon icon="like" size="0.9rem"/>
							<div class="count">100</div>
						</div>
						<div class="comment">
							<SvgIcon icon="comment" size="0.9rem"/>
							<div class="count">100</div>
						</div>
						<div class="star">
							<SvgIcon icon="star" size="0.9rem"/>
							<div class="count">100</div>
						</div>
					</div>
					<div class="user">
						<div class="avatar">
							<img src="https://q.qlogo.cn/headimg_dl?dst_uin=3124140355&spec=640&img_type=jpg" alt="">
						</div>
						<div class="username">ensolitude</div>
						<div class="time">
							<SvgIcon icon="time" size="0.9rem"/>
							<div>3天前</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CommunityPage'
}
</script>

<style scoped lang="scss">
@import "@/style/common";
.community {
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	@include content-min-height;

	/* 搜索框 */
	.search {
		position: relative;
		@include box-style;

		.svg-icon {
			position: absolute;
			top: 50%;
			left: 25px;
			transform: translateY(-50%);
		}

		@include input-style;
		input {
			/* 使输入文字居中 */
			text-align: center;
		}
	}

	/* 帖子列表 */
	.post-list {
		flex: 1;
		margin-top: .6rem;
		border-radius: 10px;
		@include box-style;
		display: grid;
		grid-gap: 15px;
		grid-template-columns: repeat(2, 1fr);

		@media screen and (max-width: 768px) {
			grid-template-columns: repeat(1, 1fr);
			grid-gap: 10px;
		}

		.post {
			display: flex;
			align-items: center;
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
			background-color: #FFFFFF;
			border-radius: 10px;
			transition: box-shadow .3s ease;
			cursor: pointer;

			&:hover {
				box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

				.cover img {
					transform: scale(1.05);
				}
			}

			/* 左侧封面 */
			.cover {
				height: 180px;
				border-radius: 10px;
				overflow: hidden;

				/* 防止图片被压缩 */
				flex-shrink: 0;

				@media screen and (max-width: 768px) {
					height: 150px;
				}

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: transform .3s ease;
				}
			}

			/*右侧信息*/
			.info {
				height: 100%;
				padding: 10px;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;

				@media screen and (max-width: 768px) {
					padding: 5px;
				}

				/* 标题 */
				.title {
					font-size: 1.2rem;
					font-weight: 700;
				}

				/* 简要内容 */
				.desc {
					flex: 1;
					margin-top: 10px;

					@media screen and (max-width: 768px) {
						margin-top: 5px;
					}
				}

				/* 数据 */
				.data {
					display: flex;
					margin-top: 20px;

					@media screen and (max-width: 768px) {
						margin-top: 10px;
					}

					.like,
					.comment,
					.star {
						display: flex;
						align-items: center;
						color: #8A919F;
						margin-right: 10px;

						.svg-icon {
							color: #8A919F !important;
						}

						.count {
							margin-left: 3px;
						}
					}
				}

				.user {
					display: flex;
					align-items: center;
					margin-top: 3px;

					.avatar {
						width: 35px;
						height: 35px;
						border-radius: 50%;
						overflow: hidden;

						@media screen and (max-width: 768px) {
							width: 30px;
							height: 30px;
						}

						img {
							width: 100%;
							height: 100%;
							object-fit: cover;
						}
					}

					.username {
						margin-left: 5px;
					}

					.time {
						display: flex;
						align-items: center;
						color: #8A919F;
						margin-left: 10px;
						font-size: .9rem;

						.svg-icon {
							color: #8A919F !important;
						}
					}
				}
			}
		}
	}
}
</style>