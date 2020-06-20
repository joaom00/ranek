<template>
  <form>
    <input name="search" id="search" type="text" v-model="search" />
    <input
      id="search-icon"
      value="search"
      type="submit"
      @click.prevent="productsSearch"
    />
  </form>
</template>

<script>
export default {
  data() {
    return {
      search: '',
    };
  },
  methods: {
    productsSearch() {
      this.$router.push({ query: { q: this.search } });
    },
  },
};
</script>

<style></style>
