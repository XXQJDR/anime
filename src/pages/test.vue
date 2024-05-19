<template>
	<div class="test">
		<button @click="add">add</button>
		<button @click="del">del</button>
		<transition-group
				name="list"
				tag="ul"
		>
			<li v-for="item in items" :key="item" class="item">{{item}}</li>
		</transition-group>
	</div>
</template>

<script>
export default {
	name: 'TestPage',
	data() {
		return {
			items: [1,2,3,4,5,6,7,8,9],
			nextNum: 10
		}
	},
	methods:{
		randomIndex: function () {
			// 通过获取items列表中的随机下标
			return Math.floor(Math.random() * this.items.length)
		},
		add: function () {
			// 在列表items随机位置下标，设置0为不删除数据，添加this.nextNum++的数据
			this.items.splice(this.randomIndex(), 0, this.nextNum++)
		},
		del: function () {
			// 随机删除列表中的其中一个数据
			this.items.splice(1, 1)
		},
	}
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
	transition: all 1s;
}
.list-enter,
.list-leave-to {
	opacity: 0;
}
.list-move {
	transition: all 0.6s ease;
}
.list-leave-active{
	position: absolute;
}

button {
	border: 1px solid red;
	margin-top: 30px;
}

button:nth-child(2) {
	margin-left: 10px;
}

.item {
	width: 30px;
	height: 30px;
	border: 1px solid red;
}
</style>