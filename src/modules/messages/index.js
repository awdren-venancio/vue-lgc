import MessagesListView from './views/List.vue'
import MessagesRegisterView from './views/Register.vue'

import MessagesService from './services/MessagesService'
import MessagesController from './services/MessagesController'

import { messageStore, createEmptyMessage } from './models/MessageModel'

export {
  MessagesListView,
  MessagesRegisterView,
  MessagesService,
  MessagesController,
  messageStore,
  createEmptyMessage
}

export default {
  routes: [
    {
      path: '/mensagens',
      name: 'mensagens',
      component: MessagesListView
    },
    {
      path: '/mensagens/cadastro',
      name: 'mensagens-cadastro',
      component: MessagesRegisterView
    },
    {
      path: '/mensagens/editar/:id',
      name: 'mensagens-editar',
      component: MessagesRegisterView
    }
  ]
} 