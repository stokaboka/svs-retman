
const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'about', component: () => import('pages/AboutServicePage.vue') },
      { path: 'beginners', component: () => import('pages/BeginnersPage.vue') }
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
