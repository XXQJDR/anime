const {defineConfig} = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false, // 关闭 ESLint 检查
	devServer: {
		//更改项目占用端口
		port: 80,

		//解决跨域问题
		proxy: {
			'/api': {
				target: 'http://localhost:8080'
			}
		}
	},
	chainWebpack(config) {
		//设置svg
		config.module
				.rule('svg')
				.exclude.add(resolve('src/icons'))
				.end()
		config.module
				.rule('icons')
				.test(/\.svg$/)
				.include.add(resolve('src/icons'))
				.end()
				.use('svg-sprite-loader')
				.loader('svg-sprite-loader')
				.options({
					symbolId: 'icon-[name]'
				})
				.end()
	}
})
