<template>
  <div class="content">

    <div class="btn-create">
      <div class="btn-with-hint">
        <div class="hint-create__lot">Создать лот</div>
        <el-button type="primary" icon=Plus @click="$router.push('/add-lot')">Добавить</el-button>
      </div>
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
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}

.btn-with-hint {
  display: flex;
  position: relative
}

.hint-create__lot {
  font-weight: 500;
  font-size: 14px;
  visibility: hidden;
  position: absolute;
  top: 104%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 2px 5px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 1.5s;
}

.btn-with-hint:hover .hint-create__lot {
  visibility: visible;
  opacity: 1;
}

</style>