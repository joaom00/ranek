<template>
  <section>
    <h2>Crie a Sua Conta</h2>
    <ErrorNotification :errors="errors" />
    <transition mode="out-in">
      <button v-if="!create" class="btn" @click="create = true">
        Criar Conta
      </button>
      <UserForm v-else>
        <template v-if="loading">
          <button disabled class="btn btn-form">
            <LoadingButton />
          </button>
        </template>
        <template v-else>
          <button class="btn btn-form" @click.prevent="createUser">
            Criar Usuário
          </button>
        </template>
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
      loading: false,
      errors: [],
    };
  },

  methods: {
    async createUser() {
      this.errors = [];
      try {
        this.loading = true;
        await this.$store.dispatch('createUser', this.$store.state.user);
        await this.$store.dispatch('userLogin', this.$store.state.user);
        await this.$store.dispatch('getUser');
        this.$router.push({ name: 'User' });
        this.loading = false;
      } catch (err) {
        this.errors.push(err.response.data.message);
        this.loading = false;
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-form {
  max-width: 100%;
}
</style>
