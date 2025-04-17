import { createRouter, createWebHistory } from 'vue-router'

// Importando módulos
import loginModule from '@/modules/login'
import dashboardModule from '@/modules/dashboard'
import mmessagesModule from '@/modules/messages'

// Criando rotas a partir dos módulos
const routes = [
  ...loginModule.routes,
  ...dashboardModule.routes,
  ...mmessagesModule.routes,
  {
    path: '/about',
    name: 'about',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
