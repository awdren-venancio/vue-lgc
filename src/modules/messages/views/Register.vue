<template>
  <app-layout>
    <div class="messages-register">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>{{ id ? 'Editar Mensagem' : 'Nova Mensagem' }}</h1>
        <div class="actions">
          <b-button variant="secondary" :to="{ name: 'mensagens' }" class="me-2">
            <i class="bi bi-arrow-left"></i> Voltar à Lista
          </b-button>
          <b-button variant="primary" @click="save" :disabled="saving">
            <i class="bi bi-save"></i> {{ labelBtnSave }}
          </b-button>
        </div>
      </div>

      <b-overlay :show="loading" rounded="sm">
        <b-card v-if="!loading">
          <b-form @submit.prevent="save">
            <b-row>
              <b-col md="6">
                <b-form-group label="Título *" label-for="title">
                  <b-form-input
                    id="title"
                    v-model="message.title"
                    required
                    placeholder="Digite o título da mensagem"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group label="Conteúdo da Mensagem *" label-for="content">
              <div class="mb-2 variables-buttons">
                <b-button variant="outline-secondary" size="sm" class="me-1" @click="insertVariable('name')">
                  <i class="bi bi-person"></i> {proprietario}
                </b-button>
                <b-button variant="outline-secondary" size="sm" class="me-1" @click="insertVariable('company')">
                  <i class="bi bi-building"></i> {nome_empresa}
                </b-button>
                <b-button variant="outline-secondary" size="sm" @click="insertVariable('city')">
                  <i class="bi bi-geo-alt"></i> {endereco_empresa}
                </b-button>
              </div>
              <b-form-textarea
                id="content"
                v-model="message.content"
                rows="10"
                required
                placeholder="Digite o conteúdo da mensagem"
              ></b-form-textarea>
            </b-form-group>

            <b-card class="mt-4" header="Programação">
              <b-form-group label="Tipo de Envio">
                <b-form-radio-group
                  v-model="message.scheduling.type"
                  :options="[
                    { text: 'Imediato', value: 'immediate' },
                    { text: 'Agendado', value: 'scheduled' },
                  ]"
                  stacked
                ></b-form-radio-group>
              </b-form-group>

              <b-row v-if="message.scheduling.type === 'scheduled'">
                <b-col md="3">
                  <b-form-group label="Data e Hora de Envio">
                    <b-form-input 
                      type="date" 
                      v-model="message.scheduling.dateTime" 
                      class="mb-2">
                    </b-form-input>
                    <b-form-input type="time" v-model="message.scheduling.sendTime"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>
          </b-form>
        </b-card>
      </b-overlay>
    </div>
  </app-layout>
</template>

<script>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MessagesController } from '@/modules/messages/index'
import { AppLayout } from '@/core/components'

export default {
  name: 'MessagesRegister',
  components: {
    AppLayout
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const id = computed(() => route.params.id)
    
    const loading = ref(false)
    const saving = ref(false)
    
    const message = reactive({
      title: '',
      content: '',
      scheduling: {
        type: 'immediate',
        dateTime: null,
      },
    })
    
    const insertVariable = (variable) => {
      const textarea = document.getElementById('content')
      const cursorPos = textarea.selectionStart
      const textBefore = message.content.substring(0, cursorPos)
      const textAfter = message.content.substring(cursorPos)
      
      message.content = textBefore + `{${variable}}` + textAfter
      
      setTimeout(() => {
        textarea.focus()
        const newPosition = cursorPos + variable.length + 2
        textarea.setSelectionRange(newPosition, newPosition)
      }, 0)
    }
    
    const loadMessage = async (id) => {
      loading.value = true
      try {
        const messageLoaded = await MessagesController.getById(id)
        
        Object.assign(message, messageLoaded)
      } catch (error) {
        console.error('Error loading message:', error)
      } finally {
        loading.value = false
      }
    }
    
    const validateForm = () => {
      if (!message.title) {
        alert('Por favor, preencha o título da mensagem.')
        return false
      }
      
      if (!message.content) {
        alert('Por favor, preencha o conteúdo da mensagem.')
        return false
      }
      
      if (message.scheduling.type === 'scheduled' && !message.scheduling.dateTime) {
        alert('Por favor, defina a data e hora de envio da mensagem.')
        return false
      }
      
      return true
    }
    
    const save = async () => {
      if (!validateForm()) {
        return
      }
      
      saving.value = true
      try {
        await MessagesController.saveMessage(message)
        router.push({ name: 'mensagens' })
      } catch (error) {
        console.error('Erro ao salvar mensagem:', error)
        alert('Erro ao salvar a mensagem. Por favor, tente novamente.')
      } finally {
        saving.value = false
      }
    }
    
    onMounted(async () => {
      if (id.value) {
        await loadMessage(id.value)
      }
    })
    
    const labelBtnSave = computed(() => {
      return message.scheduling.type === 'scheduled' ? 'Salvar Agendamento' : 'Salvar e Enviar'
    })
    
    return {
      id,
      loading,
      saving,
      message,
      insertVariable,
      save,
      labelBtnSave,
    }
  }
}
</script>

<style>
.messages-register {
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 10px;
}

.variables-buttons {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style> 