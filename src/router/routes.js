import store from '../store'

const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/about/AboutServicePage.vue') },
      { path: 'about', name: 'about', component: () => import('pages/about/AboutServicePage.vue') },
      { path: 'beginners', name: 'beginners', component: () => import('pages/beginners/BeginnersPage.vue') },
      { path: 'editor',
        name: 'editor',
        component: () => import('layouts/Editor.vue'),
        children: [
          { path: 'dictionary', name: 'editor-dictionary', component: () => import('pages/editor/DictionaryEditor.vue') },
          { path: 'steps', name: 'editor-steps', component: () => import('pages/Error404.vue') },
          { path: 'phases', name: 'editor-phases', component: () => import('pages/Error404.vue') },
          { path: 'stages', name: 'editor-stages', component: () => import('pages/Error404.vue') },
          { path: 'results', name: 'admin-results', component: () => import('pages/Error404.vue') }
        ]
      },
      { path: 'auth',
        name: 'auth',
        component: () => import('layouts/Auth.vue'),
        async beforeEnter (to, from, next) {
          if (to.name === 'auth-signout') {
            await store.dispatch('auth/signout')
            next({name: 'home'})
          } else {
            next()
          }
        },
        children: [
          {path: 'signin', name: 'auth-signin', component: () => import('pages/auth/SignIn.vue')},
          {path: 'register', name: 'auth-register', component: () => import('pages/auth/Register.vue')},
          {path: 'signout', name: 'auth-signout'}
        ]
      }
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
