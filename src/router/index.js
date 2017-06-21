import Vue from 'vue'
import Router from 'vue-router'
import scheduling from '../views/scheduling/index'
import attendacnce from '../views/scheduling/attendance'
import template from '../views/scheduling/template'


Vue.use(Router)

export default new Router({
  linkActiveClass: 'nav-active',
  routes: [
    {
      path: '/',
      name: 'scheduling',
      component: scheduling
    },
    {
      path: '/scheduling',
      name: 'scheduling',
      component: scheduling,
      children:[
        { path: '/scheduling/attendacnce', component: attendacnce},
        { path: '/scheduling/template', component: template}
      ]
    },
  ]
})
