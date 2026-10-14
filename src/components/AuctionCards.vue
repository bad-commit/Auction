<template>
  <ul class="auction-cards-list">
    <li class="auction-card" v-for="lot in filterLots" :key="lot.id">
      <div class="auction-card__image-wrapper">
        <div
          class="auction-card__indicator"
          :style="{ background: `${changeColorIndicator(lot)}` }"
        ></div>
        <div>
          <el-carousel :autoplay="false" trigger="click">
            <el-carousel-item v-for="(image, index) in lot.photoBase64" :key="index">
              <img :src="image" alt="car" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div class="auction-card__body">
        <div class="auction-card__header">
          <h3 class="auction-card__title">
            {{ lot.title }}
          </h3>

          <span class="auction-card__year">
            {{ lot.yearManufacture }}
          </span>
        </div>

        <div class="auction-card__specs">
          <div class="auction-card__spec">
            <span class="auction-card__spec-icon">
              <div class="icon-mileage"><img src="../assets/icons/odometer.svg" alt=""></div>
            </span>

            <div class="auction-card__spec-content">
              <span class="auction-card__spec-value"> {{ lot.mileage }} км </span>

              <span class="auction-card__spec-label"> Пробег </span>
            </div>
          </div>

          <div class="auction-card__spec">
            <span class="auction-card__spec-icon">
              <div class="icon-engine"><img src="../assets/icons/engine.svg" alt=""></div>
            </span>

            <div class="auction-card__spec-content">
              <span class="auction-card__spec-value"> {{ lot.engineDisplacement }} л </span>

              <span class="auction-card__spec-label"> Двигатель </span>
            </div>
          </div>

          <div class="auction-card__spec">
            <span class="auction-card__spec-icon">
              <div class="icon-power"><img src="../assets/icons/lightning.svg" alt=""></div>
            </span>

            <div class="auction-card__spec-content">
              <span class="auction-card__spec-value"> {{ lot.power }} л.с. </span>

              <span class="auction-card__spec-label"> Мощность </span>
            </div>
          </div>

          <div class="auction-card__spec">
            <span class="auction-card__spec-icon">
              <div class="icon-drive"><img src="../assets/icons/awd.svg" alt=""></div>
            </span>

            <div class="auction-card__spec-content">
              <span class="auction-card__spec-value">
                {{ lot.drive }}
              </span>

              <span class="auction-card__spec-label"> Привод </span>
            </div>
          </div>

          <div class="auction-card__spec">
            <span class="auction-card__spec-icon">
              <div class="icon-fuel"><img src="../assets/icons/gas-station.svg" alt=""></div>
            </span>

            <div class="auction-card__spec-content">
              <span class="auction-card__spec-value">
                {{ lot.engineType }}
              </span>

              <span class="auction-card__spec-label"> Топливо </span>
            </div>
          </div>
        </div>

        <div class="auction-card__auction-info">
          <div class="auction-card__bid">
            <span class="auction-card__label">
              Текущая ставка
            </span>

            <span class="auction-card__bid-value">
              {{ lot.bids.at(-1)?.amount.toLocaleString('ru-RU') ?? lot.startPrice.toLocaleString('ru-RU') }}
              ₽
            </span>
          </div>
        </div>

      </div>

      <div class="btn-details" @click="openDetailCard(lot.id)">
        <el-button type="primary" round>Подробнее</el-button>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLotsStore } from '../stores/lots'
import type { Lot } from '@/types/lot'

const props = defineProps({
  filter: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const route = useRoute()
const lotsStore = useLotsStore()

const currentTime = ref(Date.now())

let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  interval = setInterval(() => {
    currentTime.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})

const getLots = computed(function () {
  console.log(lotsStore.lots)
  return lotsStore.lots
})

const filterLots = computed(() => {
  if (props.filter === 'open') {
    return getLots.value.filter((lot) => !lot.isClosed)
  }

  if (props.filter === 'closed') {
    return getLots.value.filter((lot) => lot.isClosed)
  }

  return getLots.value
})

const openDetailCard = (id: number) => {
  router.push({ name: 'lot-detail', params: { id: id } })
  // console.log(route.params.id)
}


watch(currentTime, (time) => {
  getLots.value.forEach((lot) => {
    if (lot.timerEnd && time >= lot.timerEnd && !lot.isClosed) {
      lot.isClosed = true
    }
  })
})

function changeColorIndicator(lot: Lot) {
  if (lot.bids.length === 0 && lot.isClosed) {
    return 'grey'
  } else if (lot.isClosed) {
    return 'red'
  } else if (!lot.isClosed) {
    return 'green'
  }
}
</script>

<style lang="css" scoped>
.auction-cards-list {
  display: flex;
  height: 100%;
  width: 100%;
  column-gap: 4.32vw;
  flex-wrap: wrap;
}

.auction-card {
  box-sizing: border-box;
  flex: 0 0 calc((100% - 60px) / 5);
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  height: auto;
  overflow: hidden;
  min-width: 0;
  background: #10151c;
  border: 1px solid #27303d;
  border-radius: 13px;
  color: #e7edf7;
  margin: 0 0 30px;
}

.auction-card:hover {
  transform: translateY(-3px);
  border-color: #3d9cff;
  box-shadow: 0 8px 24px rgb(0 0 0 / 18%);
}
.auction-card .auction-card__image-wrapper img {
  display: block;
  width: 100%;
  height: 230px;
  object-fit: cover;
}

.auction-card__image-wrapper {
  position: relative;
  height: 230px;
  flex-shrink: 0;
  overflow: hidden;
}

.auction-card__image-wrapper :deep(.el-carousel__container) {
  height: 230px;
}

.auction-card__image-wrapper :deep(.el-carousel__indicators) {
  display: none;
}

.auction-card__indicator {
  position: absolute;
  top: 4%;
  left: 92%;
  height: 0.6em;
  width: 0.6em;
  border-radius: 50%;
  z-index: 1;
}

.auction-card__body {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  min-width: 0;
  padding: 14px 15px 16px;
  color: #e7edf7;
  background: #10151c;
  box-sizing: border-box;
}

.auction-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 11px;
  border-bottom: 1px solid #202834;
}

.auction-card__title {
  margin: 0;
  overflow: hidden;
  color: #e7edf7;
  font-size: 19px;
  font-weight: 650;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.auction-card__year {
  flex-shrink: 0;
  color: #8194b0;
  font-size: 14px;
}

.auction-card__specs {
  display: flex;
  flex-wrap: wrap;
  padding: 15px 4px 18px;
  row-gap: 20px;
}

.auction-card__spec {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  flex: 0 0 50%;
  min-width: 0;
  box-sizing: border-box;
}

.auction-card__spec-content {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.auction-card__spec-value {
  color: #e0e7f1;
  font-size: 14px;
  font-weight: 600;
}

.auction-card__spec-label {
  color: #8190a5;
  font-size: 12px;
}

.auction-card__auction-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: auto;
  padding: 14px;
  border: 1px solid #242e3b;
  border-radius: 12px;
  background: #171e27;
  box-sizing: border-box;
}

.auction-card__bid {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.auction-card__label {
  color: #8190a5;
  font-size: 13px;
}

.auction-card__bid-value {
  color: #e7edf7;
  font-size: 23px;
  font-weight: 700;
  overflow-wrap: anywhere;
}

.btn-details {
  display: flex;
  justify-content: center;
  padding: 0 0 16px;
}

.btn-details :deep(.el-button.is-round) {
  padding: 8px 50px;
}



@media (max-width: 1650px) {
  .auction-card {
    flex-basis: calc((100% - 40px) / 4);
  }
}

@media (max-width: 1400px) {
  .auction-card {
    flex-basis: calc((100% - 40px) / 3);
  }

  .auction-cards-list {
    justify-content: center;
  }
}

@media (max-width: 1050px) {
  .auction-card {
    flex-basis: calc((100% - 10px) / 2);
  }
}

@media (max-width: 730px) {
  .auction-card {
    flex-basis: 100%;
  }
}
</style>
