<template>
  <section>
    <UserForm>
      <button class="btn" @click.prevent="updateUser">Atualizar Usuário</button>
    </UserForm>
    <ErrorNotification :errors="errors" />
  </section>
</template>

<script>
import UserForm from '@/components/UserForm';
import { api } from '@/services.js';

export default {
  name: 'UserEdit',
  components: {
    UserForm,
  },
  data() {
    return {
      errors: [],
    };
  },

  methods: {
    updateUser() {
      this.errors = [];
      api
        .put('/user', this.$store.state.user)
        .then(() => {
          this.$store.dispatch('getUser');
          this.$router.push({ name: 'User' });
        })
        .catch((err) => {
          this.errors.push(err.response.data.message);
        });
    },
  },
};
</script>

<style></style>
