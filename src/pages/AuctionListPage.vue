<template>
  <div class="content">

    <div class="btn-create">
      <el-button type="primary" icon=Plus @click="$router.push('/add-lot')">Добавить</el-button>
    </div>

    <div class="auction-cards">
      <AuctionCards />
    </div>

  </div>
  
</template>

<script lang="ts" setup>

import AuctionCards from '../components/AuctionCards.vue'

</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
}

.btn-create {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}

</style>