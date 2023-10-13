import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import Vuerify from 'vuerify'

Vue.use(Vuerify)
Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	router
}).$mount('#app')
