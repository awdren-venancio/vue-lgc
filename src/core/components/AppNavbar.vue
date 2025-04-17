<template>
  <b-navbar toggleable="lg" type="dark" variant="primary" class="custom-navbar">
    <b-navbar-brand href="#">
      <img src="@/assets/img/lgc-logo.png" alt="LGC Consultoria" class="navbar-logo">
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ms-auto" >
        <b-nav-item-dropdown right class="text-white">
          <template #button-content>
            <i class="bi bi-person-circle text-white"></i> <span class="text-white">Usuário</span>
          </template>
          <b-dropdown-item href="#">Perfil</b-dropdown-item>
          <b-dropdown-item href="#">Configurações</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="logout">Sair</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'AppNavbar',
  setup() {
    const router = useRouter()
    
    const logout = () => {
      // Aqui você implementaria a lógica de logout
      router.push('/')
    }
    
    return {
      logout
    }
  }
}
</script>

<style scoped>
.custom-navbar {
  background-color: #0b354f !important;
  padding: 0.5rem 1rem;
}

.navbar-logo {
  height: 40px;
}
</style> 