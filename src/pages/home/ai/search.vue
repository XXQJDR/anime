<template>
	<div class="ai-search">
		<!-- 图片上传区域 -->
		<div class="upload-section">
			<div
					class="upload-area"
					@click="triggerFileInput"
					@dragover.prevent="dragover = true"
					@dragleave="dragover = false"
					@drop.prevent="handleDrop"
					:class="{ 'dragover': dragover }"
			>
				<input
						type="file"
						ref="fileInput"
						@change="handleFileChange"
						accept="image/*"
						style="display: none;"
				>
				<div v-if="!imagePreview" class="upload-prompt">
					<i class="upload-icon">📁</i>
					<p>点击上传图片或拖拽到此处</p>
				</div>
				<img v-else :src="imagePreview" class="preview-image">
			</div>

			<button
					@click="recognizeAnime"
					:disabled="!imagePreview || isRecognizing"
					class="recognize-btn"
			>
				{{ isRecognizing ? '识别中...' : '识别动漫' }}
			</button>
		</div>

		<!-- 识别结果 -->
		<div v-if="animeInfo" class="anime">
			<div class="cover">
				<img :src="animeInfo.coverImage" :alt="animeInfo.title">
			</div>

			<div class="info">
				<h3 class="title">{{ animeInfo.title }}</h3>

				<div v-if="animeInfo.genres && animeInfo.genres.length" class="genres">
					<span v-for="genre in animeInfo.genres" :key="genre" class="genre-tag">
						{{ translateGenre(genre) }}
					</span>
				</div>

				<div class="info-section">
					<p><strong>类型:</strong> {{ animeInfo.format }}</p>
					<p><strong>状态:</strong> {{ animeInfo.status }}</p>
					<p><strong>集数:</strong> {{ animeInfo.episodes }}</p>
					<p><strong>评分:</strong> {{ animeInfo.averageScore }}/100</p>
					<p><strong>首播日期:</strong> {{ animeInfo.startDate }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'AiSearch',
	data() {
		return {
			dragover: false,
			imageFile: null,
			imagePreview: null,
			isRecognizing: false,
			animeInfo: null,

			// 类型翻译字典
			typeTranslations: {
				'TV': 'TV动画',
				'TV_SHORT': '短篇TV',
				'MOVIE': '剧场版',
				'SPECIAL': '特别篇',
				'OVA': 'OVA',
				'ONA': '网络动画',
				'MUSIC': '音乐视频'
			},

			// 状态翻译字典
			statusTranslations: {
				'FINISHED': '已完结',
				'RELEASING': '连载中',
				'NOT_YET_RELEASED': '未播出',
				'CANCELLED': '已取消',
				'HIATUS': '暂停'
			},

			//类型翻译字典
			genreTranslations: {
				'Action': '动作',
				'Adventure': '冒险',
				'Comedy': '喜剧',
				'Drama': '剧情',
				'Fantasy': '奇幻',
				'Horror': '恐怖',
				'Mystery': '悬疑',
				'Romance': '爱情',
				'Sci-Fi': '科幻',
				'Slice of Life': '日常',
				'Sports': '运动',
				'Supernatural': '超自然',
				'Thriller': '惊悚',
				'Psychological': '心理',
				'Mecha': '机甲',
				'Music': '音乐',
				'Ecchi': 'エッチ',
				'Harem': '后宫',
				'Demons': '恶魔',
				'Historical': '历史',
				'Military': '军事',
				'Samurai': '武士',
				'School': '校园',
				'Shoujo': '少女',
				'Shounen': '少年',
				'Space': '太空',
				'Vampire': '吸血鬼',
				'Martial Arts': '武术',
				'Police': '警察',
				'Super Power': '超能力',
				'Magic': '魔法',
				'Parody': ' parody',
				'Cars': '赛车',
				'Game': '游戏',
				'Josei': '女性',
				'Seinen': '青年',
				'Kids': '儿童'
			}
		};
	},
	methods: {
		// 触发文件选择
		triggerFileInput() {
			this.$refs.fileInput.click();
		},

		// 处理文件选择
		handleFileChange(e) {
			const file = e.target.files[0];
			if (file) {
				this.previewImage(file);
			}
		},

		// 处理拖放
		handleDrop(e) {
			this.dragover = false;
			const file = e.dataTransfer.files[0];
			if (file && file.type.startsWith('image/')) {
				this.previewImage(file);
			}
		},

		// 预览图片
		previewImage(file) {
			this.imageFile = file;
			this.imagePreview = URL.createObjectURL(file);
			this.animeInfo = null;
		},

		// 识别动漫
		async recognizeAnime() {
			if (!this.imageFile) return;

			this.isRecognizing = true;

			try {
				const formData = new FormData();
				formData.append('image', this.imageFile);

				// 1. 调用Trace.moe API识别图片
				const traceResponse = await axios.post(
						'https://api.trace.moe/search?cutBorders',
						formData,
						{headers: {'Content-Type': 'multipart/form-data'}}
				);

				// 只取第一个匹配结果
				const bestMatch = traceResponse.data.result[0];
				if (!bestMatch) {
					this.$message.error('未识别到动漫信息！');
					return ;
				}

				// 2. 调用AniList API获取详细信息
				const animeDetails = await this.fetchAnimeDetails(bestMatch.anilist);

				// 处理返回数据
				this.animeInfo = {
					id: animeDetails.id,
					title: animeDetails.title.native || animeDetails.title.userPreferred || animeDetails.title.romaji || animeDetails.title.english,
					coverImage: animeDetails.coverImage.large,
					format: this.formatMediaType(animeDetails.format),
					episodes: animeDetails.episodes || '未知',
					status: this.formatStatus(animeDetails.status),
					averageScore: animeDetails.averageScore || '无',
					startDate: this.formatDate(animeDetails.startDate),
					genres: animeDetails.genres || []
				};

			} catch (err) {
				this.$message.error('识别失败，请重试！');
			} finally {
				this.isRecognizing = false;
			}
		},

		// 获取动漫详情
		async fetchAnimeDetails(anilistId) {
			this.isLoading = true;

			try {
				// AniList GraphQL查询
				const query = `
          query ($id: Int) {
            Media(id: $id, type: ANIME) {
              id
              title {
                romaji
                english
                native
                userPreferred
              }
              coverImage {
								large
              }
              format
              episodes
              status
              averageScore
              startDate {
                year
                month
                day
              }
              genres
            }
          }
        `;

				const response = await axios.post('https://graphql.anilist.co', {
					query,
					variables: {id: anilistId}
				});

				return response.data.data.Media;
			} catch (err) {
				this.$message.error('获取动漫详情失败！');
			} finally {
				this.isLoading = false;
			}
		},

		// 格式化媒体类型
		formatMediaType(type) {
			const types = {
				'TV': 'TV动画',
				'TV_SHORT': '短篇TV动画',
				'MOVIE': '动画电影',
				'SPECIAL': '特别篇',
				'OVA': 'OVA',
				'ONA': '网络动画',
				'MUSIC': '音乐视频'
			};
			return types[type] || type;
		},

		// 格式化状态
		formatStatus(status) {
			const statusMap = {
				'FINISHED': '已完结',
				'RELEASING': '连载中',
				'NOT_YET_RELEASED': '未播出',
				'CANCELLED': '已取消',
				'HIATUS': '暂停'
			};
			return statusMap[status] || status;
		},

		// 格式化日期
		formatDate(dateObj) {
			if (!dateObj.year) return '未知';
			return `${dateObj.year}年${dateObj.month || '?'}月${dateObj.day || '?'}日`;
		},

		// 翻译类型
		translateGenre(genre) {
			return this.genreTranslations[genre] || genre;
		},
	}
};
</script>

<style scoped lang="scss">
@import '@/style/common';
.ai-search {
	max-width: 768px;
	margin: 0 auto;
	margin-top: 1rem;

	.upload-section {
		text-align: center;

		.upload-area {
			border: 2px dashed #ccc;
			border-radius: 8px;
			padding: 10px;
			text-align: center;
			cursor: pointer;
			transition: all 0.3s;
			margin-bottom: 15px;

			@media screen and (max-width: 768px) {
				padding: 5px;
			}

			&.dragover {
				border-color: #3498db;
				background-color: #f0f7ff;
			}

			.upload-prompt {
				color: #7f8c8d;

				.upload-icon {
					font-size: 48px;
					margin-bottom: 10px;
				}
			}

			.preview-image {
				max-width: 100%;
				max-height: 300px;
				border-radius: 4px;
			}
		}

		.recognize-btn {
			padding: 10px 20px;
			background-color: #3498db;
			color: white;
			border: none;
			border-radius: 4px;
			cursor: pointer;
			font-size: 16px;
			transition: background-color 0.2s;

			&:hover:not(:disabled) {
				background-color: #2980b9;
			}

			&:disabled {
				background-color: #bdc3c7;
				cursor: not-allowed;
			}
		}
	}

	.anime {
		@include box-style;
		margin-top: 15px;
		display: flex;
		gap: 15px;

		.cover {
			width: 180px;
			overflow: hidden;
			border-radius: 15px;
			flex-shrink: 0;
			align-self: center;

			@media screen and (max-width: 768px) {
				width: 120px;
			}

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				display: block;
			}
		}

		.info {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 15px;

			.genres {
				display: flex;
				flex-wrap: wrap;
				gap: 8px;

				.genre-tag {
					background-color: #eae7ff;
					color: #2b0aff;
					padding: 4px 10px;
					border-radius: 20px;
					font-size: 14px;
				}
			}

			.info-section {
				display: flex;
				flex-direction: column;
				gap: 15px;

				p {
					margin: 0;
					padding: 0;
				}
			}
		}
	}
}
</style>