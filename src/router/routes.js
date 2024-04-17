const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('src/components/LoginVue.vue')
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/components/DashboardVue.vue') },
      { path: '/entretiens', component: () => import('src/components/EntretiensVue.vue') },
      { path: '/listes', component: () => import('src/components/ListeVue.vue') },
      // Autres routes enfants du dashboard
    ]
  },
  // Cette route attrape toutes les URL qui ne correspondent à aucune des routes ci-dessus
  { path: '/:catchAll(.*)*', redirect: '/login' }
]

export default routes