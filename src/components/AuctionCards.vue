<template>

  <div class="auction-card"> <!-- тут будет v-for -->

    <div class="card-info">
      {{ getLots }}
      <img class="el-upload-list__item-thumbnail" :src="lotsStore.lots[0]?.photoBase64[0]" alt="" />
    </div>

    <!-- тут будет компонент блока ставок -->

  </div>

</template>

<script lang="ts" setup>

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {useLotsStore} from '../stores/lots'

const router = useRouter()
const lotsStore = useLotsStore()

const getLots = computed(function() {
  return lotsStore.lots[0]?.photo[0]?.url
})



</script>

<style scoped>



</style>