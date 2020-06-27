<template>
  <section>
    <UserForm>
      <template v-if="loading">
        <button disabled class="btn">
          <LoadingButton />
        </button>
      </template>
      <template v-else>
        <button class="btn" @click.prevent="updateUser">
          Atualizar Usuário
        </button>
      </template>
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
      loading: false,
      errors: [],
    };
  },

  methods: {
    updateUser() {
      this.errors = [];
      this.loading = true;
      api
        .put('/user', this.$store.state.user)
        .then(() => {
          this.$store.dispatch('getUser');
          this.$router.push({ name: 'User' });
          this.loading = false;
        })
        .catch((err) => {
          this.errors.push(err.response.data.message);
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.btn {
  width: 182px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
