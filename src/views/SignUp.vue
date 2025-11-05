<template>
  <div class="signup-wrapper">
    <div class="signup-card">
      <h2 class="title">Crear cuenta</h2>
      <p class="subtitle">Regístrate para comenzar a explorar eventos.</p>

      <form @submit.prevent="registerUser" class="signup-form">
        <div class="form-group">
          <label for="name">Nombre completo</label>
          <input
            id="name"
            v-model.trim="name"
            type="text"
            placeholder="Ingresa tu nombre"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input
            id="email"
            v-model.trim="email"
            type="email"
            placeholder="tu@correo.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model.trim="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            minlength="6"
            required
          />
        </div>

        <button
          type="submit"
          class="btn-submit"
          :disabled="loading"
        >
          {{ loading ? 'Creando cuenta...' : 'Crear cuenta' }}
        </button>

        <p v-if="error" class="error-text">{{ error }}</p>
      </form>

      <p class="login-text">
        ¿Ya tienes cuenta?
        <router-link to="/login" class="login-link">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const name = ref("")
const email = ref("")
const password = ref("")
const loading = ref(false)
const error = ref("")

async function registerUser() {
  error.value = ""
  if (!name.value || !email.value || !password.value) {
    error.value = "Por favor completa todos los campos."
    return
  }

  loading.value = true

  try {
    // Simular registro local (puedes reemplazar luego con API real)
    const newUser = {
      id: Date.now(),
      name: name.value,
      email: email.value,
      password: password.value
    }

    localStorage.setItem("user", JSON.stringify(newUser))
    localStorage.setItem("userName", name.value)

    setTimeout(() => {
      loading.value = false
      router.push("/home")
    }, 800)
  } catch (err) {
    console.error(err)
    error.value = "Ocurrió un error al crear la cuenta."
    loading.value = false
  }
}
</script>

<style scoped>
.signup-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #fafafa;
  font-family: "Inter", sans-serif;
}

.signup-card {
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 2rem;
  border: 2px solid #000;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 1);
  text-align: center;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 0.2rem;
}

.subtitle {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1.5rem;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.3rem;
}

.form-group input {
  width: 94%;
  padding: 0.7rem;
  border: 2px solid #000;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.2s ease;
}

.form-group input:focus {
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 1);
}

.btn-submit {
  margin-top: 1rem;
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #000;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  background: #000;
  color: #fff;
}

.btn-submit:hover {
  background: #fff;
  color: #000;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 1);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-text {
  color: red;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
}

.login-text {
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.login-link {
  color: #000;
  font-weight: 600;
  text-decoration: underline;
}
</style>
