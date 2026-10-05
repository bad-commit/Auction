<template>
  <div class="profile-content">
    <div class="profile-content_header">
      <div class="avatar">
        <el-avatar :size="220" src="/src/assets/images/avatar.jpg" />
      </div>

      <div class="user-info">
        <div class="user-info__login">
          <el-icon><User /></el-icon>
          <div>Vladislav</div>
        </div>
        <div class="user-info__mail">
          <el-icon><Message /></el-icon>
          <div>test@gmail.com</div>
        </div>
        <div class="user-info__phone">
          <el-icon><Iphone /></el-icon>
          <div>+79997770077</div>
        </div>
        <div class="user-info__location">
          <el-icon><Location /></el-icon>
          <div>Москва</div>
        </div>
      </div>

      <div class="lot-stats">
        <div>Завершённых аукционов: {{ completedAuctions }}</div>
        <div>Всего лотов: {{ totalLots }}</div>
        <div>Общее число ставок: {{ totalBids }}</div>
        <div>Cреднее кол-во ставок на лот: {{ avgLotBids }}</div>
      </div>

    </div>
    <div class="profile-content_main">
      <div>Самый популярный лот (по числу ставок):
        <div v-if="lotMostBids">

          <div style="height: 200px; width: 300px;">
            <img :src="lotMostBids.photoBase64[0]" style="height: 100%; width: 100%; object-fit: cover;" alt="Автомобиль">
          </div>
          <div>
            <div>{{ lotMostBids.title }}, {{ lotMostBids.yearManufacture }}, {{ lotMostBids.color }}</div>
            <div>Ставок: {{ lotMostBids.bids.length }}</div>
          </div>

        </div>

        <div v-else>
          Нет данных
        </div>
        
      </div>
      <div>Лот с самой высокой ставкой:
        <div v-if="highestBidLot">
          <div style="height: 200px; width: 300px;">
            <img :src="highestBidLot.photoBase64[0]" style="height: 100%; width: 100%; object-fit: cover;" alt="Автомобиль">
          </div>
          <div>
            <div>{{ highestBidLot.title }}, {{ highestBidLot.yearManufacture }}, {{ highestBidLot.color }}</div>
            <div>Стоимость: {{ highestBidLot.bids.at(-1) }}</div>
          </div>
        </div>

        <div v-else>
          Нет данных
        </div>

      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useLotsStore } from '../stores/lots'
import type { Lot } from '@/types/lot'

const lotsStore = useLotsStore()

const getLots = computed(function () {
  console.log(lotsStore.lots)
  return lotsStore.lots
})

const completedAuctions = computed(function () {
  let value = 0
  for(const lot of getLots.value) {
    console.log(lot)
    if(lot.isClosed === true && lot.bids.at(-1)?.user === 'Vladislav') {
      value++
    }
  }
  return value
})

const lotMostBids = computed(function () {
  if(getLots.value.length > 0) {
    return getLots.value.reduce((maxLot:Lot, lot:Lot) => {
      if(lot.bids.length > maxLot.bids.length) {
        return lot
      }
      return maxLot

    }, getLots.value[0]!)
  }
})

console.log(lotMostBids);


const highestBidLot = computed (function () {
  const lots = getLots.value.filter(lot => lot.bids.length > 0)

  return lots.reduce((maxLot, lot) => {
    const maxBid = maxLot.bids.at(-1)!.amount
    const currentBid = lot.bids.at(-1)!.amount

    if(currentBid > maxBid) {
      return lot
    }
    return maxLot

  }, lots[0]!)
})

const totalLots = computed(function () {
  return getLots.value.length
})

const totalBids = computed(function () {
  const bids = getLots.value.flatMap(lot => lot.bids)
  return bids.length
})

const avgLotBids = computed(function () {

  if(totalBids.value === 0) {
    return 'Нет данных'
  }

  return Number(totalBids.value) / Number(totalLots.value)
})



</script>

<style>
.profile-content {
  height: 100%;
  width: 100%;
}

.profile-content_header {
  display: flex;
  gap: 70px;
}

.avatar {
  height: 220px;
  width: 220px;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.user-info__login {
  display: flex;
  gap: 30px;
}

.user-info__mail {
  display: flex;
  gap: 30px;
}

.user-info__phone {
  display: flex;
  gap: 30px;
}

.user-info__location {
  display: flex;
  gap: 30px;
}

.profile-content_main {

}

</style>
