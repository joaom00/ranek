<template>
  <section>
    <UserForm>
      <button class="btn" @click.prevent="updateUser">Atualizar Usuário</button>
    </UserForm>
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

  methods: {
    updateUser() {
      api
        .put(`/user/${this.$store.state.user.id}`, this.$store.state.user)
        .then(() => {
          this.$store.dispatch('getUser');
          this.$router.push({ name: 'User' });
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style></style>
