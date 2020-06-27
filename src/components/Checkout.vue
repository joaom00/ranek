<template>
  <section>
    <h2>Endereço de Envio</h2>
    <ErrorNotification :errors="errors" />
    <UserForm>
      <template v-if="loading">
        <button disabled class="btn">
          <LoadingButton />
        </button>
      </template>
      <template v-else>
        <button class="btn" @click.prevent="checkout">Finalizar Compra</button>
      </template>
    </UserForm>
  </section>
</template>

<script>
import UserForm from '@/components/UserForm';
import { api } from '@/services.js';
import { mapState } from 'vuex';

export default {
  name: 'Checkout',
  props: ['product'],
  components: {
    UserForm,
  },
  data() {
    return {
      loading: false,
      errors: [],
    };
  },

  computed: {
    ...mapState(['user']),
    buy() {
      return {
        buyer_id: this.user.email,
        seller_id: this.product.user_id,
        product: this.product,
        address: {
          cep: this.user.cep,
          street: this.user.street,
          number: this.user.number,
          neighborhood: this.user.neighborhood,
          city: this.user.city,
          uf: this.user.uf,
        },
      };
    },
  },

  methods: {
    createTransaction() {
      this.loading = true;
      return api.post('/transaction', this.buy).then(() => {
        this.$router.push({ name: 'Purchases' });
        this.loading = false;
      });
    },

    async createUser() {
      try {
        this.loading = true;
        await this.$store.dispatch('createUser', this.$store.state.user);
        await this.$store.dispatch('userLogin', this.$store.state.user);
        await this.$store.dispatch('getUser');
        await this.createTransaction();
        this.loading = false;
      } catch (err) {
        this.errors.push(err.response.data.message);
        this.loading = false;
      }
    },

    checkout() {
      this.errors = [];
      if (this.$store.state.login) {
        this.createTransaction();
      } else {
        this.createUser();
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
}
</style>
