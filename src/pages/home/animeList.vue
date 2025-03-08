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
						@show="openFilterPopover('type')"
						@hide="closeFilterPopover('type')"
						popper-class="typePopover"
						v-model="typePopoverFlag"
				>
					<ul>
						<li @click="changeFilterType('全部')" :class="{filterBtnLiActive:selectedTypeName==='全部'}">
							<svg t="1741331905462" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7742">
								<path d="M955.904 858.112z" p-id="7743"></path>
								<path d="M312.832 63.488H75.264C33.792 63.488 0 97.28 0 138.752v237.568c0 41.472 33.792 75.264 75.264 75.264h237.568c41.472 0 75.264-33.792 75.264-75.264V138.752c0-41.472-33.792-75.264-75.264-75.264zM305.152 368.64H82.944V146.432h222.72V368.64zM312.832 572.416H75.264c-41.472 0-75.264 33.792-75.264 75.264v237.568c0 41.472 33.792 75.264 75.264 75.264h237.568c41.472 0 75.264-33.792 75.264-75.264v-237.568c0-41.472-33.792-75.264-75.264-75.264z m-7.68 305.152H82.944v-222.72h222.72v222.72zM518.144 169.984c2.048 1.024 4.608 1.536 6.656 1.536H982.528c2.048 0 4.096-0.512 6.144-1.024 18.944-4.096 32.768-20.48 32.768-39.936 0-18.944-13.312-35.328-31.744-39.936-2.048-1.024-4.608-1.536-7.168-1.536h-457.728c-2.56 0-5.12 0.512-7.168 2.048-17.92 4.608-31.232 20.992-31.232 39.424 0 18.432 13.312 35.328 31.744 39.424zM516.608 398.336c2.56 1.536 5.12 2.048 7.68 2.048h457.728c2.56 0 4.608-0.512 7.168-1.536 18.432-4.608 31.744-20.992 31.744-39.936 0-19.456-13.824-35.84-32.768-39.936-2.048-0.512-4.096-1.024-6.144-1.024H524.288c-2.048 0-4.608 0.512-6.656 1.536-18.432 4.608-31.744 20.992-31.744 39.936 0.512 17.92 13.312 34.304 30.72 38.912zM517.12 704c2.56 1.536 5.12 2.048 7.68 2.048h457.728c1.024 0 2.048 0 3.072-0.512 21.504-1.536 38.4-19.456 38.4-40.96 0-22.528-18.432-41.472-41.472-41.472H524.8c-2.048 0-4.608 0.512-6.656 1.536-18.432 4.608-31.744 20.992-31.744 39.936 0 18.432 12.8 34.304 30.72 39.424zM986.624 827.392c-1.536-0.512-2.56-0.512-4.096-0.512h-457.728c-2.56 0-5.12 0.512-7.68 2.048-17.92 4.608-30.72 20.992-30.72 39.424 0 18.944 13.312 35.328 32.256 39.936 2.048 1.024 4.096 1.024 6.144 1.024h454.656c1.024 0 2.048 0.512 3.072 0.512 22.528 0 41.472-18.432 41.472-41.472 0-20.992-16.384-38.912-37.376-40.96z" p-id="7744"></path>
							</svg>
							<div>全部</div>
						</li>
						<li @click="changeFilterType('正在看')" :class="{filterBtnLiActive:selectedTypeName==='正在看'}">
							<svg t="1741348465773" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2587">
								<path d="M512 128C170.666667 128 0 513.770667 0 513.770667S170.666667 896 512 896s512-384 512-384-170.666667-384-512-384z m0 682.666667C286.442667 810.666667 144.032 598.592 96.032 513.578667 144 427.754667 286.442667 213.333333 512 213.333333c225.6 0 368.021333 213.312 415.978667 298.666667C879.936 597.504 737.546667 810.666667 512 810.666667z m0-469.333334c-94.250667 0-170.666667 76.416-170.666667 170.666667 0 94.261333 76.416 170.666667 170.666667 170.666667 94.261333 0 170.666667-76.405333 170.666667-170.666667 0-94.250667-76.405333-170.666667-170.666667-170.666667z m0 256c-47.050667 0-85.333333-38.282667-85.333333-85.333333s38.282667-85.333333 85.333333-85.333333 85.333333 38.282667 85.333333 85.333333-38.282667 85.333333-85.333333 85.333333z" p-id="2588"></path>
								<path d="M512 128C170.666667 128 0 513.770667 0 513.770667S170.666667 896 512 896s512-384 512-384-170.666667-384-512-384z m0 682.666667C286.442667 810.666667 144.032 598.592 96.032 513.578667 144 427.754667 286.442667 213.333333 512 213.333333c225.6 0 368.021333 213.312 415.978667 298.666667C879.936 597.504 737.546667 810.666667 512 810.666667z m0-469.333334c-94.250667 0-170.666667 76.416-170.666667 170.666667 0 94.261333 76.416 170.666667 170.666667 170.666667 94.261333 0 170.666667-76.405333 170.666667-170.666667 0-94.250667-76.405333-170.666667-170.666667-170.666667z m0 256c-47.050667 0-85.333333-38.282667-85.333333-85.333333s38.282667-85.333333 85.333333-85.333333 85.333333 38.282667 85.333333 85.333333-38.282667 85.333333-85.333333 85.333333z" p-id="2589"></path>
							</svg>
							<div>正在看</div>
						</li>
						<li @click="changeFilterType('已看')" :class="{filterBtnLiActive:selectedTypeName==='已看'}">
							<svg t="1741349873518" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5503">
								<path d="M840.628 128.246c13.12-17.774 38.163-21.548 55.937-8.43 17.775 13.12 21.549 38.163 8.43 55.938L373.18 896.294c-15.988 21.663-48.379 21.663-64.367 0L79.817 586.033c-13.12-17.775-9.345-42.818 8.43-55.937 17.774-13.119 42.817-9.345 55.936 8.43l196.815 266.658 499.63-676.937z" p-id="5504"></path>
							</svg>
							<div>已看</div>
						</li>
						<li @click="changeFilterType('未看')" :class="{filterBtnLiActive:selectedTypeName==='未看'}">
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
				<el-popover
						:visible-arrow="false"
						placement="bottom"
						trigger="click"
						@show="openFilterPopover('sort')"
						@hide="closeFilterPopover('sort')"
						popper-class="sortPopover"
						v-model="sortPopoverFlag"
				>
					<ul>
						<li @click="changeFilterSort('JOIN_DESC')" :class="{filterBtnLiActive:selectedSortName === 'JOIN_DESC'}">
							<svg t="1741356737068" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10826">
								<path d="M853.333333 170.666667v512h128l-170.666666 213.333333-170.666667-213.333333h128V170.666667h85.333333z m-341.333333 597.333333v85.333333H128v-85.333333h384z m85.333333-298.666667v85.333334H128v-85.333334h469.333333z m0-298.666666v85.333333H128V170.666667h469.333333z" p-id="10827"></path>
							</svg>
							<div>按照加入时间降序</div>
						</li>
						<li @click="changeFilterSort('JOIN_ASC')" :class="{filterBtnLiActive:selectedSortName === 'JOIN_ASC'}">
							<svg t="1741356803925" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11970">
								<path d="M810.666667 128l170.666666 213.333333h-128v512h-85.333333V341.333333h-128l170.666667-213.333333z m-213.333334 640v85.333333H128v-85.333333h469.333333z m0-298.666667v85.333334H128v-85.333334h469.333333z m-85.333333-298.666666v85.333333H128V170.666667h384z" p-id="11971"></path>
							</svg>
							<div>按照加入时间升序</div>
						</li>
						<li @click="changeFilterSort('PLAY_DESC')" :class="{filterBtnLiActive:selectedSortName === 'PLAY_DESC'}">
							<svg t="1741356737068" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10826">
								<path d="M853.333333 170.666667v512h128l-170.666666 213.333333-170.666667-213.333333h128V170.666667h85.333333z m-341.333333 597.333333v85.333333H128v-85.333333h384z m85.333333-298.666667v85.333334H128v-85.333334h469.333333z m0-298.666666v85.333333H128V170.666667h469.333333z" p-id="10827"></path>
							</svg>
							<div>按照播放时间降序</div>
						</li>
						<li @click="changeFilterSort('PLAY_ASC')" :class="{filterBtnLiActive:selectedSortName === 'PLAY_ASC'}">
							<svg t="1741356803925" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11970">
								<path d="M810.666667 128l170.666666 213.333333h-128v512h-85.333333V341.333333h-128l170.666667-213.333333z m-213.333334 640v85.333333H128v-85.333333h469.333333z m0-298.666667v85.333334H128v-85.333334h469.333333z m-85.333333-298.666666v85.333333H128V170.666667h384z" p-id="11971"></path>
							</svg>
							<div>按照播放时间升序</div>
						</li>
					</ul>
					<div class="btn" slot="reference" ref="sortBtn">
						<svg t="1741355886874" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7629">
							<path d="M499.712645 782.909297l-76.488784 66.198125V460.775809a47.971881 47.971881 0 0 0-17.355889-36.247697A64.201429 64.201429 0 0 0 364.039768 409.578497c-15.717575 0-30.718387 5.375718-41.879401 14.949615A47.971881 47.971881 0 0 0 304.855675 460.775809v388.331613l-76.539982-66.198125a64.406219 64.406219 0 0 0-41.623414-14.335247 64.099035 64.099035 0 0 0-41.316231 15.000812 48.023079 48.023079 0 0 0-17.355889 35.735724 47.767092 47.767092 0 0 0 16.639126 35.991711l177.552279 153.591936c5.478112 4.76135 12.031368 8.549951 19.198992 11.161014a67.170874 67.170874 0 0 0 45.360819 0c7.167624-2.559866 13.72088-6.399664 19.250189-11.161014l177.552278-153.591936a47.767092 47.767092 0 0 0 16.58793-35.991711 48.023079 48.023079 0 0 0-17.304692-35.735724 64.150232 64.150232 0 0 0-41.367428-15.000812 64.406219 64.406219 0 0 0-41.623415 14.335247h-0.102395zM879.340715 168.592749l-177.552279-153.591937a59.952053 59.952053 0 0 0-19.301387-11.109816 67.785241 67.785241 0 0 0-45.207226 0 59.900855 59.900855 0 0 0-19.301387 11.109816l-177.552278 153.591937a47.767092 47.767092 0 0 0-16.58793 35.99171 48.023079 48.023079 0 0 0 17.304692 35.786922c11.007422 9.471503 25.854643 14.847221 41.367428 14.949615 15.512786 0.153592 30.462401-5.017337 41.623415-14.335248l76.642376-66.198124v388.331612c0 13.618485 6.246072 26.622602 17.355889 36.247697 11.058619 9.573897 26.110629 14.949615 41.828204 14.949615 15.717575 0 30.718387-5.375718 41.828204-14.949615a47.971881 47.971881 0 0 0 17.407086-36.247697V174.787624l76.488785 66.198124c11.161014 9.317911 26.110629 14.488839 41.623414 14.335248 15.512786-0.102395 30.360006-5.478112 41.316231-14.949615a48.023079 48.023079 0 0 0 17.355889-35.786922 47.767092 47.767092 0 0 0-16.639126-35.99171z" p-id="7630"></path>
						</svg>
						<div>
							<span v-show="selectedSortName === 'JOIN_DESC'">按照加入时间降序</span>
							<span v-show="selectedSortName === 'JOIN_ASC'">按照加入时间升序</span>
							<span v-show="selectedSortName === 'PLAY_DESC'">按照播放时间降序</span>
							<span v-show="selectedSortName === 'PLAY_ASC'">按照播放时间升序</span>
						</div>
						<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"></path>
						</svg>
					</div>
				</el-popover>
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
					<svg t="1741348465773" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2587">
						<path d="M512 128C170.666667 128 0 513.770667 0 513.770667S170.666667 896 512 896s512-384 512-384-170.666667-384-512-384z m0 682.666667C286.442667 810.666667 144.032 598.592 96.032 513.578667 144 427.754667 286.442667 213.333333 512 213.333333c225.6 0 368.021333 213.312 415.978667 298.666667C879.936 597.504 737.546667 810.666667 512 810.666667z m0-469.333334c-94.250667 0-170.666667 76.416-170.666667 170.666667 0 94.261333 76.416 170.666667 170.666667 170.666667 94.261333 0 170.666667-76.405333 170.666667-170.666667 0-94.250667-76.405333-170.666667-170.666667-170.666667z m0 256c-47.050667 0-85.333333-38.282667-85.333333-85.333333s38.282667-85.333333 85.333333-85.333333 85.333333 38.282667 85.333333 85.333333-38.282667 85.333333-85.333333 85.333333z" p-id="2588"></path>
						<path d="M512 128C170.666667 128 0 513.770667 0 513.770667S170.666667 896 512 896s512-384 512-384-170.666667-384-512-384z m0 682.666667C286.442667 810.666667 144.032 598.592 96.032 513.578667 144 427.754667 286.442667 213.333333 512 213.333333c225.6 0 368.021333 213.312 415.978667 298.666667C879.936 597.504 737.546667 810.666667 512 810.666667z m0-469.333334c-94.250667 0-170.666667 76.416-170.666667 170.666667 0 94.261333 76.416 170.666667 170.666667 170.666667 94.261333 0 170.666667-76.405333 170.666667-170.666667 0-94.250667-76.405333-170.666667-170.666667-170.666667z m0 256c-47.050667 0-85.333333-38.282667-85.333333-85.333333s38.282667-85.333333 85.333333-85.333333 85.333333 38.282667 85.333333 85.333333-38.282667 85.333333-85.333333 85.333333z" p-id="2589"></path>
					</svg>
					<div>标记为正在看</div>
				</li>
				<li @click="updateAnimeWatchStatus('FINISHED')" v-show="popover.watchStatus !== 'FINISHED'">
					<svg t="1741349873518" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5503">
						<path d="M840.628 128.246c13.12-17.774 38.163-21.548 55.937-8.43 17.775 13.12 21.549 38.163 8.43 55.938L373.18 896.294c-15.988 21.663-48.379 21.663-64.367 0L79.817 586.033c-13.12-17.775-9.345-42.818 8.43-55.937 17.774-13.119 42.817-9.345 55.936 8.43l196.815 266.658 499.63-676.937z" p-id="5504"></path>
					</svg>
					<div>标记为已看</div>
				</li>
				<li @click="updateAnimeWatchStatus('NO_WATCH')" v-show="popover.watchStatus !== 'NO_WATCH'">
					<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
						<path d="M547.2 512l416-416c9.6-9.6 9.6-25.6 0-35.2s-25.6-9.6-35.2 0l-416 416-416-416c-9.6-9.6-25.6-9.6-35.2 0s-9.6 25.6 0 35.2l416 416-416 416c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l416-416 416 416c9.6 9.6 25.6 9.6 35.2 0s9.6-25.6 0-35.2L547.2 512z"></path>
					</svg>
					<div>标记为未看</div>
				</li>
				<li @click="toDustbin">
					<svg t="1741332809270"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14396">
						<path d="M944 192l-188.8 0 0-44.8c0-54.4-44.8-99.2-99.2-99.2l-294.4 0c-54.4 0-99.2 44.8-99.2 99.2l0 44.8-179.2 0c-12.8 0-25.6 9.6-25.6 25.6 0 12.8 9.6 25.6 25.6 25.6l60.8 0 0 0 0 633.6c0 54.4 44.8 99.2 99.2 99.2l550.4 0c54.4 0 99.2-44.8 99.2-99.2l0-630.4 0-3.2 51.2 0c12.8 0 25.6-9.6 25.6-25.6C966.4 204.8 960 192 944 192zM316.8 147.2c0-25.6 22.4-48 48-48l294.4 0c25.6 0 48 22.4 48 48l0 44.8-390.4 0L316.8 147.2zM841.6 867.2c0 28.8-16 57.6-41.6 57.6l-550.4 0c-25.6 0-54.4-19.2-54.4-44.8l3.2-636.8 643.2 0 0 0L841.6 867.2z" p-id="14397"></path>
						<path d="M368 380.8c-16 0-25.6 9.6-25.6 25.6l0 342.4c0 16 12.8 25.6 25.6 25.6 12.8 0 25.6-9.6 25.6-25.6l0-342.4C390.4 393.6 384 380.8 368 380.8z" p-id="14398"></path>
						<path d="M528 380.8c-16 0-25.6 9.6-25.6 25.6l0 342.4c0 16 12.8 25.6 25.6 25.6 12.8 0 25.6-9.6 25.6-25.6l0-342.4C550.4 393.6 544 380.8 528 380.8z" p-id="14399"></path>
						<path d="M688 380.8c-16 0-25.6 9.6-25.6 25.6l0 342.4c0 16 12.8 25.6 25.6 25.6 12.8 0 25.6-9.6 25.6-25.6l0-342.4C710.4 393.6 704 380.8 688 380.8z" p-id="14400"></path>
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
			//选择分类类型
			selectedTypeName: '全部',

			//选择排序类型
			selectedSortName: 'JOIN_DESC',

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

			//typePopover显示标志
			typePopoverFlag: false,

			//sortPopover显示标志
			sortPopoverFlag: false
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
				case '全部': oldStatus = 'ALL'; break;
				case '未看': oldStatus = 'NO_WATCH'; break;
				case '正在看': oldStatus = 'WATCHING'; break;
				case '已看': oldStatus = 'FINISHED'; break;
			}

			//更改服务器数据
			let result = await reqUpdateAnimeWatchStatus(this.popover.animeUserId, this.current, this.size, this.keyword, newStatus, oldStatus, this.selectedSortName);
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
				case '全部': status = 'ALL'; break;
				case '未看': status = 'NO_WATCH'; break;
				case '正在看': status = 'WATCHING'; break;
				case '已看': status = 'FINISHED'; break;
			}
			let result = await reqLogicallyDeleteAnime(this.popover.animeUserId, this.current, this.size, this.keyword, status, this.selectedSortName);
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
			let status = null;
			switch (this.selectedTypeName) {
				case '全部': status = 'ALL'; break;
				case '未看': status = 'NO_WATCH'; break;
				case '正在看': status = 'WATCHING'; break;
				case '已看': status = 'FINISHED'; break;
			}

			//获取数据
			let result = await reqGetPageAnime(this.current, this.size, this.keyword, status, this.selectedSortName);
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

			let status = null;
			switch (this.selectedTypeName) {
				case '全部': status = 'ALL'; break;
				case '未看': status = 'NO_WATCH'; break;
				case '正在看': status = 'WATCHING'; break;
				case '已看': status = 'FINISHED'; break;
			}
			try {
				//获取数据
				let result = await reqGetPageAnime(++this.current, this.size, this.keyword, status, this.selectedSortName);
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

		//修改筛选分类
		changeFilterType(type) {
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
		openFilterPopover(popoverType) {
			//打开全局遮罩
			this.maskFlag = true;

			//添加激活样式
			if (popoverType === 'type') {
				this.$refs.typeBtn.classList.add('filterBtnActive');
			} else {
				this.$refs.sortBtn.classList.add('filterBtnActive');
			}
		},

		//关闭typePopover
		closeFilterPopover(popoverType) {
			this.maskFlag = false;
			if (popoverType === 'type') {
				this.$refs.typeBtn.classList.remove('filterBtnActive');
			} else {
				this.$refs.sortBtn.classList.remove('filterBtnActive');
			}
		},

		//修改筛选排序
		changeFilterSort(sort) {
			if (this.selectedSortName === sort) {
				return;
			}

			this.sortPopoverFlag = false;

			//修改内容标志
			this.selectedSortName = sort;

			//更改当前页为第一页
			this.current = 1;

			//获取对应分类第一页动漫数据
			this.getFirstPageAnime();
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
			padding: 10px;
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

		@media screen and (max-width: 768px) {
			padding: 10px;
		}

		.filterBtnActive {
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

		/* 分类 */
		.type,
		.sort {
			display: flex;

			.btn {
				display: flex;
				font-size: 1.2rem;
				align-items: center;
				border-radius: 5px;
				cursor: pointer;
				transition: background-color .3s;
				padding: 10px 15px;

				@media screen and (max-width: 768px) {
					padding: 10px;
				}

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
	}

	/* 统计 */
	.total {
		margin-top: .6rem;
		background-color: #FFFFFF;
		box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
		border-radius: 10px;
		padding: 15px;
		text-align: center;

		@media screen and (max-width: 768px) {
			padding: 10px;
		}

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
		li svg {
			fill: #000000;
			stroke: #000000;
			stroke-width: 10px;
		}

		li:last-child {
			color: red;
			svg {
				fill: red;
				stroke: red;
			}
		}
	}
}
</style>

<style lang="scss">
.filterBtnLiActive {
	color: #2B0AFF !important;
	background-color: #eae7ff;

	svg {
		fill: #2b0aff !important;
		stroke: #2b0aff !important;
	}
}

.typePopover,
.sortPopover {
	ul li svg {
		fill: #000000;
		stroke: #000000;
		stroke-width: 10px;
	}
}
</style>