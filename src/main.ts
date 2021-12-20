import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

// @ts-ignore
import lineClamp from "vue-line-clamp"
import axios from "axios"
import vueAxios from "vue-axios"
import { getModule } from 'vuex-module-decorators'
import DirectoryModule from './store/DirectoryModule'

Vue.config.productionTip = false
Vue.use(lineClamp)
Vue.use(vueAxios, axios)

window.ipc.send('GET_HOME_DIR')

window.ipc.on('GET_HOME_DIR', (payload: any) => {
  getModule(DirectoryModule).setPath(payload.homedir)
  console.log(payload.homedir)
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
