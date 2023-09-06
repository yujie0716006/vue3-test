import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'

const app = createApp(App);

app.use(router);

// element-plus完整引入
/* import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus) */

app.mount('#app')
// console.log('app', app.config);

// 给vue根实例app上注册一个全局的属性
app.config.globalProperties.weather = '天气好热';