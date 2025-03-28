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
	/* 搜索框 */
	.search {
		position: relative;
		margin-top: 1rem;
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
		height: 500px;
		margin-top: .6rem;
		@include box-style;
	}
}
</style>