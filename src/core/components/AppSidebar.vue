<template>
  <div class="sidebar">
    <ul class="sidebar-menu">
      <li 
        v-for="item in menuItems" 
        :key="item.route"
        :class="{ active: isActive(item.route) }"
        @click="navigateTo(item.route)"
      >
        <i :class="`bi bi-${item.icon}`"></i> {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'AppSidebar',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const menuItems = [
      { 
        label: 'Dashboard', 
        icon: 'speedometer2', 
        route: '/dashboard'
      },
      { 
        label: 'Mensagens em Massa', 
        icon: 'chat-dots', 
        route: '/mensagens'
      },
    ]
    
    const navigateTo = (path) => {
      router.push(path)
    }
    
    const isActive = (path) => {
      return route.path === path
    }
    
    return {
      menuItems,
      navigateTo,
      isActive
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #FDF6F0;
  border-right: 1px solid #e0e0e0;
  padding: 1.5rem 0;
  min-height: calc(100vh - 56px);
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  padding: 0.8rem 1.5rem;
  display: flex;
  align-items: center;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sidebar-menu li i {
  margin-right: 10px;
  font-size: 1.2rem;
}

.sidebar-menu li:hover {
  background-color: rgba(11, 53, 79, 0.1);
  color: #0b354f;
}

.sidebar-menu li.active {
  background-color: rgba(11, 53, 79, 0.15);
  color: #0b354f;
  font-weight: 500;
  border-left: 4px solid #0b354f;
}

/* Responsividade */
@media (max-width: 992px) {
  .sidebar {
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 0.5rem 0;
  }
  
  .sidebar-menu {
    display: flex;
    overflow-x: auto;
  }
  
  .sidebar-menu li {
    padding: 0.8rem 1rem;
    white-space: nowrap;
  }
  
  .sidebar-menu li.active {
    border-left: none;
    border-bottom: 2px solid #0b354f;
  }
}
</style> 