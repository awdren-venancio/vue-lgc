// Exportando componentes do módulo de login
import LoginView from './views/LoginView.vue'

export {
  LoginView
}

export default {
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    }
  ]
} 