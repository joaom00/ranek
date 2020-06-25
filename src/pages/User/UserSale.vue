<template>
  <section>
    <div v-if="sales">
      <h2>Vendas</h2>
      <div class="products-wrapper" v-for="(sale, index) in sales" :key="index">
        <ProductItem v-if="sale.product" :product="sale.product">
          <p class="seller"><span>Comprador: </span>{{ sale.buyer_id }}</p>
        </ProductItem>
        <div class="delivery">
          <h3>Entrega:</h3>
          <ul>
            <li>
              <p>CEP: {{ sale.address.cep }}</p>
              <p>Rua: {{ sale.address.street }}</p>
              <p>Número: {{ sale.address.number }}</p>
              <p>Bairro: {{ sale.address.neighborhood }}</p>
              <p>Cidade: {{ sale.address.city }}</p>
              <p>Estado: {{ sale.address.uf }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductItem from '@/components/ProductItem';
import { api } from '@/services.js';
import { mapState } from 'vuex';

export default {
  name: 'UserPurchase',
  components: {
    ProductItem,
  },

  data() {
    return {
      sales: null,
      address: null,
    };
  },

  computed: {
    ...mapState(['user', 'login']),
  },

  methods: {
    getSales() {
      api.get(`/transaction?type=seller_id`).then((response) => {
        this.sales = response.data;
        this.address = response.data.address;
      });
    },
  },

  watch: {
    login() {
      this.getSales();
    },
  },

  created() {
    if (this.login) {
      this.getSales();
    }
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

h3 {
  margin: 0;
  justify-self: end;
}

.product-wrapper {
  margin-bottom: 40px;
}

.seller span {
  color: #e80;
}

.delivery {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

@media screen and (max-width: 500px) {
  h3 {
    justify-self: start;
  }

  .delivery {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
}
</style>
