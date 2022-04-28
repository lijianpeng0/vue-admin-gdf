import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入在字体图标css文件
import './assets/fonts/iconfont.css'
import './assets/css/global.css'

// 导入axios
import './filters/index'

// 导入 nprogress
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
