import MessagesService from './MessagesService'
import { messageStore, createEmptyMessage } from '../models/MessageModel'

export default {
  async listMessages() {
    try {
      return await MessagesService.list()
    } catch (error) {
      console.error('Erro ao listar mensagens:', error)
      throw error
    }
  },

  async filterMessages(filters) {
    try {
      return await MessagesService.list(filters)
    } catch (error) {
      console.error('Erro ao filtrar mensagens:', error)
      throw error
    }
  },
  
  async getById(id) {
    try {
      return await MessagesService.getById(id)
    } catch (error) {
      console.error('Erro ao obter mensagem:', error)
      throw error
    }
  },

  // async updateMessage(id, message) {
  //   try {
  //     return await MessagesService.update(message)
  //   } catch (error) {
  //     console.error('Erro ao atualizar mensagem:', error)
  //     throw error
  //   }
  // },

  async saveMessage(message) {
    try {
      return await MessagesService.saveMessage(message)
    } catch (error) {
      console.error('Erro ao criar mensagem:', error)
      throw error
    }
  },

  async loadMessages(customFilters = {}) {
    try {
      messageStore.setLoading(true)
      messageStore.setError(null)
      
      const params = {
        page: messageStore.page.value,
        limit: messageStore.limit.value,
        ...messageStore.filters,
        ...customFilters
      }
      
      const result = await MessagesService.list(params)
      messageStore.updateList(result.data, result.total)
      return result
    } catch (error) {
      messageStore.setError(`Erro ao carregar mensagens: ${error.message}`)
      console.error('Erro ao carregar mensagens:', error)
      throw error
    } finally {
      messageStore.setLoading(false)
    }
  },
  
  async loadOptions() {
    try {
      return await MessagesService.options()
    } catch (error) {
      console.error('Erro ao carregar opções:', error)
      throw error
    }
  },
  
  async saveMessage(message) {
    try {
      messageStore.setLoading(true)
      messageStore.setError(null)
      
      const savedMessage = await MessagesService.saveMessage(message)
      
      messageStore.addMessage(savedMessage)
      
      return savedMessage
    } catch (error) {
      messageStore.setError(`Erro ao salvar mensagem: ${error.message}`)
      console.error('Erro ao salvar mensagem:', error)
      throw error
    } finally {
      messageStore.setLoading(false)
    }
  },
  
  async deleteMessage(id) {
    try {
      messageStore.setLoading(true)
      messageStore.setError(null)
      
      await MessagesService.delete(id)
      messageStore.removeMessage(id)
      
      return { success: true }
    } catch (error) {
      messageStore.setError(`Erro ao excluir mensagem: ${error.message}`)
      console.error('Erro ao excluir mensagem:', error)
      throw error
    } finally {
      messageStore.setLoading(false)
    }
  },
  
  createNewMessage() {
    return createEmptyMessage()
  },
  
  getStore() {
    return messageStore
  }
}