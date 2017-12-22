import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Login from '../view/login.vue';
// root 
import dashboard from '../view/dashboard.vue';
// Caller...
import callerMain from '../view/caller_main.vue';
import callerRecords from '../view/caller/records.vue';
import callerSettings from '../view/caller/settings.vue';
// Messages...
import messagesMain from '../view/messages_main.vue';
import messagesIndex from '../view/messages/index.vue';

// expose routes array to generate main sidebar and secondary sidebar...
const routesArr = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    title: '地产后台',
    children: [
      {
        path: 'caller',
        component: callerMain,
        name: 'caller',
        title: 'Caller客中心',
        meta: {
          start_path: '/dashboard/caller/records',
          icon: 'el-icon-menu'
        },
        children: [
          {
            path: 'records',
            name: 'caller_records',
            component: callerRecords,
            title: '记录',
            meta: {
              parent_name: 'caller',
              full_path: '/dashboard/caller/records'
            }
          },
          {
            path: 'settings',
            name: 'caller_settings',
            component: callerSettings,
            title: '设置',
            meta: {
              parent_name: 'caller',
              full_path: '/dashboard/caller/settings'
            }
          },
        ] 
      },
      {
        path: 'messages',
        name: 'messages',
        component: messagesMain,
        title: '消息中心',
        meta: {
          start_path: '/dashboard/messages/index',
          icon: 'el-icon-setting'
        },
        children: [
          {
            path: 'index',
            name: 'messages_index',
            component: messagesIndex,
            title: '消息首页',
            meta: {
              parent_name: 'messages',
              full_path: '/dashboard/messages/index'
            }
          },
        ]
      },  
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    title: '登录'
  }
]
const router = new Router({
  routes: routesArr
})
export { routesArr, router }
