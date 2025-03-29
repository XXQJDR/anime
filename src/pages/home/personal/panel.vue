<template>
	<div class="personal-panel">
		<div class="box">
			<div class="item">
				<div class="title">作品</div>
				<div class="count">11</div>
			</div>
			<div class="item">
				<div class="title">评论</div>
				<div class="count">8</div>
			</div>
			<div class="item">
				<div class="title">点赞</div>
				<div class="count">20</div>
			</div>
			<div class="item">
				<div class="title">关注</div>
				<div class="count">5</div>
			</div>
			<div class="item">
				<div class="title">收藏</div>
				<div class="count">110</div>
			</div>
			<div class="item">
				<div class="title">粉丝</div>
				<div class="count">24</div>
			</div>
			<div class="item">
				<div class="title">动漫总数</div>
				<div class="count">21</div>
			</div>
			<div class="item">
				<div class="title">已观看</div>
				<div class="count">22</div>
			</div>
			<div class="item">
				<div class="title">未观看</div>
				<div class="count">23</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PersonalPanel'
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