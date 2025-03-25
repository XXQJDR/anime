<template>
	<div class="content-type">
		<!-- 模块分类名称 -->
		<div class="type-title" v-show="homeContentType === 'animeList'">
			<SvgIcon icon="list" size="22" :stroke="true"/>
			<div>动漫列表</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'viewingHistory'">
			<SvgIcon icon="history" size="22" :stroke="true"/>
			<div>观看历程</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'animeRandom'">
			<SvgIcon icon="random" size="22" :stroke="true"/>
			<div class="title">随机动漫</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'addAnime'">
			<SvgIcon icon="add" size="22" :stroke="true"/>
			<div>添加动漫</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'dustbin'">
			<SvgIcon icon="dustbin" size="22" :stroke="true"/>
			<div class="title">垃圾箱</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'panel'">
			<SvgIcon icon="panel" size="22" :stroke="true"/>
			<div class="title">仪表盘</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'info'">
			<SvgIcon icon="info" size="22" :stroke="true"/>
			<div class="title">个人信息</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'post'">
			<SvgIcon icon="file" size="22" :stroke="true"/>
			<div class="title">帖子</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'notice'">
			<SvgIcon icon="notice" size="22" :stroke="true"/>
			<div class="title">通知</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'security'">
			<SvgIcon icon="security" size="22" :stroke="true"/>
			<div class="title">安全</div>
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

		div {
			min-width: 76px;
			margin-left: 15px;
			font-weight: bold;
		}
	}
}
</style>