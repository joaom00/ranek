<template>
  <section class="products-container">
    <div v-for="product in products" :key="product.id">
      <img
        v-if="product.photos"
        :src="product.photos[0].src"
        :alt="product.fotos[0].title"
      />
      <p class="price">{{ product.price }}</p>
      <h2 class="title">{{ product.name }}</h2>
      <p>{{ product.description }}</p>
    </div>
    {{ url }}
  </section>
</template>

<script>
import { api } from '@/services.js';
import serialize from '@/helpers.js';

export default {
  data() {
    return {
      products: null,
      productsPerPage: 9,
    };
  },

  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/produto?_limit=${this.productsPerPage}${query}`;
    },
  },

  methods: {
    getProducts() {
      api.get(this.url).then((response) => {
        this.products = response.data;
      });
    },
  },

  watch: {
    url() {
      this.getProducts();
    },
  },

  created() {
    this.getProducts();
  },
};
</script>

<style></style>
