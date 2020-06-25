<template>
  <section>
    <div v-if="purchases">
      <h2>Compras</h2>
      <div
        class="products-wrapper"
        v-for="(purchase, index) in purchases"
        :key="index"
      >
        <ProductItem v-if="purchase.product" :product="purchase.product">
          <p class="seller"><span>Vendedor: </span>{{ purchase.seller_id }}</p>
        </ProductItem>
      </div>
    </div>
    <Loading v-else />
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
      purchases: null,
    };
  },

  computed: {
    ...mapState(['user', 'login']),
  },

  methods: {
    getPurchases() {
      api.get(`/transaction?type=buyer_id`).then((response) => {
        this.purchases = response.data;
      });
    },
  },

  watch: {
    login() {
      this.getPurchases();
    },
  },

  created() {
    if (this.login) {
      this.getPurchases();
    }
  },
};
</script>

<style scoped>
.product-wrapper {
  margin-bottom: 40px;
}

.seller span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>
