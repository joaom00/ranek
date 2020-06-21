import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "Product" */ '../pages/Home.vue'),
  },
  {
    path: '/produto/:id',
    name: 'Product',
    props: true,
    component: () =>
      import(/* webpackChunkName: "Product" */ '../pages/Product.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../pages/Login.vue'),
  },
  {
    path: '/usuario',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../pages/User/User.vue'),
    children: [
      {
        path: '',
        name: 'User',
        component: () =>
          import(
            /* webpackChunkName: "Login" */ '../pages/User/UserProducts.vue'
          ),
      },
      {
        path: 'compras',
        name: 'Purchases',
        component: () =>
          import(
            /* webpackChunkName: "Login" */ '../pages/User/UserPurchase.vue'
          ),
      },
      {
        path: 'vendas',
        name: 'Sales',
        component: () =>
          import(/* webpackChunkName: "Login" */ '../pages/User/UserSale.vue'),
      },
      {
        path: 'editar',
        name: 'Edit-User',
        component: () =>
          import(/* webpackChunkName: "Login" */ '../pages/User/UserEdit.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  },
});

export default router;
