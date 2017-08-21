import Vue from 'vue'
import Router from 'vue-router'
import ccard from '../views/scheduling/clinic/tpcard'
import cworklist from '../views/scheduling/clinic/worklist'
import cworktable from '../views/scheduling/clinic/worktable'
import ctptable from '../views/scheduling/clinic/tptable.vue'
import ctplist from '../views/scheduling/clinic/tplist.vue'
import dcard from '../views/scheduling/department/tpcard'
import attendacncelist from '../views/scheduling/Medical/attendacncelist'
import count from '../views/count/index'
import RegistrationClassification from '../views/count/registrationclassification'
import ReservationRegistration from '../views/count/reservationregistration'
import setting from '../views/setting/index'
import timetable from '../views/scheduling/clinic/timetable'
import tpset from '../views/scheduling/clinic/tpset'
import sortcostset from '../views/scheduling/clinic/sortcostset'
import orderdetail from '../views/order/orderdetail'
import orderlist from '../views/order/orderlist'


/**
 * Created by sven on 2017/8/21.
 */
import dTemplateList from 'views/scheduling/department/templatelist'
const scheduling = r => require.ensure([], () => r(require('../views/scheduling/index')), 'scheduling');
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
      path: '/order/orderdetail',
      name: 'orderdetail',
      component: orderdetail
    },
    {
      path: '/order/orderlist',
      name: 'orderlist',
      component: orderlist
    },
    {
      path: '/scheduling',
      name: 'scheduling',
      component: scheduling,
      children:[
        { path: '/scheduling/department/timetable', component: timetable},
        { path: '/scheduling/department/tpcard', component: dcard},
        { path: '/scheduling/attendacncelist', component: attendacncelist},
        { path: '/scheduling/clinic/worklist', component: cworklist},
        { path: '/scheduling/clinic/timetable', component: timetable},
        { path: '/scheduling/clinic/tpcard', component: ccard},
        { path: '/scheduling/clinic/tptable', component: ctptable},
        { path: '/scheduling/clinic/tplist', component: ctplist},
        { path: '/scheduling/clinic/tpset', component: tpset},
        { path: '/scheduling/clinic/sortcostset', component: sortcostset},

        {path:'/scheduling/department/templateList',component: dTemplateList}
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
