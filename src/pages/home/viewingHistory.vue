<template>
	<div class="viewingHistory">
		<!--region 模块分类名称-->
		<div class="typeTitle">
			<svg viewBox="0 0 1053 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#3c3838" d="M526.628571 117.028571c216.502857 0 394.971429 178.468571 394.971429 394.971429S743.131429 906.971429 526.628571 906.971429s-394.971429-178.468571-394.971428-394.971429 178.468571-394.971429 394.971428-394.971429z m0-87.771428c-266.24 0-482.742857 213.577143-482.742857 482.742857 0 266.24 213.577143 482.742857 482.742857 482.742857 266.24 0 482.742857-213.577143 482.742858-482.742857S792.868571 29.257143 526.628571 29.257143z" /><path fill="#3c3838" d="M678.765714 760.685714c-11.702857 0-23.405714-2.925714-32.182857-14.628571l-152.137143-175.542857c-5.851429-5.851429-11.702857-17.554286-11.702857-29.257143V321.828571c0-23.405714 20.48-43.885714 43.885714-43.885714s43.885714 20.48 43.885715 43.885714v201.874286l143.36 160.914286c14.628571 17.554286 11.702857 46.811429-2.925715 61.44-11.702857 11.702857-20.48 14.628571-32.182857 14.628571z" /></svg>
			<div>观看历程</div>
		</div>
		<!--endregion-->

		<TimeLine v-show="!emptyFlag" :animeList="animeList" />
		<el-empty v-if="emptyFlag" :image-size="250" description="暂无历程，快去观看吧！" />
	</div>
</template>

<script>
import TimeLine from "@/components/timeLine.vue";
import {reqGetPageAnime} from '@/api';

export default {
	name: 'ViewingHistory',
	components: {TimeLine},
	data() {
		return {
			//动漫列表
			animeList: [],

			//当前页
			current: 1,

			//每页数量
			size: 10,

			//空状态标志
			emptyFlag: false,

			//是否还有下一页数据
			hasHext: true,
		}
	},
	methods: {
		async getPageAnime() {
			//获取数据
			let params = {
				current: this.current,
				size: this.size,
				status: 1
			}
			let result = await reqGetPageAnime(params);
			if (result.code !== 200) {
				this.$message.error('获取数据失败！');
				return ;
			}
			this.animeList = this.animeList.concat(result.data || []);

			//数据为空表示下一页无数据
			this.hasHext = (result.data || []).length !== 0;

			if (this.current===1) {
				this.emptyFlag = this.animeList.length===0;
			}
		},
		lazyLoading() {
			let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight;

			//当距离底部的距离小于300px时，请求服务器数据
			if (bottomOfWindow < 300 && this.hasHext) {
				this.hasHext = false;
				this.getPageAnime();
				this.current++;
			}
		}
	},
	created() {
		//获取第一页数据
		this.getPageAnime();
		this.current++;
	},
	mounted() {
		window.addEventListener('scroll', this.lazyLoading);
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.lazyLoading);
	}
}
</script>

<style scoped>
/* region 模块分类名称 */
.viewingHistory .typeTitle {
	min-width: 110px;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
}

.viewingHistory .typeTitle svg {
	width: 18px;
	height: 18px;
}

.viewingHistory .typeTitle div {
	min-width: 76px;
	margin-left: 15px;
	font-weight: bold;
}
/* endregion */
</style>