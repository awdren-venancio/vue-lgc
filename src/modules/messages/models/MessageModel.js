import { reactive, ref } from 'vue'

export function createEmptyMessage() {
  return reactive({
    id: null,
    titulo: '',
    descricao: '',
    conteudo: '',
    dataEnvio: '',
    horaEnvio: '',
    tipoEnvio: 'unico',
    parametros: {}
  })
}

export class MessageStore {
  constructor() {
    this.messages = ref([])
    this.selectedMessage = ref(null)
    this.loading = ref(false)
    this.error = ref(null)
    this.total = ref(0)
    this.page = ref(1)
    this.limit = ref(10)
    this.filters = reactive({
      term: '',
      startDate: '',
      endDate: '',
      sendType: ''
    })
  }

  selectMessage(message) {
    this.selectedMessage.value = message ? { ...message } : null
  }

  clearSelection() {
    this.selectedMessage.value = null
  }

  updateList(messages, total) {
    this.messages.value = messages
    this.total.value = total || messages.length
  }

  addMessage(message) {
    this.messages.value.unshift(message)
    this.total.value++
  }

  // updateMessage(updatedMessage) {
  //   const index = this.messages.value.findIndex(m => m.id === updatedMessage.id)
  //   if (index !== -1) {
  //     this.messages.value[index] = { ...updatedMessage }
  //   }
  // }

  removeMessage(id) {
    const index = this.messages.value.findIndex(m => m.id === id)
    if (index !== -1) {
      this.messages.value.splice(index, 1)
      this.total.value--
    }
  }

  setLoading(state) {
    this.loading.value = state
  }

  setError(message) {
    this.error.value = message
  }

  updateFilters(filters) {
    Object.assign(this.filters, filters)
  }

  clearFilters() {
    Object.keys(this.filters).forEach(key => {
      this.filters[key] = ''
    })
  }
}

export const messageStore = new MessageStore()