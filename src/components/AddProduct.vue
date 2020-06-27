<template>
  <form class="add-product">
    <label for="name">Nome</label>
    <input type="text" name="name" id="name" v-model="product.name" />
    <label for="price">Preço (R$)</label>
    <input type="number" name="price" id="price" v-model="product.price" />
    <label for="photos">Fotos</label>
    <input type="file" name="photos" id="photos" multiple ref="photos" />
    <label for="description">Descrição</label>
    <textarea
      name="description"
      id="description"
      v-model="product.description"
    ></textarea>
    <template v-if="loading">
      <button disabled class="btn" @click.prevent="addProduct">
        <LoadingButton />
      </button>
    </template>
    <template v-else>
      <button class="btn" @click.prevent="addProduct">
        Adicionar Produto
      </button>
    </template>
    <ErrorNotification class="error" :errors="errors" />
  </form>
</template>

<script>
import { api } from '@/services.js';

export default {
  name: 'AddProduct',
  data() {
    return {
      loading: false,
      errors: [],
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
      const form = new FormData();

      const files = this.$refs.photos.files;
      for (let i = 0; i < files.length; i++) {
        form.append(files[i].name, files[i]);
      }

      form.append('name', this.product.name);
      form.append('price', this.product.price);
      form.append('description', this.product.description);
      form.append('sold', this.product.sold);
      form.append('user_id', this.$store.state.user.id);

      return form;
    },

    async addProduct() {
      try {
        const product = this.formatProduct();
        this.loading = true;

        await api.post('/product', product);
        await this.$store.dispatch('getUserProducts');

        this.loading = false;
      } catch (err) {
        this.errors.push(err.response.data.message);
        this.loading = false;
        setTimeout(() => {
          this.errors = [];
        }, 3500);
      }
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.error {
  grid-column: 2;
}
</style>
