<template>
  <div class="btn-back" @click="goBackMain">
    <el-button type="primary" :icon="ArrowLeft" circle />
  </div>

  <div v-if="lotInfo">
    {{ lotInfo.title }}
  </div>

</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLotsStore } from '../stores/lots'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const lotsStore = useLotsStore().lots

console.log(useLotsStore().lots)

// console.log(route.params.id)
// console.log(typeof(route.params.id))

const currentLotId = route.params.id

const lotInfo = computed(() => {
  return lotsStore.find(lot => lot.id === Number(currentLotId))
})

const goBackMain = () => {
  router.push('/')
}

</script>

<style scoped>

</style>