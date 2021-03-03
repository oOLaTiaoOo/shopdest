import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'


Vue.use(ElementUI);
Vue.config.productionTip = false

//配置请求的根路径
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
