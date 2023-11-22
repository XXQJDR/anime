const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    //更改项目占用端口
    port: 80,

    //解决跨域问题
    proxy: 'http://localhost:8080'
    // proxy: 'http://192.168.31.112:8080'
  }
})
