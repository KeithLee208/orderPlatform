import Vue from 'vue'
import Router from 'vue-router'

import template from '../views/scheduling/template'
import templatesetting from '../views/scheduling/templatesetting'
import attendacncelist from '../views/scheduling/attendacncelist'

import count from '../views/count/index'
import RegistrationClassification from '../views/count/RegistrationClassification'
import ReservationRegistration from '../views/count/ReservationRegistration'
import setting from '../views/setting/index'

const scheduling = r => require.ensure([], () => r(require('../views/scheduling/index')), 'scheduling');
const attendacnce = r => require.ensure([], () => r(require('../views/scheduling/attendance')), 'scheduling');

const order = r => require.ensure([], () => r(require('../views/order/index')), 'order');

Vue.use(Router)

export default new Router({
  linkActiveClass: 'nav-active',
  routes: [
    {
      path: '/order',
      name: 'order',
      component: order
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
        { path: '/scheduling/attendacnce', component: attendacnce},
        { path: '/scheduling/template', component: template},
        { path: '/scheduling/templatesetting', component: templatesetting},
        { path: '/scheduling/attendacncelist', component: attendacncelist}
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
