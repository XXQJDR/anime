import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import VueLazyLoad from 'vue-lazyload';
import '@/icons';

import {
	Backtop,
	Popover,
	Tooltip,
	Message,
	Loading,
	Rate,
	Icon,
	Select,
	Option,
	Divider,
	Input,
	Button,
	Upload,
	Empty,
	Skeleton,
	SkeletonItem,
	Dialog,
	MessageBox,
	Image,
	Form,
	FormItem,
	Steps,
	Step,
	Result,
} from 'element-ui';

Vue.use(Backtop);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Loading.directive);
Vue.use(Rate);
Vue.use(Icon);
Vue.use(Select);
Vue.use(Option);
Vue.use(Divider);
Vue.use(Input);
Vue.use(Button);
Vue.use(Upload);
Vue.use(Empty);
Vue.use(Skeleton);
Vue.use(SkeletonItem);
Vue.use(Dialog);
Vue.use(Image);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Result);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.config.productionTip = false;
Vue.use(VueLazyLoad, {
	error: require('@/assets/images/error/image-load-error.webp'),
	loading: require('@/assets/images/loading/image-loading.gif'),
	attempt: 1,
	preLoad: 1.3
});

new Vue({
	render: h => h(App),
	router,
	store,
}).$mount('#app')
