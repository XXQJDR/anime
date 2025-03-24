<template>
	<svg
			class="svg-icon"
			:style="{
      fontSize: size + 'px',
      width: width + 'px',
      height: height + 'px',
      color: color,
      stroke: stroke ? 'CurrentColor' : 'none',
      strokeWidth: strokeWidth + 'px'
    }"
	>
		<use :xlink:href="iconName"></use>
	</svg>
</template>

<script>
export default {
	name: 'SvgIcon',
	props: {
		//svg图标名称
		icon: {
			type: String,
			required: true
		},
		//svg图标颜色
		color: {
			type: String,
			default: '#000000'
		},
		//svg图标大小
		size: {
			type: [Number, String],
			default: 18
		},
		//svg图标宽度
		width: {
			type: [Number, String]
		},
		//svg图标高度
		height: {
			type: [Number, String]
		},
		//svg是否加粗
		stroke: {
			type: Boolean,
			default: false
		},
		//svg图标加粗宽度
		strokeWidth: {
			type: [Number, String],
			default: 20
		}
	},
	computed: {
		iconName() {
			return `#icon-${this.icon}`
		}
	}
}
</script>

<style scoped lang="scss">
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
	transition: all .3s ease;
}
</style>