const routes = [
  {
    path: '/',
    component: () => import('src/components/LoginVue.vue'),

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/login',
    component: () => import('src/components/LoginVue.vue'), // Change le composant ici
  },
  {
    path: '/dashboard',
    component: () => import('src/components/DashboardVue.vue'), // Change le composant ici
  },
  {
    path: '/manages',
    component: () => import('src/components/ManagesVue.vue'), // Change le composant ici
  },
  {
    path: '/entretiens',
    component: () => import('src/components/EntretiensVue.vue'), // Change le composant ici
  },

  {
    path: '/navbar',
    component: () => import('src/components/NavbarVue.vue'),
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  }
]

export default routes
