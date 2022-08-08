module.exports = {
  devServer: {
    // 代理跨域的配置
    proxy: {
      '/service': {
        target: 'http://47.108.191.22', // 跨域请求的地址
        changeOrigin: true // 只有这个值为true的情况下 才表示开启跨域
      }
    }
    // before: require('./mock/mock-server.js')
  },
  chainWebpack: config => {
    // 改入口文件
    // 生产阶段入口文件
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main.js')

      // 使用externals设置排除项
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress'
      })

      // 使用插件 htmlWebpackPlugin
      config.plugin('html').tap(args => {
        // 添加参数isProd
        args[0].isProd = true
        return args
      })
    })
    // 开发阶段入口文件
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main.js')

      // 使用插件
      config.plugin('html').tap(args => {
        // 添加参数isProd
        args[0].isProd = false
        return args
      })
    })
  }
}
