<template>
	<div class="test">
<!--		<el-rate
				ref="rate"
				v-model="value"
				:icon-classes="iconClasses"
				void-icon-class="icon-rate-face-off"
				:colors="['#99A9BF', '#F7BA2A', '#FF9900']"
				show-text
				:texts="['不评价', '有点无聊', '一般', '满意', '神作']"
				@change="change"
		>
		</el-rate>-->
		<el-rate v-model="value" @change="change" ref="rate"></el-rate>
		<input type="text" ref="input">
	</div>
</template>

<script>
export default {
	name: 'TestPage',
	data() {
		return {
			value: 4,
			valueTemp: 4,
			iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']
		}
	},
	methods: {
		change(val) {
			this.$confirm('确认给出该评分？', '提示', {
				type: 'warning',
			}).then(() => { //确认评分
				this.valueTemp = val;
				console.log(val);
			}).catch(() => { //取消评分
				this.value = this.valueTemp;
			});
			this.$refs.input.focus();
		}
	}
}
</script>

<style scoped lang="scss">
@import '@/assets/fonts/rate/style.css';
</style>

<style lang="scss">
.test {
	.el-rate__icon,
	.el-rate__text {
		font-size: 20px;
	}
}
</style>