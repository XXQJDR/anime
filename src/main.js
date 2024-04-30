import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store';
import VueLazyLoad from 'vue-lazyload';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueLazyLoad, {
	error: require('@/assets/error/default.webp'),
	loading: require('@/assets/loading/default.gif'),
	attempt: 1,
	preLoad: 1.3
});

new Vue({
	render: h => h(App),
	router,
	store,
}).$mount('#app')

console.log(process.env);
