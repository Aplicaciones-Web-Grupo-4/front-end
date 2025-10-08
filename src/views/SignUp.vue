<template>
  <div class="signup-container">
    <h1>Crear cuenta</h1>
    <form @submit.prevent="registerUser" class="signup-form">
      <label>
        Nombre:
        <input v-model="name" type="text" required />
      </label>
      <label>
        Correo electrónico:
        <input v-model="email" type="email" required />
      </label>
      <label>
        Contraseña:
        <input v-model="password" type="password" required />
      </label>
      <button type="submit">Crear cuenta</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    registerUser() {
      localStorage.setItem("userName", this.name);
      alert(`Bienvenido, ${this.name}!`);
      this.$router.push("/home");
    }
  }
};
</script>


