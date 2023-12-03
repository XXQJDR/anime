<template>
	<div class="test">
		<el-upload
				ref="upload"
				class="upload"
				action="/upload"
				multiple
				:limit="3"
				:on-exceed="handleOnExceed"
				:auto-upload="false"
				:before-upload="handleBeforeUpload"
				:on-change="handleOnChange"
		>
			<el-button type="primary" slot="trigger">选择文件</el-button>
			<el-button @click="manualUpload" type="success">上传到服务器</el-button>
			<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
		</el-upload>
	</div>
</template>

<script>
export default {
	name: 'TestName',
	methods: {
		//手动触发文件上传
		manualUpload() {
			console.log(this.$refs.upload.uploadFiles);
		},

		handleOnExceed() {
			this.$message.error('文件选择过多！');
		},

		handleBeforeUpload() {
			console.log('校验');
		},

		handleOnChange(file, fileList) {
			console.log(file);
			console.log(fileList);
		}
	}
}
</script>

<style scoped>
</style>