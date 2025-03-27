<template>
	<div class="content-type">
		<!-- 模块分类名称 -->
		<div class="type-title" v-show="homeContentType === 'animeList'">
			<SvgIcon icon="list"/>
			<div class="title">动漫列表</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'viewingHistory'">
			<SvgIcon icon="history"/>
			<div class="title">观看历程</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'animeRandom'">
			<SvgIcon icon="random"/>
			<div class="title">随机动漫</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'addAnime'">
			<SvgIcon icon="add"/>
			<div class="title">添加动漫</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'community'">
			<SvgIcon icon="community"/>
			<div class="title">社区</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'dustbin'">
			<SvgIcon icon="dustbin"/>
			<div class="title">垃圾箱</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'panel'">
			<SvgIcon icon="panel"/>
			<div class="title">仪表盘</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'info'">
			<SvgIcon icon="info"/>
			<div class="title">个人信息</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'post'">
			<SvgIcon icon="file"/>
			<div class="title">帖子</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'notice'">
			<SvgIcon icon="notice"/>
			<div class="title">通知</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ContentType',
	computed: {
		homeContentType() {
			return this.$store.state.homeContentType;
		}
	}
}
</script>

<style scoped lang="scss">
.content-type {
	/* 模块分类名称 */
	.type-title {
		min-width: 110px;
		height: 50px;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		margin-left: 1rem;

		@media screen and (max-width: 768px) {
			height: auto;
			margin-left: 6px;
		}

		.svg-icon {
			width: 30px;
			height: 30px;
		}

		.title {
			min-width: 76px;
			margin-left: 15px;
			font-weight: bold;
		}
	}
}
</style>