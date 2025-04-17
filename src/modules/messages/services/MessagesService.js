import { ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || 'https://webhook.licitacaogc.com.br/webhook/665fd728-8cf6-4388-bd63-381b4f4f920a'

export default {
  list(params = {}) {
    const url = new URL(`${API_URL}/get-messages`)
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key])
      }
    })
    
    return fetch(url, {
      method: 'GET'
    })
      .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao buscar mensagens: ${response.status}`)
      }
      return response.json()
    })
  },

  getById(id) {
    const url = new URL(`${API_URL}/get-message-by-id`)

    return fetch(url, {
      method: 'POST',
      body: id
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro ao buscar mensagem ${id}: ${response.status}`)
        }
        return response.json()
      })
  },

  saveMessage(message) {
    return fetch(`${API_URL}/save-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao criar mensagem: ${response.status}`)
      }
      return response.json()
    })
  },
  
  options() {
    return fetch(`${API_URL}/mensagens/options`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro ao buscar opções: ${response.status}`)
        }
        return response.json()
      })
  },
  
  delete(id) {
    return fetch(`${API_URL}/delete-message`, {
      method: 'DELETE',
      body: id
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao excluir mensagem ${id}: ${response.status}`)
      }
      return response.json()
    })
  }
}