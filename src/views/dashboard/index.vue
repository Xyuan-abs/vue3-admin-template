<script setup>
import { mock } from '@/api/mock.js'
import InsFormInline from '@/components/ins-form-inline/index.vue'

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
