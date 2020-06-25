<template>
  <section>
    <h2>Crie a Sua Conta</h2>
    <ErrorNotification :errors="errors" />
    <transition mode="out-in">
      <button v-if="!create" class="btn" @click="create = true">
        Criar Conta
      </button>
      <UserForm v-else>
        <button class="btn btn-form" @click.prevent="createUser">
          Criar Usuário
        </button>
      </UserForm>
    </transition>
  </section>
</template>

<script>
import UserForm from '@/components/UserForm.vue';

export default {
  name: 'SignUp',
  components: {
    UserForm,
  },

  data() {
    return {
      create: false,
      errors: [],
    };
  },

  methods: {
    async createUser() {
      this.errors = [];
      try {
        await this.$store.dispatch('createUser', this.$store.state.user);
        await this.$store.dispatch('userLogin', this.$store.state.user);
        await this.$store.dispatch('getUser');
        this.$router.push({ name: 'User' });
      } catch (err) {
        this.erros.push(err.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.btn-form {
  max-width: 100%;
}
</style>
