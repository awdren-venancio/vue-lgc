<template>
  <div class="login-container">
    <!-- Lado Esquerdo - Logo -->
    <div class="brand-side">
      <div class="brand-content">
        <img src="@/assets/img/lgc-logo.png" alt="LGC Consultoria" class="logo-img">
      </div>
    </div>

    <!-- Lado Direito - Formulário -->
    <div class="form-side">
      <div class="form-content">
        
        <h2>Entrar</h2>
        
        <form @submit.prevent="handleSubmit">
          <!-- Input Email -->
          <div class="form-group">
            <div class="input-with-icon">
              <i class="bi bi-envelope"></i>
              <input
                v-model="form.email"
                type="email"
                placeholder="E-mail"
                required
              >
            </div>
          </div>

          <!-- Input Senha -->
          <div class="form-group">
            <div class="input-with-icon">
              <i class="bi bi-lock"></i>
              <input
                v-model="form.senha"
                type="password"
                placeholder="Senha"
                required
              >
            </div>
          </div>

          <!-- Botão Entrar -->
          <button type="submit" class="login-button">
            Entrar
          </button>

          <!-- Link Esqueci senha -->
          <div class="forgot-password-container">
            <a href="#" class="forgot-password">Esqueci minha senha</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const form = ref({
      email: '',
      senha: ''
    })

    const handleSubmit = () => {
      console.log('Dados do formulário:', form.value)
      // Aqui você adicionaria a lógica de autenticação real
      // Por enquanto, apenas redirecionamos para o dashboard
      router.push('/dashboard')
    }

    return {
      form,
      handleSubmit
    }
  }
}
</script>

<style scoped>
/* Reset e configuração base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  max-width: 100%;
  overflow-x: hidden;
}

/* Lado Esquerdo - Marca */
.brand-side {
  flex: 7;
  background-color: #0b354f;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  min-height: 100vh;
}

.brand-content {
  text-align: center;
  width: 100%;
  padding: 0 2rem;
}

.brand-content .logo-img {
  width: 80%;
  max-width: 600px;
  height: auto;
}

.brand-content h1 {
  color: white;
  font-size: 4.5rem;
  font-weight: 700;
  letter-spacing: 4px;
  margin: 0;
}

/* Lado Direito - Formulário */
.form-side {
  flex: 3;
  background-color: #FDF6F0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
}

.form-content {
  width: 100%;
  max-width: 450px;
  padding: 0 1rem;
}

h2 {
  color: #0b354f;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 3rem;
}

.form-group {
  margin-bottom: 2rem;
}

.input-with-icon {
  position: relative;
  width: 100%;
}

.input-with-icon i {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
  font-size: 1.2rem;
}

.input-with-icon input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1.1rem;
  height: 60px;
  background-color: white;
}

.input-with-icon input:focus {
  outline: none;
  border-color: #0b354f;
  box-shadow: 0 0 0 2px rgba(10, 38, 71, 0.1);
}

.login-button {
  width: 100%;
  background-color: #0b354f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1.1rem;
  height: 60px;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.login-button:hover {
  background-color: #083158;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.forgot-password-container {
  text-align: center;
  margin-top: 1.5rem;
}

.forgot-password {
  color: #6c757d;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.forgot-password:hover {
  color: #0b354f;
  text-decoration: underline;
}

/* Responsividade */
@media (max-width: 1024px) {
  .brand-content h1 {
    font-size: 4rem;
  }

  .brand-content .logo-img {
    max-width: 400px;
  }

  .form-content {
    max-width: 350px;
  }
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    width: 100vw;
  }

  .brand-side,
  .form-side {
    flex: none;
    width: 100%;
  }

  .brand-side {
    height: 200px;
    min-height: auto;
    padding: 2rem 0;
  }

  .form-side {
    min-height: auto;
  }

  .brand-content .logo-img {
    max-width: 300px;
    width: 80%;
  }

  .brand-content h1 {
    font-size: 3.5rem;
  }
}

@media (max-width: 480px) {
  .brand-side {
    padding: 2rem 1rem;
  }

  .brand-content .logo-img {
    max-width: 250px;
  }

  .brand-content h1 {
    font-size: 2.5rem;
  }

  .form-content {
    padding: 0.5rem;
  }

  .input-with-icon input {
    height: 55px;
    font-size: 1rem;
  }

  .login-button {
    height: 55px;
    font-size: 1rem;
  }
}

/* Ajustes para telas muito altas */
@media (min-height: 1024px) {
  .form-content {
    max-width: 600px;
  }

  .input-with-icon input,
  .login-button {
    height: 70px;
    font-size: 1.2rem;
  }
}
</style>