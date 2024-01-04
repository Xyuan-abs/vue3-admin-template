<script setup>
const test = ref('')

onMounted(async () => {})
</script>

<script>
export default {
  name: 'Dashboard',
}
</script>

<template>
  <div class="app-container">
    <el-input v-model="test"></el-input>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
