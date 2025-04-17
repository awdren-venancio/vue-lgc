<template>
  <app-layout>
    <h1 class="page-title">Dashboard</h1>
    
    <div class="stats-cards">
      <b-row>
        <b-col lg="3" md="6" sm="12" class="mb-4">
          <b-card bg-variant="primary" text-variant="white" class="stat-card">
            <div class="stat-icon">
              <i class="bi bi-people-fill"></i>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">256</h3>
              <p class="stat-title">Clientes</p>
            </div>
          </b-card>
        </b-col>
        
        <b-col lg="3" md="6" sm="12" class="mb-4">
          <b-card bg-variant="success" text-variant="white" class="stat-card">
            <div class="stat-icon">
              <i class="bi bi-graph-up"></i>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">R$ 45.800</h3>
              <p class="stat-title">Receita Mensal</p>
            </div>
          </b-card>
        </b-col>
        
        <b-col lg="3" md="6" sm="12" class="mb-4">
          <b-card bg-variant="warning" text-variant="white" class="stat-card">
            <div class="stat-icon">
              <i class="bi bi-clock-history"></i>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">12</h3>
              <p class="stat-title">Projetos Pendentes</p>
            </div>
          </b-card>
        </b-col>
        
        <b-col lg="3" md="6" sm="12" class="mb-4">
          <b-card bg-variant="info" text-variant="white" class="stat-card">
            <div class="stat-icon">
              <i class="bi bi-check-circle"></i>
            </div>
            <div class="stat-info">
              <h3 class="stat-number">24</h3>
              <p class="stat-title">Tarefas Concluídas</p>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </div>
    
    <b-row>
      <b-col lg="8" class="mb-4">
        <b-card title="Atividade Recente" class="h-100">
          <b-list-group flush>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <div>
                <strong>João Silva</strong> adicionou um novo cliente
                <div class="text-muted small">Hoje, 09:30</div>
              </div>
              <b-badge variant="primary" pill>Novo</b-badge>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <div>
                <strong>Maria Oliveira</strong> finalizou o relatório mensal
                <div class="text-muted small">Ontem, 16:45</div>
              </div>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <div>
                <strong>Carlos Pereira</strong> atualizou status do projeto
                <div class="text-muted small">Ontem, 11:20</div>
              </div>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <div>
                <strong>Ana Costa</strong> agendou uma nova reunião
                <div class="text-muted small">09/06/2023, 14:00</div>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      
      <b-col lg="4" class="mb-4">
        <b-card title="Próximas Tarefas" class="h-100">
          <b-list-group flush>
            <b-list-group-item class="d-flex align-items-center">
              <div class="me-3">
                <b-form-checkbox></b-form-checkbox>
              </div>
              <div>Reunião com cliente XYZ</div>
            </b-list-group-item>
            <b-list-group-item class="d-flex align-items-center">
              <div class="me-3">
                <b-form-checkbox></b-form-checkbox>
              </div>
              <div>Preparar apresentação trimestral</div>
            </b-list-group-item>
            <b-list-group-item class="d-flex align-items-center">
              <div class="me-3">
                <b-form-checkbox></b-form-checkbox>
              </div>
              <div>Revisar proposta comercial</div>
            </b-list-group-item>
            <b-list-group-item class="d-flex align-items-center">
              <div class="me-3">
                <b-form-checkbox></b-form-checkbox>
              </div>
              <div>Enviar relatório financeiro</div>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </app-layout>
</template>

<script>
import { AppLayout } from '@/core/components'

export default {
  name: 'DashboardView',
  components: {
    AppLayout
  }
}
</script>

<style scoped>
.page-title {
  color: #0b354f;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.stat-card {
  border: none;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 2.5rem;
  margin-right: 1rem;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

.stat-title {
  margin: 0;
  opacity: 0.8;
  font-size: 0.9rem;
}
</style> 