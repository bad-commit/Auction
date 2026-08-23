<template>
  <div class="btn-back" @click="goBackMain">
    <el-button type="primary" :icon="ArrowLeft" circle />
  </div>

  <div class="lot-info" v-if="lotInfo">

    <div class="carousel-img">
      <el-carousel :autoplay="true" trigger="click" :interval="4000" type="card">
        <el-carousel-item v-for="(image, index) in lotInfo.photoBase64" :key="index">
          <img class="lot-info__img" :src="image" alt="car" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="car-info">

      <div class="car-info__left">
        <div>Марка & Модель: {{ lotInfo.title }}</div>
        <div>Год выпуска: {{ lotInfo.yearManufacture }}</div>
        <div>Пробег: {{ lotInfo.mileage }} км</div>
        <div>Цвет: {{ lotInfo.color }}</div>
        <div>Привод: {{ lotInfo.drive }}</div>
      </div>

      <div class="car-info__right">
        <div>Объем двигателя: {{ lotInfo.engineDisplacement }}L</div>
        <div>Мощность: {{ lotInfo.power }} л.с.</div>
        <div>Тип двигателя: {{ lotInfo.engineType }}</div>
        <div>Тип КПП: {{ lotInfo.gearboxType }}</div>
      </div>

    </div>

    <div class="car-bid">
      <BidForm />
    </div>

  </div>

</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLotsStore } from '../stores/lots'
import { ArrowLeft } from '@element-plus/icons-vue'
import BidForm from './BidForm.vue'

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

.btn-back {
  height: 5%;
}

.lot-info {
  height: 95%;
}

.lot-info :deep(.el-carousel__indicators) {
  display: none;
}

.carousel-img {
  height: 35%;
}

.carousel-img :deep(.el-carousel) {
  height: 100%;
}

.carousel-img :deep(.el-carousel__container) {
  height: 100%;
}

.lot-info__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.car-info {
  display: flex;
  height: 30%;
  width: 100%;
  margin-top: 20px;
}

.car-info__left {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
}

.car-info__right {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
}

.car-bid {
  width: 100%;
  height: 30%;
}


</style>