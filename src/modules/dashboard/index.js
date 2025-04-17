// Exportando componentes do módulo de dashboard
import DashboardView from './views/DashboardView.vue'

export {
  DashboardView
}

export default {
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    }
  ]
} 