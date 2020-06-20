<template>
  <section class="login">
    <h1>Login</h1>
    <form @submit.prevent="doLogin">
      <label for="email">E-mail</label>
      <input type="email" name="email" id="email" v-model="email" />
      <label for="password">Senha</label>
      <input type="password" name="password" id="password" v-model="password" />
      <button type="submit" class="btn">Logar</button>
    </form>
    <p class="forgotPassword">
      <a href="/" target="_blank">Perdeu a senha? Clique aqui.</a>
    </p>
    <SignUp />
  </section>
</template>

<script>
import SignUp from '@/components/SignUp';

export default {
  name: 'Login',
  components: {
    SignUp,
  },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    doLogin() {},
  },
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.forgotPassword {
  text-align: center;
  margin: 20px auto 0 auto;
}

.forgotPassword a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>
