
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'disclaimer', component: () => import('pages/Disclaimer.vue') },
      { path: 'options', component: () => import('pages/Options.vue') },
      { path: 'simulation', component: () => import('pages/Simulation.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
