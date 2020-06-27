<template>
  <transition>
    <ul class="erro" v-if="errors.length > 0">
      <li v-for="(erro, index) in errors" :key="index" v-html="erro"></li>
    </ul>
  </transition>
</template>

<script>
export default {
  name: 'ErrorNotification',
  props: {
    errors: Array,
  },
};
</script>

<style scoped>
.erro {
  margin: 20px auto;
}

.erro li {
  color: #e80;
  text-align: center;
}
</style>
