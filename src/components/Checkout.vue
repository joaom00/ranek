<template>
  <section>
    <h2>Endereço de Envio</h2>
    <UserForm>
      <button class="btn" @click.prevent="checkout">Finalizar Compra</button>
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
      return api.post('/transaction', this.buy).then(() => {
        this.$router.push({ name: 'Purchases' });
      });
    },

    async createUser() {
      try {
        await this.$store.dispatch('createUser', this.$store.state.user);
        await this.$store.dispatch('userLogin', this.$store.state.user);
        await this.$store.dispatch('getUser');
        await this.createTransaction();
      } catch (err) {
        console.log(err);
      }
    },

    checkout() {
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
}
</style>
