import store from '../store'

const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/about/AboutServicePage.vue') },
      { path: 'about', name: 'about', component: () => import('pages/about/AboutServicePage.vue') },
      { path: 'beginners', name: 'beginners', component: () => import('pages/beginners/BeginnersPage.vue') },
      { path: 'editor/:module',
        name: 'editor',
        component: () => import('pages/editor/Editor.vue'),
        props: true,
        beforeEnter (to, from, next) {
          const isLogged = store.getters['auth/isLogged']
          if (isLogged) {
            next()
          } else {
            next({name: 'home'})
          }
        }
      },
      { path: 'results',
        name: 'results',
        component: () => import('pages/results/Users.vue'),
        beforeEnter (to, from, next) {
          const isLogged = store.getters['auth/isLogged']
          if (isLogged) {
            next()
          } else {
            next({name: 'home'})
          }
        }
      },
      // { path: 'results/:user', name: 'results', component: () => import('pages/results/Results.vue') },
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
