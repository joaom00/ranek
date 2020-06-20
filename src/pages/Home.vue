<template>
  <section>
    <h1>👍 Compre ou Venda 👎</h1>
    <SearchProducts />
    <ProductList />
  </section>
</template>

<script>
import SearchProducts from '@/components/SearchProducts';
import ProductList from '@/components/ProductList';

export default {
  name: 'Home',
  components: {
    SearchProducts,
    ProductList,
  },
};
</script>

<style scoped>
h1 {
  color: #87f;
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
}
</style>
