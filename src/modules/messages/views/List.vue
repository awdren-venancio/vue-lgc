<template>
  <app-layout>
    <div class="messages-list">
      <div class="page-header d-flex justify-content-between align-items-center mb-4">
        <h1>Mensagens</h1>
        <b-button variant="primary" :to="{ name: 'mensagens-cadastro' }">
          <i class="bi bi-plus-lg me-2"></i> Nova Mensagem
        </b-button>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <div class="filters row">
            <div class="col-md-6 mb-3 mt-3">
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-search"></i></span>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Pesquisar mensagens..." 
                  v-model="filters.term"
                  @input="debounceFilter"
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Carregando...</span>
        </div>
        <p class="mt-2">Carregando mensagens...</p>
      </div>

      <div v-else-if="messages.total === 0" class="alert alert-info text-center my-5">
        <i class="bi bi-info-circle me-2"></i>
        <span v-if="activeFilters">Nenhuma mensagem encontrada com os filtros atuais.</span>
        <span v-else>Nenhuma mensagem cadastrada. Clique em "Nova Mensagem" para criar.</span>
      </div>

      <template v-else>
        <div class="card mb-4">
          <div class="table-responsive">
            <table class="table table-hover table-striped mb-0">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Programação</th>
                  <th>Criada em</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="message in messages.messages" :key="message.id">
                  <td>
                    <div class="d-flex flex-column">
                      {{ message.title }}
                      <small class="text-muted">{{ message.descricao }}</small>
                    </div>
                  </td>
                  <td>
                    <span v-if="message.schedule_type === 'immediate'">
                      <i class="bi bi-lightning-fill text-warning me-1"></i> Enviado
                    </span>
                    <span v-else-if="message.schedule_type === 'scheduled'">
                      <i class="bi bi-calendar-event text-info me-1"></i> 
                      {{ formatDate(message.schedule_datetime) }}
                    </span>
                  </td>
                  <td>
                    {{ formatDate(message.created_at) }}
                  </td>
                  <td v-if="message.id > 0">
                    <div class="btn-group">
                      <b-button 
                        :to="{ name: 'mensagens-editar', params: { id: message.id } }" 
                        size="sm" 
                        variant="outline-primary"
                        title="Editar mensagem"
                      >
                        <i class="bi bi-pencil"></i>
                      </b-button>
                      <b-button 
                        size="sm" 
                        variant="outline-danger" 
                        @click="confirmDelete(message)"
                        title="Excluir mensagem"
                      >
                        <i class="bi bi-trash"></i>
                      </b-button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <div class="modal fade" id="exclusaoModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirmar Exclusão</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div class="modal-body" v-if="messageToDelete">
              <p>Tem certeza que deseja excluir a mensagem <strong>"{{ messageToDelete.titulo }}"</strong>?</p>
              <p class="text-danger">Esta ação não pode ser desfeita.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button 
                type="button" 
                class="btn btn-danger" 
                @click="deleteMessage"
                :disabled="deleting"
              >
                <span v-if="deleting" class="spinner-border spinner-border-sm me-1" role="status"></span>
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import { MessagesController } from '../index'
import { useToast } from 'vue-toastification'
import { AppLayout } from '@/core/components'

export default {
  name: 'MessagesList',
  components: {
    AppLayout
  },
  setup() {
    const toast = useToast()
    const messages = ref([])
    const loading = ref(true)
    const deleting = ref(false)
    const messageToDelete = ref(null)
    let deleteModal = null
    let debounceTimeout = null

    const filters = reactive({
      term: '',
      status: 'todos'
    })

    const activeFilters = computed(() => {
      console.log(filters.term)
      return filters.term !== ''
    })

    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
        .format(date)
        .replace(',', ' -')
    }

    const loadMessages = async () => {
      loading.value = true
      try {
        messages.value = await MessagesController.listMessages()
      } catch (error) {
        console.error('Erro ao carregar mensagens:', error)
        toast.error('Não foi possível carregar as mensagens. Tente novamente mais tarde.')
      } finally {
        loading.value = false
      }
    }

    const filterMessages = async () => {
      loading.value = true
      try {
        messages.value = await MessagesController.filterMessages(filters)
      } catch (error) {
        console.error('Erro ao filtrar mensagens:', error)
        toast.error('Não foi possível aplicar os filtros. Tente novamente.')
      } finally {
        loading.value = false
      }
    }

    const debounceFilter = () => {
      if (debounceTimeout) clearTimeout(debounceTimeout)
      debounceTimeout = setTimeout(() => {
        filterMessages()
      }, 300)
    }

    const confirmDelete = (message) => {
      messageToDelete.value = message
      deleteModal.show()
    }

    const deleteMessage = async () => {
      if (!messageToDelete.value) return
      
      deleting.value = true
      try {
        await MessagesController.deleteMessage(messageToDelete.value.id)
        deleteModal.hide()
        toast.success('Mensagem excluída com sucesso!')
        loadMessages()
      } catch (error) {
        console.error('Erro ao excluir mensagem:', error)
        toast.error('Não foi possível excluir a mensagem. Tente novamente.')
      } finally {
        deleting.value = false
      }
    }

    onMounted(() => {
      loadMessages()
      deleteModal = new Modal(document.getElementById('exclusaoModal'))
    })

    return {
      messages,
      loading,
      deleting,
      filters,
      activeFilters,
      messageToDelete,
      formatDate,
      filterMessages,
      debounceFilter,
      confirmDelete,
      deleteMessage
    }
  }
}
</script>

<style>
.messages-list {
  margin-bottom: 2rem;
}

.page-header {
  margin-bottom: 1.5rem;
}

.filters {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style> 