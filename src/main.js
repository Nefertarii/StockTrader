// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from "./store.js"

import { Button, Message } from 'ant-design-vue';
import { Spin, Icon } from 'ant-design-vue';
import { Alert} from 'ant-design-vue';

Vue.use(Button);
Vue.use(Spin);
Vue.use(Icon);
Vue.use(Alert);
Vue.prototype.$message = Message;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App, },
    template: '<App/>'
})

