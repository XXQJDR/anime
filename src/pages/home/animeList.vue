<template>
	<div class="animeList">
		<!--region 模块分类名称-->
		<div class="typeTitle">
			<svg t="1741331905462" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7742">
				<path d="M955.904 858.112z" p-id="7743"></path>
				<path d="M312.832 63.488H75.264C33.792 63.488 0 97.28 0 138.752v237.568c0 41.472 33.792 75.264 75.264 75.264h237.568c41.472 0 75.264-33.792 75.264-75.264V138.752c0-41.472-33.792-75.264-75.264-75.264zM305.152 368.64H82.944V146.432h222.72V368.64zM312.832 572.416H75.264c-41.472 0-75.264 33.792-75.264 75.264v237.568c0 41.472 33.792 75.264 75.264 75.264h237.568c41.472 0 75.264-33.792 75.264-75.264v-237.568c0-41.472-33.792-75.264-75.264-75.264z m-7.68 305.152H82.944v-222.72h222.72v222.72zM518.144 169.984c2.048 1.024 4.608 1.536 6.656 1.536H982.528c2.048 0 4.096-0.512 6.144-1.024 18.944-4.096 32.768-20.48 32.768-39.936 0-18.944-13.312-35.328-31.744-39.936-2.048-1.024-4.608-1.536-7.168-1.536h-457.728c-2.56 0-5.12 0.512-7.168 2.048-17.92 4.608-31.232 20.992-31.232 39.424 0 18.432 13.312 35.328 31.744 39.424zM516.608 398.336c2.56 1.536 5.12 2.048 7.68 2.048h457.728c2.56 0 4.608-0.512 7.168-1.536 18.432-4.608 31.744-20.992 31.744-39.936 0-19.456-13.824-35.84-32.768-39.936-2.048-0.512-4.096-1.024-6.144-1.024H524.288c-2.048 0-4.608 0.512-6.656 1.536-18.432 4.608-31.744 20.992-31.744 39.936 0.512 17.92 13.312 34.304 30.72 38.912zM517.12 704c2.56 1.536 5.12 2.048 7.68 2.048h457.728c1.024 0 2.048 0 3.072-0.512 21.504-1.536 38.4-19.456 38.4-40.96 0-22.528-18.432-41.472-41.472-41.472H524.8c-2.048 0-4.608 0.512-6.656 1.536-18.432 4.608-31.744 20.992-31.744 39.936 0 18.432 12.8 34.304 30.72 39.424zM986.624 827.392c-1.536-0.512-2.56-0.512-4.096-0.512h-457.728c-2.56 0-5.12 0.512-7.68 2.048-17.92 4.608-30.72 20.992-30.72 39.424 0 18.944 13.312 35.328 32.256 39.936 2.048 1.024 4.096 1.024 6.144 1.024h454.656c1.024 0 2.048 0.512 3.072 0.512 22.528 0 41.472-18.432 41.472-41.472 0-20.992-16.384-38.912-37.376-40.96z" p-id="7744"></path>
			</svg>
			<div>动漫列表</div>
		</div>
		<!--endregion-->

		<!-- region 添加按钮与搜索框 -->
		<div class="control">
			<div class="addBtn" @click="goAddAnime">
				<svg t="1741333190936" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15383">
					<path d="M543.978319 543.978319l352.427678 0c17.665335 0 31.975249-14.312984 31.975249-31.978319 0-17.665335-14.308891-31.978319-31.975249-31.978319L543.978319 480.021681l0-352.426655c0-17.665335-14.312984-31.975249-31.978319-31.975249-17.665335 0-31.978319 14.308891-31.978319 31.975249l0 352.426655-352.426655 0c-17.665335 0-31.975249 14.310937-31.975249 31.976272 0 8.833179 3.577478 16.829294 9.363252 22.615067 5.785773 5.785773 13.778818 9.365298 22.611997 9.365298l352.426655 0 0 352.426655c0 8.833179 3.578502 16.826224 9.364275 22.611997s13.781888 9.363252 22.615067 9.363252c17.665335 0 31.977295-14.308891 31.977295-31.975249L543.978319 543.978319z" p-id="15384"></path>
				</svg>
				<div>添加</div>
			</div>
			<div class="search">
				<form @submit.prevent="searchAnime">
					<svg width="18px" height="18px" viewBox="0 0 24 24" focusable="false">
						<path d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"></path>
					</svg>
					<input type="text" placeholder="请输入动漫关键词" v-model="keyword" @focus="handleFocus">
				</form>
			</div>
		</div>
		<!-- endregion -->

		<!-- region 筛选 -->
		<div class="filter">
			<!-- 分类 -->
			<div class="type">
				<el-popover
						:visible-arrow="false"
						placement="bottom"
						trigger="click"
						@show="openTypePopover"
						@hide="closeTypePopover"
						popper-class="typePopover"
						v-model="typePopoverFlag"
				>
					<ul>
						<li @click="changeAnimeType('全部')" :class="{typeBtnLiActive:selectedTypeName==='全部'}">
							<svg t="1741331905462" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7742">
								<path d="M955.904 858.112z" p-id="7743"></path>
								<path d="M312.832 63.488H75.264C33.792 63.488 0 97.28 0 138.752v237.568c0 41.472 33.792 75.264 75.264 75.264h237.568c41.472 0 75.264-33.792 75.264-75.264V138.752c0-41.472-33.792-75.264-75.264-75.264zM305.152 368.64H82.944V146.432h222.72V368.64zM312.832 572.416H75.264c-41.472 0-75.264 33.792-75.264 75.264v237.568c0 41.472 33.792 75.264 75.264 75.264h237.568c41.472 0 75.264-33.792 75.264-75.264v-237.568c0-41.472-33.792-75.264-75.264-75.264z m-7.68 305.152H82.944v-222.72h222.72v222.72zM518.144 169.984c2.048 1.024 4.608 1.536 6.656 1.536H982.528c2.048 0 4.096-0.512 6.144-1.024 18.944-4.096 32.768-20.48 32.768-39.936 0-18.944-13.312-35.328-31.744-39.936-2.048-1.024-4.608-1.536-7.168-1.536h-457.728c-2.56 0-5.12 0.512-7.168 2.048-17.92 4.608-31.232 20.992-31.232 39.424 0 18.432 13.312 35.328 31.744 39.424zM516.608 398.336c2.56 1.536 5.12 2.048 7.68 2.048h457.728c2.56 0 4.608-0.512 7.168-1.536 18.432-4.608 31.744-20.992 31.744-39.936 0-19.456-13.824-35.84-32.768-39.936-2.048-0.512-4.096-1.024-6.144-1.024H524.288c-2.048 0-4.608 0.512-6.656 1.536-18.432 4.608-31.744 20.992-31.744 39.936 0.512 17.92 13.312 34.304 30.72 38.912zM517.12 704c2.56 1.536 5.12 2.048 7.68 2.048h457.728c1.024 0 2.048 0 3.072-0.512 21.504-1.536 38.4-19.456 38.4-40.96 0-22.528-18.432-41.472-41.472-41.472H524.8c-2.048 0-4.608 0.512-6.656 1.536-18.432 4.608-31.744 20.992-31.744 39.936 0 18.432 12.8 34.304 30.72 39.424zM986.624 827.392c-1.536-0.512-2.56-0.512-4.096-0.512h-457.728c-2.56 0-5.12 0.512-7.68 2.048-17.92 4.608-30.72 20.992-30.72 39.424 0 18.944 13.312 35.328 32.256 39.936 2.048 1.024 4.096 1.024 6.144 1.024h454.656c1.024 0 2.048 0.512 3.072 0.512 22.528 0 41.472-18.432 41.472-41.472 0-20.992-16.384-38.912-37.376-40.96z" p-id="7744"></path>
							</svg>
							<div>全部</div>
						</li>
						<li @click="changeAnimeType('正在看')" :class="{typeBtnLiActive:selectedTypeName==='正在看'}">
							<svg t="1741348465773" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2587">
								<path d="M512 128C170.666667 128 0 513.770667 0 513.770667S170.666667 896 512 896s512-384 512-384-170.666667-384-512-384z m0 682.666667C286.442667 810.666667 144.032 598.592 96.032 513.578667 144 427.754667 286.442667 213.333333 512 213.333333c225.6 0 368.021333 213.312 415.978667 298.666667C879.936 597.504 737.546667 810.666667 512 810.666667z m0-469.333334c-94.250667 0-170.666667 76.416-170.666667 170.666667 0 94.261333 76.416 170.666667 170.666667 170.666667 94.261333 0 170.666667-76.405333 170.666667-170.666667 0-94.250667-76.405333-170.666667-170.666667-170.666667z m0 256c-47.050667 0-85.333333-38.282667-85.333333-85.333333s38.282667-85.333333 85.333333-85.333333 85.333333 38.282667 85.333333 85.333333-38.282667 85.333333-85.333333 85.333333z" p-id="2588"></path>
								<path d="M512 128C170.666667 128 0 513.770667 0 513.770667S170.666667 896 512 896s512-384 512-384-170.666667-384-512-384z m0 682.666667C286.442667 810.666667 144.032 598.592 96.032 513.578667 144 427.754667 286.442667 213.333333 512 213.333333c225.6 0 368.021333 213.312 415.978667 298.666667C879.936 597.504 737.546667 810.666667 512 810.666667z m0-469.333334c-94.250667 0-170.666667 76.416-170.666667 170.666667 0 94.261333 76.416 170.666667 170.666667 170.666667 94.261333 0 170.666667-76.405333 170.666667-170.666667 0-94.250667-76.405333-170.666667-170.666667-170.666667z m0 256c-47.050667 0-85.333333-38.282667-85.333333-85.333333s38.282667-85.333333 85.333333-85.333333 85.333333 38.282667 85.333333 85.333333-38.282667 85.333333-85.333333 85.333333z" p-id="2589"></path>
							</svg>
							<div>正在看</div>
						</li>
						<li @click="changeAnimeType('已看')" :class="{typeBtnLiActive:selectedTypeName==='已看'}">
							<svg t="1741349873518" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5503">
								<path d="M840.628 128.246c13.12-17.774 38.163-21.548 55.937-8.43 17.775 13.12 21.549 38.163 8.43 55.938L373.18 896.294c-15.988 21.663-48.379 21.663-64.367 0L79.817 586.033c-13.12-17.775-9.345-42.818 8.43-55.937 17.774-13.119 42.817-9.345 55.936 8.43l196.815 266.658 499.63-676.937z" p-id="5504"></path>
							</svg>
							<div>已看</div>
						</li>
						<li @click="changeAnimeType('未看')" :class="{typeBtnLiActive:selectedTypeName==='未看'}">
							<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
								<path d="M547.2 512l416-416c9.6-9.6 9.6-25.6 0-35.2s-25.6-9.6-35.2 0l-416 416-416-416c-9.6-9.6-25.6-9.6-35.2 0s-9.6 25.6 0 35.2l416 416-416 416c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l416-416 416 416c9.6 9.6 25.6 9.6 35.2 0s9.6-25.6 0-35.2L547.2 512z"></path>
							</svg>
							<div>未看</div>
						</li>
					</ul>
					<div class="btn" slot="reference" ref="typeBtn">
						<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path d="M0 73.7C0 50.7 18.7 32 41.7 32H470.3c23 0 41.7 18.7 41.7 41.7c0 9.6-3.3 18.9-9.4 26.3L336 304.5V447.7c0 17.8-14.5 32.3-32.3 32.3c-7.3 0-14.4-2.5-20.1-7l-92.5-73.4c-9.6-7.6-15.1-19.1-15.1-31.3V304.5L9.4 100C3.3 92.6 0 83.3 0 73.7zM55 80L218.6 280.8c3.5 4.3 5.4 9.6 5.4 15.2v68.4l64 50.8V296c0-5.5 1.9-10.9 5.4-15.2L457 80H55z"></path>
						</svg>
						<span>{{selectedTypeName}}</span>
						<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"></path>
						</svg>
					</div>
				</el-popover>
			</div>

			<!-- 排序 -->
			<div class="sort">
				sort
			</div>
		</div>
		<!-- endregion -->

		<!-- region 统计动漫总数 -->
		<div class="total">
			<div v-show="selectedTypeName==='全部'">
				<span>已加入</span>
				<CountTo ref="refcountofore" :start-val="0" :end-val="total" class="number-font" :duration="2000" />
				<span>部动漫</span>
			</div>
			<div v-show="selectedTypeName==='正在看'">
				<span>正在观看</span>
				<CountTo ref="refcountofore" :start-val="0" :end-val="total" class="number-font" :duration="2000" />
				<span>部动漫</span>
			</div>
			<div v-show="selectedTypeName==='已看'">
				<span>已经看了</span>
				<CountTo ref="refcountofore" :start-val="0" :end-val="total" class="number-font" :duration="2000" />
				<span>部动漫</span>
			</div>
			<div v-show="selectedTypeName==='未看'">
				<span>还有</span>
				<CountTo ref="refcountofore" :start-val="0" :end-val="total" class="number-font" :duration="2000" />
				<span>部动漫未看</span>
			</div>
		</div>
		<!-- endregion -->

		<!-- region 动漫列表 -->
		<div class="listBox">
			<div class="list">
				<div class="item" v-for="(anime, index) in animeList" :key="anime.animeId">
					<div class="img" @click="goAnimeDetail(anime.animeUserId)">
						<img v-lazy="anime.cover" alt="">
					</div>
					<div class="content">
						<div class="info">
							<el-tooltip effect="dark" :content="anime.name" placement="top" :visible-arrow="false" :open-delay="300">
								<div class="name">{{anime.name}}</div>
							</el-tooltip>
							<div class="date" v-show="selectedTypeName!=='已看'">于<span>{{selectedTypeName==='正在看' ? anime.watchingDate : anime.createDate}}</span>加入</div>
							<div class="date" v-show="selectedTypeName==='已看'">于<span>{{anime.finishedDate}}</span>看完</div>
						</div>
						<div class="control">
							<button @click="openAnimeListPopover(anime.animeUserId, anime.watchStatus, index, $event)">
								<svg width="20px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
									<path d="M432 256a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zm-160 0a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zM64 304a48 48 0 1 1 0-96 48 48 0 1 1 0 96z"></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
			<el-empty v-if="emptyFlag" description="暂无动漫" />

			<!-- 滚动加载动画 -->
			<scroll-animation :loading="scrollLoading" />

			<!-- 结束标志 -->
			<end-hr content="我也是有底线的！" v-show="showEndHr" />
		</div>
		<!-- endregion -->

		<!-- region 复用弹出框 -->
		<el-popover
				:visible-arrow="false"
				trigger="manual"
				v-model="animeListPopoverFlag"
				popper-class="animeListPopover"
		>
			<ul>
				<li @click="updateAnimeWatchStatus('WATCHING')" v-show="popover.watchStatus !== 'WATCHING'">
					<svg style="margin-left: -4px;" width="23px" height="23px" stroke="black" stroke-width="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<path d="M511.95904 260.90496c177.83296 0 335.872 107.43808 403.712 269.14304l3.456 8.27904-3.456 8.23296a437.93408 437.93408 0 0 1-403.712 269.01504 437.68832 437.68832 0 0 1-403.62496-269.01504l-3.46112-8.23296 3.41504-8.27904a437.632 437.632 0 0 1 403.62496-269.14304h0.04608z m0 42.67008a394.96192 394.96192 0 0 0-364.33408 242.98496l3.584-8.27904 1.408 3.2a394.99264 394.99264 0 0 0 346.67008 231.25504l12.62592 0.16896a395.24864 395.24864 0 0 0 364.37504-242.85696l-3.62496 8.192-1.36704-3.11296a395.15136 395.15136 0 0 0-346.752-231.34208l-12.63104-0.20992h0.04608z" />
						<path d="M512 426.66496a128 128 0 1 1 0 256.00512 128 128 0 0 1 0-256z m0 42.67008A85.33504 85.33504 0 1 0 512 640a85.33504 85.33504 0 0 0 0-170.66496z" />
					</svg>
					<div>标记为正在看</div>
				</li>
				<li @click="updateAnimeWatchStatus('FINISHED')" v-show="popover.watchStatus !== 'FINISHED'">
					<svg width="18px" height="18px" stroke="black" stroke-width="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
						<path d="M939.36 218.912a32 32 0 0 1 45.856 44.672l-538.016 552a32 32 0 0 1-43.776 1.92L63.872 526.048a32 32 0 1 1 41.696-48.544l316.768 271.936L939.36 218.88z"></path>
					</svg>
					<div>标记为已看</div>
				</li>
				<li @click="updateAnimeWatchStatus('NO_WATCH')" v-show="popover.watchStatus !== 'NO_WATCH'">
					<svg width="16px" height="16px" stroke="black" stroke-width="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
						<path d="M547.2 512l416-416c9.6-9.6 9.6-25.6 0-35.2s-25.6-9.6-35.2 0l-416 416-416-416c-9.6-9.6-25.6-9.6-35.2 0s-9.6 25.6 0 35.2l416 416-416 416c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l416-416 416 416c9.6 9.6 25.6 9.6 35.2 0s9.6-25.6 0-35.2L547.2 512z"></path>
					</svg>
					<div>标记为未看</div>
				</li>
				<li @click="toDustbin">
					<svg width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
						<path d="M177.1 48h93.7c2.7 0 5.2 1.3 6.7 3.6l19 28.4h-145l19-28.4c1.5-2.2 4-3.6 6.7-3.6zM354.2 80L317.5 24.9C307.1 9.4 289.6 0 270.9 0H177.1c-18.7 0-36.2 9.4-46.6 24.9L93.8 80H80.1 32 24C10.7 80 0 90.7 0 104s10.7 24 24 24H35.6L59.6 452.7c2.5 33.4 30.3 59.3 63.8 59.3H324.6c33.5 0 61.3-25.9 63.8-59.3L412.4 128H424c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8H367.9 354.2zm10.1 48L340.5 449.2c-.6 8.4-7.6 14.8-16 14.8H123.4c-8.4 0-15.3-6.5-16-14.8L83.7 128H364.3z"></path>
					</svg>
					<div>发送到垃圾箱</div>
				</li>
			</ul>
		</el-popover>
		<!-- endregion -->
	</div>
</template>

<script>
import {reqGetPageAnime, reqLogicallyDeleteAnime, reqUpdateAnimeWatchStatus} from "@/api";
import _ from "lodash";
import CountTo from "vue-count-to";
import EndHr from "@/components/endHr.vue";
import ScrollAnimation from "@/components/scrollAnimation.vue";

export default {
	name: 'AnimeList',
	components: {CountTo, EndHr, ScrollAnimation},
	data() {
		return {
			//移动端选择的筛选类型名称
			selectedTypeName: '全部',

			//滚动加载动画标志
			scrollLoading: false,

			//动漫数据
			animeList: [],

			//空状态，true显示空状态
			emptyFlag: false,

			//当前页
			current: 1,

			//每页显示动漫数量
			size: 10,

			//搜索关键词
			keyword: '',

			//是否还有下一页数据
			hasNext: false,

			//动漫总数
			total: 0,

			//打开popover对应的动漫数据
			popover: {
				animeUserId: 0,
				watchStatus: '',
				index: 0 //动漫在列表中的位置
			},

			typePopoverFlag: false
		}
	},
	computed: {
		//是否显示结束分割线
		showEndHr() {
			return this.current > 2;
		},

		//全局遮罩显示标志
		maskFlag: {
			get() {
				return this.$store.state.maskFlag;
			},
			set(val) {
				this.$store.commit('MASK_FLAG', val);
			}
		},

		//复用popover显示标志
		animeListPopoverFlag: {
			get() {
				return this.$store.state.animeListPopoverFlag;
			},
			set(val) {
				this.$store.commit('ANIME_LIST_POPOVER_FLAG', val);
			}
		}
	},
	methods: {
		//搜索动漫
		searchAnime: _.throttle(function () {
			this.getFirstPageAnime();
		}, 1000),

		//添加按钮回调
		goAddAnime() {
			//将内容改为添加
			this.$store.commit('HOME_CONTENT_TYPE', 'addAnime');

			this.$router.push('/home/addAnime');
		},

		//点击动漫进入详情页面
		goAnimeDetail(animeUserId) {
			this.$router.push(`/animeDetail?animeUserId=${animeUserId}`);
		},

		/**
		 * 更新动漫观看状态
		 * @param newStatus 新状态
		 */
		async updateAnimeWatchStatus(newStatus) {
			//关闭编辑动漫弹窗及全局遮罩
			this.animeListPopoverFlag = false;
			this.maskFlag = false;

			let oldStatus = null;
			switch (this.selectedTypeName) {
				case '未看': oldStatus = 'NO_WATCH'; break;
				case '正在看': oldStatus = 'WATCHING'; break;
				case '已看': oldStatus = 'FINISHED'; break;
			}

			//更改服务器数据
			let result = await reqUpdateAnimeWatchStatus(this.popover.animeUserId, this.current, this.size, this.keyword, newStatus, oldStatus);
			if (result.code !== 200) {
				this.$message.error('标记失败！');
				return ;
			}
			this.$message.success(`标记成功！${newStatus === 'FINISHED' ? '快去动漫详情页给这部动漫评分吧！' : ''}`);

			//更新列表
			if (this.selectedTypeName === '全部') {
				this.animeList[this.popover.index].watchStatus = newStatus;
			} else {
				this.animeList.splice(this.popover.index, 1);
				this.total--;
				if (result.data != null) {
					this.animeList.push(result.data);
				}
			}
		},

		/**
		 * 将动漫移入垃圾箱
		 */
		async toDustbin() {
			//关闭编辑动漫弹窗及全局遮罩
			this.animeListPopoverFlag = false;
			this.maskFlag = false;

			let status = null;
			switch (this.selectedTypeName) {
				case '未看': status = 'NO_WATCH'; break;
				case '正在看': status = 'WATCHING'; break;
				case '已看': status = 'FINISHED'; break;
			}
			let result = await reqLogicallyDeleteAnime(this.popover.animeUserId, this.current, this.size, this.keyword, status);
			if (result.code !== 200) {
				this.$message.error('移入失败！');
				return ;
			}

			this.$message.success('移入成功！');

			//更新animeList
			this.animeList.splice(this.popover.index, 1);
			if (result.data != null) {
				this.animeList.push(result.data);
			}

			//更新动漫总数
			this.total--;
		},

		//获取对应分类的第一页数据
		async getFirstPageAnime() {
			this.current = 1;
			let status;
			if (this.selectedTypeName === '已看') {
				status = 'FINISHED';
			} else if (this.selectedTypeName === '未看') {
				status = 'NO_WATCH';
			} else if (this.selectedTypeName === '正在看') {
				status = 'WATCHING';
			}

			//获取数据
			let result = await reqGetPageAnime(this.current, this.size, this.keyword, status);
			if (result.code !== 200) {
				this.$message.error('数据获取失败！');
				return ;
			}

			this.animeList = result.data.records || [];

			//数据为空展示空状态
			this.emptyFlag = this.animeList.length === 0;

			//数据为空表示下一页无数据
			this.hasNext = result.data.current < result.data.pages;

			//获取动漫总数
			this.total = result.data.total;
		},

		//分页获取动漫数据
		async getPageAnime() {
			//开启加载动画
			this.scrollLoading = true;

			let status;
			if (this.selectedTypeName === '已看') {
				status = 'FINISHED';
			} else if (this.selectedTypeName === '未看') {
				status = 'NO_WATCH';
			} else if (this.selectedTypeName === '正在看') {
				status = 'WATCHING';
			}
			try {
				//获取数据
				let result = await reqGetPageAnime(++this.current, this.size, this.keyword, status);
				if (result.code !== 200) {
					this.$message.error('数据获取失败！');
					return ;
				}

				this.animeList = this.animeList.concat(result.data.records || []);
				this.hasNext = result.data.current < result.data.pages;
			} finally {
				//关闭加载动画
				this.scrollLoading = false;
			}
		},

		//点击动漫分类按钮
		changeAnimeType(type) {
			if (this.selectedTypeName === type) {
				return;
			}

			this.typePopoverFlag = false;

			//修改内容标志
			this.selectedTypeName = type;

			//更改当前页为第一页
			this.current = 1;

			//获取对应分类第一页动漫数据
			this.getFirstPageAnime();
		},

		lazyLoading() {
			let scrollHeight= document.documentElement.scrollHeight || document.body.scrollHeight; //document的滚动高度
			let nowScotop = document.documentElement.clientHeight || document.body.clientHeight;  //可视区高度
			let wheight= document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度

			let bottomOfWindow = scrollHeight - wheight - nowScotop;

			//当距离底部的距离小于300px时，请求服务器数据
			if (bottomOfWindow < 300 && this.hasNext) {
				this.hasNext = false;
				this.getPageAnime();
			}
		},

		//输入框获取焦点自动全选
		handleFocus(e) {
			e.currentTarget.select();
		},

		//打开animeListPopover
		openAnimeListPopover(animeUserId, watchStatus, index, event) {
			//获取数据
			this.popover.animeUserId = animeUserId;
			this.popover.watchStatus = watchStatus;
			this.popover.index = index;

			this.animeListPopoverFlag = true;
			this.maskFlag = true;

			//定位popover的位置
			this.$nextTick(() => {
				let popover = document.querySelector('.animeListPopover');
				if (!popover) return;

				// 获取关键尺寸
				let popoverWidth = popover.offsetWidth;
				let popoverHeight = popover.offsetHeight;
				let viewportWidth = document.documentElement.clientWidth;
				let viewportHeight = document.documentElement.clientHeight;

				// 获取滚动偏移量
				let scrollX = window.pageXOffset || document.documentElement.scrollLeft;
				let scrollY = window.pageYOffset || document.documentElement.scrollTop;

				// 计算文档流坐标
				const clickDocX = event.clientX + scrollX;
				const clickDocY = event.clientY + scrollY;

				// ===== 水平居中计算 =====
				let targetX = clickDocX - popoverWidth / 2;

				// 右侧越界修正
				if (targetX + popoverWidth > scrollX + viewportWidth) {
					targetX = scrollX + viewportWidth - popoverWidth - 5;
				}
				// 左侧越界修正
				else if (targetX < scrollX) {
					targetX = scrollX + 5;
				}

				// ===== 垂直位置计算 =====
				let targetY = clickDocY - popoverHeight - 10; // 目标位置：上方 10px

				// 上方空间不足时改为下方显示
				if (targetY < scrollY) {
					targetY = clickDocY + 10;
				}

				// 检查下方越界
				if (targetY + popoverHeight > scrollY + viewportHeight) {
					targetY = scrollY + viewportHeight - popoverHeight - 5;
				}

				// 应用最终坐标
				popover.style.left = `${Math.floor(targetX)}px`;
				popover.style.top = `${Math.floor(targetY)}px`;
			});
		},

		//打开typePopover
		openTypePopover() {
			//打开全局遮罩
			this.maskFlag = true;

			//添加激活样式
			this.$refs.typeBtn.classList.add('typeBtnActive');
		},

		//关闭typePopover
		closeTypePopover() {
			this.maskFlag = false;
			this.$refs.typeBtn.classList.remove('typeBtnActive');
		}
	},
	created() {
		//获取全部分类中第一页数据
		this.getFirstPageAnime();
	},
	mounted() {
		setTimeout(() => {
			window.addEventListener('scroll', this.lazyLoading);
		}, 500);
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.lazyLoading);
	},
	//从详情页面返回
	activated() {
		setTimeout(() => {
			window.addEventListener('scroll', this.lazyLoading);
		}, 500);
	},
	//进入详情页面取消滚动加载
	deactivated() {
		window.removeEventListener('scroll', this.lazyLoading);
	}
}
</script>

<style scoped lang="scss">
@font-face {
	font-family: 'numberfont';
	font-display: swap;
	src: url("@/assets/fonts/number/webfont.ttf");
}

.animeList {
	min-height: calc(100vh - 2.3rem);
	display: flex;
	flex-direction: column;

	@media screen and (max-width: 768px) {
		//减去顶部导航栏高度
		min-height: calc(100vh - 6px - 60px);
	}

	/* 模块分类名称 */
	.typeTitle {
		min-width: 110px;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		margin-left: 1rem;

		@media screen and (max-width: 768px) {
			margin-left: 6px;
		}

		svg {
			width: 22px;
			height: 22px;
			fill: #000000;
			stroke: #000000;
			stroke-width: 20px;
		}

		div {
			min-width: 76px;
			margin-left: 15px;
			font-weight: bold;
			color: #3c3838;
		}
	}

	/* 添加按钮与搜索框 */
	> .control {
		display: flex;
		margin-top: 1rem;
		background-color: #FFFFFF;
		box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
		border-radius: 10px;
		padding: 15px;

		@media screen and (max-width: 768px) {
			display: block;
		}

		.addBtn {
			width: 10%;
			min-width: 90px;
			box-sizing: border-box;
			border-radius: 5px;
			background-attachment: scroll;
			background-blend-mode: normal;
			background-clip: border-box;
			background-color: rgba(0, 0, 0, 0);
			background-image: linear-gradient(92.91deg, rgb(51, 0, 217) 2.18%, rgb(157, 32, 201) 44.94%, rgb(223, 122, 108) 99.91%);
			background-origin: padding-box;
			background-position-x: 0;
			background-position-y: 0;
			background-size: 400%;
			transition: background-size 0.3s;
			cursor: pointer;
			display: flex;
			justify-content: center;
			align-items: center;

			&:hover {
				background-size: 200%;
			}

			@media screen and (max-width: 768px) {
				width: 100%;
				height: 45px;
			}

			svg {
				display: block;
				vertical-align: middle;
				fill: #f7f3f2;
				width: 1rem;
				height: 1rem;
				stroke: #f7f3f2;
				stroke-width: 20px;
			}

			div {
				display: block;
				vertical-align: middle;
				margin-left: 10px;
				font-weight: bold;
				color: white;
			}
		}

		.search {
			width: 100%;
			margin-left: 1rem;
			position: relative;

			@media screen and (max-width: 768px) {
				width: 100%;
				margin-left: 0;
				margin-top: 1rem;
			}

			svg {
				display: inline-block;
				vertical-align: middle;
				position: absolute;
				top: 14px;
				left: 14px;
				fill: #cac5c4;
			}

			input {
				width: 100%;
				min-width: 250px;
				height: 44px;
				box-sizing: border-box;
				display: inline-block;
				vertical-align: middle;
				outline: transparent solid 2px;
				outline-offset: 2px;
				border: 1px solid #DCDFE6;
				border-radius: 5px;
				transition: all 0.2s;
				padding-left: 45px;

				&:hover {
					border-color: #C0C4CC;
				}

				&:focus {
					border-color: rgb(49, 130, 206);
					box-shadow: rgb(49, 130, 206) 0 0 0 1px;
					background-color: #FFFFFF;
				}

				@media screen and (max-width: 768px) {
					width: 100%;
				}
			}
		}
	}

	/* 筛选 */
	.filter {
		margin-top: .6rem;
		background-color: #FFFFFF;
		box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
		border-radius: 10px;
		padding: 15px;
		user-select:none;
		display: flex;
		justify-content: space-between;

		/* 分类 */
		.type {
			display: flex;

			.typeBtnActive {
				color: #2B0AFF;
				background-color: #eae7ff;

				svg {
					fill: #2b0aff;
					stroke: #2b0aff;
				}

				svg:nth-child(3) {
					transform: rotateZ(180deg);
				}
			}

			.btn {
				display: flex;
				font-size: 1.2rem;
				align-items: center;
				border-radius: 5px;
				cursor: pointer;
				transition: background-color .3s;
				padding: 10px 15px;

				&:hover {
					background-color: #eae7ff;
				}

				svg {
					width: 18px;
					height: 18px;
					transition: all .3s;
				}

				span {
					margin: 0 10px;
				}
			}
		}

		/* 排序 */
		.sort {

		}
	}

	/* 统计 */
	.total {
		margin-top: .6rem;
		background-color: #FFFFFF;
		box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
		border-radius: 10px;
		padding: 15px;
		text-align: center;

		.number-font {
			font-family: "numberfont" !important;
			font-style: normal;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			background-image: linear-gradient(50deg, rgb(43, 10, 255), rgb(255, 91, 138) 49%, rgb(255, 91, 138) 53%, rgb(255, 91, 138) 55%, rgb(251, 166, 75) 77%, rgb(249, 155, 82));
			background-clip: text;
			color: transparent;
			font-size: 1.5rem;
		}
	}

	/* 动漫列表 */
	.listBox {
		flex: 1;
		margin-top: .6rem;
		background-color: #FFFFFF;
		box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
		border-radius: 10px;
		padding: 15px;
		position: relative;

		@media screen and (max-width: 768px) {
			padding: 10px;
		}

		.list {
			display: grid;
			grid-gap: 20px;

			@media screen and (max-width: 600px) {
				grid-template-columns: repeat(1, 1fr);
			}

			@media screen and (min-width: 600px) and (max-width: 1000px) {
				grid-template-columns: repeat(2, 1fr);
			}

			@media screen and (min-width: 1000px) and (max-width: 1260px) {
				grid-template-columns: repeat(3, 1fr);
			}

			@media screen and (min-width: 1260px) and (max-width: 1500px) {
				grid-template-columns: repeat(4, 1fr);
			}

			@media screen and (min-width: 1500px) {
				grid-template-columns: repeat(5, 1fr);
			}

			.item {
				/* item过渡时间 */
				$transitionTime: 0.3s;

				/*宽度与高度的比例*/
				aspect-ratio: 0.8;
				border-radius: 10px;
				box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06);
				overflow: hidden;
				transition: all $transitionTime;

				/* 鼠标移入item给item添加阴影 */
				&:hover {
					box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05);

					/* 鼠标移入item给content添加背景 */
					.content {
						background-color: #f7f3f2;
					}
				}

				@media screen and (max-width: 768px) {
					aspect-ratio: 1;
				}

				.img {
					height: 82%;
					overflow: hidden;
					cursor: pointer;

					/* 鼠标移入图片放大图片 */
					&:hover {
						img {
							transform: scale(1.1);
						}
					}

					/* 图片自适应父盒子 */
					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
						transition: transform $transitionTime;
					}
				}

				.content {
					height: 18%;
					background-color: #FFFFFF;
					transition: background-color $transitionTime;

					&::after {
						content: '';
						display: block;
						clear: both;
					}

					.info {
						width: 85%;
						height: 100%;
						float: left;
						display: flex;
						flex-direction: column;
						justify-content: space-evenly;
						text-align: center;

						@media screen and (max-width: 768px) {
							width: 80%;
						}

						.name {
							width: 100%;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							padding-left: 5px;
							box-sizing: border-box;
						}

						.date {
							width: 100%;
							font-size: 0.8rem;
							color: #ada8a8;
						}
					}

					.control {
						width: 15%;
						height: 100%;
						float: right;
						position: relative;

						@media screen and (max-width: 768px) {
							width: 20%;
						}

						button {
							width: 30px;
							height: 30px;
							border-radius: 50%;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							transition: color, background-color .3s;

							/* 移入文字旁的按钮改变按钮背景色和svg颜色 */
							&:hover {
								background-color: #e5e0df;
								color: #3c3838;
							}

							@media screen and (max-width: 768px) {
								width: 35px;
								height: 35px;
							}

							svg {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								margin: auto;
								fill: #ada8a8;
							}
						}
					}
				}
			}
		}

		.el-empty {
			padding: 0;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	/* 复用popover */
	.animeListPopover ul {
		li:last-child {
			color: red;
			svg {
				fill: red;
			}
		}
	}
}
</style>

<style lang="scss">
.typePopover ul {
	.typeBtnLiActive {
		color: #2B0AFF;
		background-color: #eae7ff;

		svg {
			fill: #2b0aff;
			stroke: #2b0aff;
		}
	}

	li svg {
		fill: #000000;
		stroke: #000000;
		stroke-width: 10px;
	}
}
</style>