<template>
  <form>
    <input
      name="search"
      id="search"
      type="text"
      v-model="search"
      placeholder="Buscar..."
    />
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

<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
  padding: 0 10px;
}

#search {
  width: 100%;
  padding: 20px;
  border: none;
}

#search:focus,
#search:hover {
  transform: scale(1.1);
}

#search-icon {
  width: 62px;
  height: 62px;
  background: url('../assets/search.svg') no-repeat center center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: none;
}
</style>
