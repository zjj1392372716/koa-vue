// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/reset.css'
import './common/font.css'
import { Row, Col, Button, Swipe, SwipeItem, Lazyload, List, NavBar, Tab, Tabs, PullRefresh, Tabbar, TabbarItem, Cell, CellGroup } from 'vant'
// toast
import './public/toast/index.css'
import Toast from './public/toast/index'
import Tips from './public/tip/index'
// loading
import './public/loading/loading.css'
import Loading from './public/loading/loading'
Vue.use(Toast)
Vue.use(Loading)
Vue.use(Tips)
Vue.use(Row).use(Col).use(Button).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(NavBar).use(Tab).use(Tabs).use(PullRefresh).use(Tabbar).use(TabbarItem).use(Cell).use(CellGroup)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
