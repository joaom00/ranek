<template>
  <section>
    <h2>Adicionar Produto</h2>
    <AddProduct />
    <h2>Seus Produtos</h2>
    <transition-group v-if="user_products" name="list" tag="ul">
      <li v-for="(product, index) in user_products" :key="index">
        <ProductItem :product="product">
          <p>{{ product.description }}</p>
          <button class="delete" @click="deleteProduct(product.id)">
            Deletar
          </button>
        </ProductItem>
      </li>
    </transition-group>
    <Loading v-else />
  </section>
</template>

<script>
import AddProduct from '@/components/AddProduct';
import ProductItem from '@/components/ProductItem';
import { api } from '@/services.js';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UserProducts',
  components: {
    AddProduct,
    ProductItem,
  },

  computed: {
    ...mapState(['login', 'user', 'user_products']),
  },

  methods: {
    ...mapActions(['getUserProducts']),
    deleteProduct(id) {
      const confirm = window.confirm('Deseja remover este produto?');
      if (confirm) {
        api
          .delete(`/product/${id}`)
          .then(() => {
            this.getUserProducts();
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    },
  },

  watch: {
    login() {
      this.getUserProducts();
    },
  },

  created() {
    if (this.login) {
      this.getUserProducts();
    }
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.delete {
  position: absolute;
  top: 0;
  right: 0;
  background: url('../../assets/remove.svg') no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>
