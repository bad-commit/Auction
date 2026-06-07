<template>
  <ul class="auction-cards-list">
    <li class="auction-card" v-for="lot in getLots" :key="lot.id">
      <!-- тут будет v-for -->

      <!-- {{ lot }} -->

      <div class="card-info">
        <div class="block text-center" m="t-4">
          <el-carousel :autoplay="false" trigger="click">
            <el-carousel-item v-for="(image, index) in lot.photoBase64" :key="index">
               <img class="card-info__img" :src="image" alt="car" />
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- <ul class="card-info-images-list" v-for="(image, index) in lot.photoBase64" :key="index">
          <li class="card-info-image">
            <img class="card-info__img" :src="image" alt="" />
          </li>
        </ul> -->

        <div style="font-size: 22px; font-weight: 600; margin: 5px 0 5px 0;">{{ lot.title }}</div>

        <div style="font-size: 16px; font-weight: 400; margin-bottom: 15px;">{{ lot.yearManufacture }}, {{ lot.mileage }} км, {{ lot.engineDisplacement }}L, {{ lot.power }} л.с., {{ lot.drive }}, {{ lot.engineType }}</div>

      </div>

      <div class="btn-details" @click="openDetailCard(lot.id)">
        <el-button type="primary" round>Подробнее</el-button>
      </div>

      <div class="auction-bid"></div>
      <!-- тут будет компонент блока ставок -->
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLotsStore } from '../stores/lots'

const router = useRouter()
const route = useRoute()
const lotsStore = useLotsStore()

const getLots = computed(function () {
  console.log(lotsStore.lots)
  return lotsStore.lots
})

const openDetailCard = (id: number) => {
  router.push({ name: 'lot-detail', params: { id: id } })
  // console.log(route.params.id)
}

</script>

<style lang="css" scoped>

.auction-cards-list {
  display: flex;
  gap: 30px;
}

.auction-card {
  width: 350px;
  height: auto;
}

.card-info :deep(.el-carousel__indicators) {
  display: none;
}

.card-info-image {
  height: 100px;
  width: 150px;
}

.card-info__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}



.btn-details {
  display: flex;
  justify-content: center
}

</style>
