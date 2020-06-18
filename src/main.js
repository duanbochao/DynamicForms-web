// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
Vue.config.productionTip = false
import uploader from 'vue-simple-uploader'
import {postRequest} from './utils/index'
import 'element-ui/lib/theme-chalk/index.css';
import formCreate, {maker} from '@form-create/element-ui'
Vue.use(formCreate)

Vue.prototype.postRequest = postRequest;
Vue.use(ElementUI);
Vue.use(uploader)





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
