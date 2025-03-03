<template>
	<div class="test">
		<div class="box">
		</div>
	</div>
</template>

<script>
export default {
	name: 'TestPage',
}
</script>

<style scoped lang="scss">
.test {
	width: 400px;
	min-height: 400px;
	background-color: pink;

	.box {
		width: 200px;
		height: 100%;
		background-color: red;
	}
}
</style>