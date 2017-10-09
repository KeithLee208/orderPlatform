import Vue from 'vue'
import Router from 'vue-router'
import ccard from '../views/scheduling/clinic/tpcard'
import cworklist from '../views/scheduling/clinic/worklist'
import cworktable from '../views/scheduling/clinic/worktable'
import ctptable from '../views/scheduling/clinic/tptable.vue'
import ctplist from '../views/scheduling/clinic/tplist.vue'
// import dcard from '../views/scheduling/department/tpcard'
import attendacncelist from '../views/scheduling/Medical/attendacncelist'
import count from '../views/count/index'
import RegistrationClassification from '../views/count/registrationclassification'
import ReservationRegistration from '../views/count/reservationregistration'
import setting from '../views/setting/index'
import timetable from '../views/scheduling/clinic/timetable'
import tpset from '../views/scheduling/clinic/tpset'
/*科室出班模板*/
import sortcostset from '../views/scheduling/clinic/sortcostset'
import orderdetail from '../views/order/orderdetail'
import orderlist from '../views/order/orderlist'


/**
 * Created by sven on 2017/8/21.
 */
//登录
import login from 'views/login.vue'
//登录默认
import LoginIndex from 'views/index.vue'
// 科室出班模板
import dTemplateList from 'views/scheduling/department/templatelist'//模板列表
import dTemplateTable from 'views/scheduling/department/tptable.vue'//模板详情
import dTempalteSet from 'views/scheduling/department/tpset.vue'//模板设置

//门办出班模板
import hTemplateList from 'views/scheduling/headoffice/templatelist'//模板列表
import hDepartmentlist from 'views/scheduling/headoffice/departmentlist' //科室列表
import hTptable from 'views/scheduling/headoffice/tptable' //列表详情
import hTpset from 'views/scheduling/headoffice/tpset' //单个实体详情
import hSortset from  'views/scheduling/headoffice/sortcostset' //批量设置费用及号序

//科室出班表
import dWorkTable from  'views/scheduling/department/worktable' //批量设置费用及号序
//门办出班表
import hWorkList from  'views/scheduling/headoffice/worklist' //批量设置费用及号序
import hWorkTable from  'views/scheduling/headoffice/worktable' //批量设置费用及号序
import hPlusWork from  'views/scheduling/headoffice/pluswork' //临时出班

const scheduling = r => require.ensure([], () => r(require('views/scheduling/index')), 'scheduling');
const order = r => require.ensure([], () => r(require('views/order/index')), 'order');

Vue.use(Router)

export default new Router({
  linkActiveClass: 'nav-active',
  routes: [
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/',
      name:'LoginIndex',
      component:LoginIndex,
      children:[
        {
          path: '/scheduling',
          name: 'scheduling',
          component: scheduling,
          children:[
            { path: '/scheduling/department/timetable', component: timetable},
            // { path: '/scheduling/department/tpcard', component: dcard},
            { path: '/scheduling/attendacncelist', component: attendacncelist},
            { path: '/scheduling/clinic/worklist', component: cworklist},
            { path: '/scheduling/clinic/timetable', component: timetable},
            { path: '/scheduling/clinic/tpcard', component: ccard},
            { path: '/scheduling/clinic/tptable', component: ctptable},
            { path: '/scheduling/clinic/tplist', component: ctplist},
            { path: '/scheduling/clinic/tpset', component: tpset},
            { path: '/scheduling/clinic/sortcostset', component: sortcostset},
            //科室出班模板
            {path:'/scheduling/department/templateList',component: dTemplateList},
            {path:'/scheduling/department/tptable',component: dTemplateTable},
            {path:'/scheduling/department/tpset',component: dTempalteSet},
            //科室出班表
            {path:'/scheduling/department/worktable',component: dWorkTable},
            //门办出班模板
            {path:'/scheduling/headoffice/templateList',component: hTemplateList},
            {path:'/scheduling/headoffice/departmentlist',component: hDepartmentlist},
            {path:'/scheduling/headoffice/tptable',component: hTptable},
            {path:'/scheduling/headoffice/tpset',component: hTpset},
            {path:'/scheduling/headoffice/sortcostset',component: hSortset},
            //门办出班表
            {path:'/scheduling/headoffice/worklist',component: hWorkList},
            {path:'/scheduling/headoffice/worktable',component: hWorkTable},
            {path:'/scheduling/headoffice/pluswork',component: hPlusWork}
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
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

    },
  ]
})
