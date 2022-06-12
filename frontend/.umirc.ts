import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: { type: 'hash' },
  dynamicImport: {
    loading: '@/Loading',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      routes: [
        { path: '/', component: '@/pages/home' },
        { path: '/account', component: '@/pages/account' },
        { path: '/detail', component: '@/pages/detail' },
        { path: '/create', component: '@/pages/create' },
        { path: '/task', component: '@/pages/task' },
        { path: '/profile', component: '@/pages/profile' },
        { path: '/market', component: '@/pages/market' },
      ],
    },
  ],
  fastRefresh: {},
});
