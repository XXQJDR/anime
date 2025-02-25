<template>
	<div class="bigBox">
		<div class="items">
			<template v-for="(item, index) in animeList">
				<div :key="index" class="itembox">
					<div class="item">
						<div class="line">
							<div class="gardenbox">
								<div class="garden">
									<div class="garden2"></div>
								</div>
							</div>
						</div>
						<div class="value-box" @click="goAnimeDetail(item.animeUserId)">
							<h4>{{ item.finishedDate }}</h4>
							<div class="img">
								<img v-lazy="item.cover" alt="">
							</div>
							<h3>{{item.name}}</h3>
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TimeLine',
	props: ['animeList'],
	methods: {
		goAnimeDetail(animeUserId) {
			this.$router.push(`/animeDetail?animeUserId=${animeUserId}`);
		}
	}
}
</script>

<style scoped>
h3 {
	margin-top: 8px;
}

div {
	box-sizing: border-box;
}

.bigBox {
	width: 100%;
	margin-top: 1rem;
	overflow: hidden;
}

.itembox {
	/* 连接线长度 */
	--lineWidth: 50px;

	/* 垂直线颜色 */
	border-right: 4px solid #6a59d7;
	position: relative;
	padding-right: var(--lineWidth);
}

.line {
	position: absolute;
	top: 20%;
	width: var(--lineWidth);

	/* 相当于--lineWidth取反 */
	right: calc(0% - var(--lineWidth));
	z-index: 1;
	border-bottom: 4px solid rgba(0, 107, 165, 0.22);
}

.line .gardenbox {
	height: 100%;
	position: relative;
}

.line .garden {
	position: absolute;
	bottom: 0;
	right: 0;
	width: 30px;
	height: 30px;
	background: rgba(0, 61, 165, 0.22);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: translate(55%, 55%);
}

/* 垂直线上的原点 */
.line .garden2 {
	width: 16px;
	height: 16px;
	background: #2b0aff;
	border-radius: 50%;
}

.item {
	position: relative;
}

.item .value-box {
	text-align: center;
	padding: 15px;
	background: #ffffff;
	box-shadow: 8px 7px 20px 0 #dae5f6;
	border-radius: 4px;
	border-top: 3px solid #2b0aff;
	transition: transform .3s;
}

.item .value-box:hover {
	cursor: pointer;
	transform: translateY(-10px);
}

.value-box h4 {
	font-size: 24px;
	color: #2b0aff;
	margin-bottom: 8px;
}

.value-box .img {
	width: 170px;
	height: 236px;
	border-radius: 5px;
	overflow: hidden;
	margin: 0 auto;
}

.value-box img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.items .itembox:last-child {
	padding-bottom: 10px;
}

@media screen and (max-width: 1000px) {
	.itembox {
		--lineWidth: 30px;
		padding-bottom: 50px;
	}

	.value-box .img {
		width: 122px;
		height: 170px;
	}
}

@media screen and (min-width: 1000px) {
	.items {
		display: flex;
		flex-wrap: wrap;
	}

	.itembox {
		width: 50%;
	}

	.items .itembox:nth-child(even) {
		border-right: none;
		padding-right: 0;
		padding-left: 50px;
		margin-top: 340px;
		padding-bottom: 0;
	}

	.items .itembox:nth-child(even) .line {
		right: inherit;
		left: -50px;
		text-align: left;
	}

	.items .itembox:nth-child(even) .line .garden {
		right: inherit;
		left: 0;
		transform: translate(-55%, 55%);
	}
}
</style>