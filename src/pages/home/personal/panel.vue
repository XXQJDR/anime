<template>
	<div class="personal-panel">
		<div class="box">
			<div class="item">
				<div class="title">动漫总数</div>
				<div class="count">{{ panelData.animeCount }}</div>
			</div>
			<div class="item">
				<div class="title">已观看</div>
				<div class="count">{{ panelData.watchedCount }}</div>
			</div>
			<div class="item">
				<div class="title">未观看</div>
				<div class="count">{{ panelData.noWatchCount }}</div>
			</div>
			<div class="item">
				<div class="title">帖子</div>
				<div class="count">{{ panelData.postCount }}</div>
			</div>
			<div class="item">
				<div class="title">关注</div>
				<div class="count">{{ panelData.followCount }}</div>
			</div>
			<div class="item">
				<div class="title">粉丝</div>
				<div class="count">{{ panelData.fanCount }}</div>
			</div>
			<div class="item">
				<div class="title">评论</div>
				<div class="count">{{ panelData.commentCount }}</div>
			</div>
			<div class="item">
				<div class="title">点赞</div>
				<div class="count">{{ panelData.likeCount }}</div>
			</div>
			<div class="item">
				<div class="title">收藏</div>
				<div class="count">{{ panelData.favoriteCount }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import {reqGetUserPanelData} from "@/api";

export default {
	name: 'PersonalPanel',
	data() {
		return {
			panelData: {}
		}
	},
	methods: {
		async getUserPanelData() {
			let result = await reqGetUserPanelData();
			if (result.code !== 200) {
				this.$message.error('获取数据失败！');
				return;
			}

			this.panelData = result.data;
		}
	},
	created() {
		this.getUserPanelData();
	}
}
</script>

<style scoped lang="scss">
@import "@/style/common";

.personal-panel {
	margin-top: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	@include box-style;
	@include content-min-height;

	.box {
		width: 70%;
		display: grid;
		grid-gap: 20px;
		grid-template-columns: repeat(3, 1fr);

		@media screen and (max-width: 768px) {
			width: 100%;
		}

		.item {
			height: 120px;
			background-color: rgb(241, 245, 249);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius: 10px;

			.count {
				font-size: 1.5rem;
				font-weight: bold;
				margin-top: 5px;
			}
		}
	}
}
</style>