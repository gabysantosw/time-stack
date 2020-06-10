import Vue from 'vue';
import VueRouter from 'vue-router';
import Plan from '../views/Plan.vue';
import Actions from '../views/Actions.vue';
import AddAction from '../views/AddAction.vue';
import EditAction from '../views/EditAction.vue';
import Start from '../views/Start.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/stack' },
  {
    path: '/stack',
    name: 'Plan',
    component: Plan
  },
  {
    path: '/actions',
    name: 'Actions',
    component: Actions,
    children: [
      {
        path: '/actions/add',
        name: 'AddAction',
        component: AddAction
      },
      {
        path: '/actions/:id',
        name: 'EditAction',
        component: EditAction
      }
    ]
  },
  {
    path: '/start',
    name: 'Start',
    component: Start
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'route--active',
  linkExactActiveClass: ''
});

export default router;
