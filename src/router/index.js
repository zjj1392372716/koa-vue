import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Register from '@/components/register/register'
import Login from '@/components/login/login'
import GoodsInfo from '@/components/goodInfo/goodInfo'
import Category from '@/components/category/category'
import Main from '@/components/main/main'
import Cart from '@/components/shoppingCart/shoppingCart'
import Me from '@/components/me/me'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/Main',
    component: Main,
    children: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Category',
      name: 'Category',
      component: Category
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/goodsInfo',
    name: 'goodsInfo',
    component: GoodsInfo
  }
  ]
})
