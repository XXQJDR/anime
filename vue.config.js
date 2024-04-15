const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    //更改项目占用端口
    port: 80,

    //解决跨域问题
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      }
    }
  }
})
