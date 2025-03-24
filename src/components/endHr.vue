<template>
	<div class="end-hr">
		<hr class="hr-dashed-content" :data-content="content">
	</div>
</template>

<script>
export default {
	name: 'EndHr',
	props: ['content']
}
</script>

<style scoped>
.end-hr {
	.hr-dashed-content {
		color: #a2a9b6;
		border: 0;
		font-size: 16px;
		padding: 1em 0;
		position: relative;
		overflow: hidden;

		&::before {
			content: attr(data-content);
			position: absolute;
			padding: 0 1ch;
			line-height: 1px;
			border: solid #d0d0d5;
			border-width: 0 99vw;
			width: fit-content;
			/* for IE浏览器 */
			white-space: nowrap;
			left: 50%;
			transform: translateX(-50%);
			border-image: repeating-linear-gradient(90deg, #d0d0d5, #d0d0d5 1px, transparent 1px, transparent 2px) 0 15% 0 repeat;
		}
	}
}
</style>