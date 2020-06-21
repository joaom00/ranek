<template>
  <form class="add-product">
    <label for="name">Nome</label>
    <input type="text" name="name" id="name" v-model="product.name" />
    <label for="price">Preço (R$)</label>
    <input type="number" name="price" id="price" v-model="product.price" />
    <label for="photos">Fotos</label>
    <input type="file" name="photos" id="photos" ref="photos" />
    <label for="description">Descrição</label>
    <textarea
      name="description"
      id="description"
      v-model="product.description"
    ></textarea>
    <input
      class="btn"
      type="button"
      value="Add Product"
      @click.prevent="addProduct"
    />
  </form>
</template>

<script>
import { api } from '@/services.js';

export default {
  name: 'AddProduct',
  data() {
    return {
      product: {
        name: '',
        price: '',
        description: '',
        photos: null,
        sold: 'false',
      },
    };
  },

  methods: {
    formatProduct() {
      this.product.user_id = this.$store.state.user.id;
    },

    addProduct() {
      this.formatProduct();
      api.post('/product', this.product).then(() => {
        this.$store.dispatch('getUserProducts');
      });
    },
  },
};
</script>

<style scoped>
.add-product {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>
