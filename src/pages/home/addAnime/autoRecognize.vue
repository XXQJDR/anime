<template>
	<div class="autoRecognize">
		<!-- region 输入框 -->
		<div class="form">
			<svg viewBox="0 0 24 24" focusable="false"><path fill="#cac5c4" d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"></path></svg>
			<input type="text" placeholder="请输入关键词" v-model="keyword">
			<div class="suggestion">
				<div class="item">
					<div class="img">
						<img src="@/assets/home/animeList/86.jpg" alt="">
						<div class="mask">
							<div class="box">
								<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M612.37248 411.62752V30.208h-200.74496v381.41952H30.208v200.74496h381.41952v381.41952h200.74496V612.37248h381.41952v-200.74496z"/></svg>
							</div>
						</div>
					</div>
					<div class="info">
						<h3 class="title">86-不存在的战区</h3>
						<div class="other">
							<div class="otherItem notNecessary">
								<span class="key">动画种类</span>
								<span>：</span>
								<span class="value">TV</span>
							</div>
							<div class="otherItem notNecessary">
								<span class="key">原版名称</span>
								<span>：</span>
								<span class="value">86―エイティシックス― 第2クール</span>
							</div>
							<div class="otherItem">
								<span class="key">首播时间</span>
								<span>：</span>
								<span class="value">2021-10-02</span>
							</div>
							<div class="otherItem">
								<span class="key">播放状态</span>
								<span>：</span>
								<span class="value">完结</span>
							</div>
							<div class="otherItem">
								<span class="key">原作</span>
								<span>：</span>
								<span class="value">安里アサト</span>
							</div>
							<div class="otherItem notNecessary">
								<span class="key">剧情类型</span>
								<span>：</span>
								<span class="value">科幻 战争</span>
							</div>
							<div class="otherItem">
								<span class="key">制作公司</span>
								<span>：</span>
								<span class="value">A-1 Pictures</span>
							</div>
						</div>
						<div class="intro">
							<span class="key">简介</span>
							<span>：</span>
							<span class="value">了应对吉亚迪所开发出的完全独立无人战斗兵器“军团”的入侵，其邻国圣格诺利亚共和国开发了无人战斗兵器毁灭之力。但是，无人战斗机只是空有名号，实际是没有被认可为”人“的人们——86——驾驶，被当作道具来使用。由”86“所组成的部队“先锋战队”的队长少年・辛艾，在只能等待着死亡的令人绝望的战场上为了某个目的而战斗着。在那里，共和国军队的精英・蕾娜就任了新任指挥管制官。她小时候有着被86所救助过的经历，因此想把被作为“人形猪”而遭到轻视的他们作为正常人类来对待。只不过是为了战斗而被作为道具使用的少年以及被寄予了未来期望的精英才女，本不应当有所交集的两人，在激烈的战斗中看到了未来——</span>
						</div>
					</div>
				</div>
				<div class="item">
					<div class="img">
						<img src="@/assets/home/animeList/钢之炼金术师.jpg" alt="">
						<div class="mask">
							<div class="box">
								<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M612.37248 411.62752V30.208h-200.74496v381.41952H30.208v200.74496h381.41952v381.41952h200.74496V612.37248h381.41952v-200.74496z"/></svg>
							</div>
						</div>
					</div>
					<div class="info">
						<h3 class="title">钢之炼金术师 FA</h3>
						<div class="other">
							<div class="otherItem notNecessary">
								<span class="key">动画种类</span>
								<span>：</span>
								<span class="value">TV</span>
							</div>
							<div class="otherItem notNecessary">
								<span class="key">原版名称</span>
								<span>：</span>
								<span class="value">鋼の錬金術師 FULLMETAL ALCHEMIST</span>
							</div>
							<div class="otherItem">
								<span class="key">首播时间</span>
								<span>：</span>
								<span class="value">2009-04-05</span>
							</div>
							<div class="otherItem">
								<span class="key">播放状态</span>
								<span>：</span>
								<span class="value">完结</span>
							</div>
							<div class="otherItem">
								<span class="key">原作</span>
								<span>：</span>
								<span class="value">荒川弘</span>
							</div>
							<div class="otherItem notNecessary">
								<span class="key">剧情类型</span>
								<span>：</span>
								<span class="value">热血 战斗 奇幻</span>
							</div>
							<div class="otherItem">
								<span class="key">制作公司</span>
								<span>：</span>
								<span class="value">BONES</span>
							</div>
						</div>
						<div class="intro">
							<span class="key">简介</span>
							<span>：</span>
							<span class="value">《钢之炼金术师 FULLMETAL ALCHEMIST》是根据日本漫画家荒川弘创作的漫画作品改编的二度动画化作品，采用原作漫画剧情，一般简称“钢之炼金术师FA”。电视动画由BONES负责动画制作，于2009年4月5日—2010年7月4日在日本每日放送/日本TBS电视台系电视台播放，全64话。在电视动画最终回结尾宣布制作剧场版的消息，相关剧场版《钢之炼金术师：叹息之丘的圣星》于2011年7月2日在日本上映。所谓的炼金术，就是以“等价交换”为原则，物质的理解、分解、然后再构筑的这个世界上最先端的科学学术。在炼金术的领域中，最大的“禁忌”就是“人体炼成”。因为思念已故的母亲，失去了一切的年幼的兄弟打破了禁忌。装着机械铠的，背负着“钢之炼金术士”之名的哥哥，爱德华·艾尔利克，灵魂附着在巨大的铠甲上的弟弟，阿尔方斯·艾尔利克。两人为了夺回失去的东西，开始了寻找“贤者之石”之旅。随着兄弟两人离“贤者之石”的真相越来越近，也不断地被卷入巨大的阴谋的漩涡之中。幕后操纵的强大阴谋者的存在。渐渐地露出本性的军事国家亚美斯多利斯受虐的民众的无止尽的憎恨和复仇的意念。炼金术招致的无数悲剧。散在的悲剧最终连成一条线，将人们，民众，甚至国家全部卷入其中。即使处于绝望和希望的狭缝之中，艾尔利克兄弟依然继续前进。</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- endregion -->
	</div>
</template>

<script>
export default {
	name: 'AutoRecognize',
	data() {
		return {
			keyword: ''
		}
	},
}
</script>

<style scoped>
/* region 输入框 */
.autoRecognize .form {
	width: 100%;
	position: relative;
}

.autoRecognize .form svg {
	width: 1.1rem;
	height: 1.1rem;
	position: absolute;
	top: 12px;
	left: 10px;
}

.autoRecognize .form input {
	width: 100%;
	height: 45px;
	outline: transparent solid 2px;
	outline-offset: 2px;
	border: 1px solid #DCDFE6;
	border-radius: 5px;
	transition: all 0.2s;

	/* 使输入文字居中 */
	text-align: center;
}

.autoRecognize .form input:hover {
	border-color: #C0C4CC;
}

.autoRecognize .form input:focus {
	border-color: rgb(49, 130, 206);
	box-shadow: rgb(49, 130, 206) 0 0 0 1px;
}

/* placeholder居中 */
.autoRecognize .form input::-ms-input-placeholder{
	text-align: center;
}
.autoRecognize .form input::-webkit-input-placeholder{
	text-align: center;
}

.autoRecognize .form .suggestion {
	width: 100%;
	min-width: 980px;
	background-color: #FFFFFF;
	margin-top: 1rem;
	border-radius: 10px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	font-size: 0.9rem;
}

.autoRecognize .form .suggestion .item {
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 10px 0;
	border-bottom: 1px solid rgba(0, 0, 0, .1);
	transition: background-color 0.2s;
}

.autoRecognize .form .suggestion .item:last-child {
	border-bottom: none;
}

.autoRecognize .form .suggestion .item .img {
	height: 240px;
	border-radius: 5px;
	overflow: hidden;
	position: relative;
	cursor: pointer;
}

.autoRecognize .form .suggestion .item .img .mask {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .4);
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
	transition: opacity 0.3s;
}

.autoRecognize .form .suggestion .item .img .mask .box {
	width: 50px;
	height: 50px;
	background-color: rgba(0, 0, 0, .5);
	border-radius: 50%;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	transition: all .5s;
}

.autoRecognize .form .suggestion .item .img .mask .box svg {
	width: 25px;
	height: 25px;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}

.autoRecognize .form .suggestion .item .img img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 0.3s;
}

.autoRecognize .form .suggestion .item .info {
	width: 780px;
	padding-left: 15px;
}

.autoRecognize .form .suggestion .item .info h3 {
	margin-bottom: 5px;
}

.autoRecognize .form .suggestion .item .info .other {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-auto-rows: 30px;
	line-height: 30px;
	margin-top: 15px;
}

.autoRecognize .form .suggestion .item .info .other .otherItem {
	justify-items: start;
}

.autoRecognize .form .suggestion .item .info .other .otherItem .key {
	display: inline-block;
	width: 69px;
	text-align: right;
}

.autoRecognize .form .suggestion .item .info .intro {
	margin-top: 5px;
	word-break: break-all;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}

.autoRecognize .form .suggestion .item .info .other .otherItem .value,
.autoRecognize .form .suggestion .item .info .intro .value {
	color: #726e6e;
}
/* endregion */

/* 手机端 */
@media screen and (max-width: 700px) {
	.autoRecognize .form svg {
		top: 16px;
	}

	.autoRecognize .form .suggestion {
		width: 100%;
		min-width: auto;
		font-size: 1rem;
	}

	.autoRecognize .form .suggestion .item {
		padding: 5px 0;
	}

	.autoRecognize .form .suggestion .item .img {
		height: 150px;
	}

	.autoRecognize .form .suggestion .item .info {
		width: 220px;
	}

	.autoRecognize .form .suggestion .item .info .other {
		display: block;
	}

	.autoRecognize .form .suggestion .item .info .other .notNecessary {
		display: none;
	}

	.autoRecognize .form .suggestion .item .info .other .otherItem .key {
		width: 56px;
	}

	.autoRecognize .form .suggestion .item .info .intro {
		display: none;
	}
}

/* pc端 */
@media screen and (min-width: 1000px) {
	/* 鼠标移入一行内背景颜色改变 */
	.autoRecognize .form .suggestion .item:hover {
		background-color: #F7F3F2;
	}

	/* 鼠标移入图片展示遮罩 */
	.autoRecognize .form .suggestion .item .img:hover .mask {
		opacity: 1;
	}

	/* 鼠标移入图片，图片放大 */
	.autoRecognize .form .suggestion .item .img:hover img {
		transform: scale(1.1);
	}

	/* 鼠标移入添加按钮，添加按钮旋转 */
	.autoRecognize .form .suggestion .item .img .mask .box:hover {
		transform: rotateZ(180deg);
	}
}
</style>