<template>
  <div class="dashboard-container">
    <!-- Navbar superior -->
    <app-navbar />

    <div class="dashboard-content">
      <!-- Sidebar -->
      <app-sidebar />

      <!-- Conteúdo principal -->
      <div class="main-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavbar from './AppNavbar.vue'
import AppSidebar from './AppSidebar.vue'

export default {
  name: 'AppLayout',
  components: {
    AppNavbar,
    AppSidebar
  }
}
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard-content {
  display: flex;
  flex: 1;
}

.main-content {
  flex: 1;
  padding: 2rem;
  background-color: #f8f9fa;
  overflow-y: auto;
}

/* Responsividade */
@media (max-width: 992px) {
  .dashboard-content {
    flex-direction: column;
  }
}
</style> 