import Vue from 'vue'
import Router from 'vue-router'
import scheduling from '../views/scheduling/index'
import order from '../views/order/index'
import attendacnce from '../views/scheduling/attendance'
import template from '../views/scheduling/template'
import count from '../views/count/index'
import RegistrationClassification from '../views/count/RegistrationClassification'
import ReservationRegistration from '../views/count/ReservationRegistration'
import setting from '../views/setting/index'




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
      path: '/order',
      name: 'order',
      component: order
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
    {
      path: '/count',
      name: 'count',
      component: count,
      children:[
        { path: '/count/ReservationRegistration', component: ReservationRegistration},
        { path: '/count/RegistrationClassification', component: RegistrationClassification}
      ]
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting,

    }
  ]
})
