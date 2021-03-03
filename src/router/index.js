import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login/login'
import home from '../components/home/home'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component: login
  },
  {
    path:'/home',
    component: home
  }
]

const router = new VueRouter({
  routes
})

//挂在路由导航守卫
router.beforeEach((to,from,next)=>{
  //to跳转到  from从哪跳转来 next是一个函数  next()放行  next('/home')强制跳转
  if(to.path === '/login') return next();
  //获取token值
  const tokenstr = window.sessionStorage.getItem('token')
  if(!tokenstr) return next('/login')
  next()
})


export default router
