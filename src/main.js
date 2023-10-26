import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
	render: h => h(App),
	router,
	//安装全局事件总线
	beforeCreate() {
		Vue.prototype.$bus = this;
	}
}).$mount('#app')
