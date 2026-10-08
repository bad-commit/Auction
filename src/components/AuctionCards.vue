<template>
  <ul class="auction-cards-list">
    <li class="auction-card" v-for="lot in filterLots" :key="lot.id">

      <div class="card-info">
        <div class="card-info__indicator" :style="{ background: `${changeColorIndicator(lot)}` }"></div>
        <div class="block text-center" m="t-4">
          <el-carousel :autoplay="false" trigger="click">
            <el-carousel-item v-for="(image, index) in lot.photoBase64" :key="index">
               <img class="card-info__img" :src="image" alt="car" />
            </el-carousel-item>
          </el-carousel>
        </div>

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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLotsStore } from '../stores/lots'
import type { Lot } from '@/types/lot'

const props = defineProps({
  filter: {
    type: String,
    required: true
  }
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
  if(interval) {
    clearInterval(interval)
  }
})

const getLots = computed(function () {
  console.log(lotsStore.lots)
  return lotsStore.lots
})


const filterLots = computed(() => {
  if(props.filter === 'open') {
    return getLots.value.filter(lot => !lot.isClosed)
  }

  if(props.filter === 'closed') {
    return getLots.value.filter(lot => lot.isClosed)
  }

  return getLots.value

})

const openDetailCard = (id: number) => {
  router.push({ name: 'lot-detail', params: { id: id } })
  // console.log(route.params.id)
}

// const changeColorIndicator = computed(() => {

//   for(let i = 0; i < lotsStore.lots.length; i++) {
//     if(lotsStore.lots[i]?.bids.length === 0 && lotsStore.lots[i]?.isClosed === true) {
//       return "grey"
//     } else if(lotsStore.lots[i]?.isClosed === true) {
//       return "red"
//     } else if(lotsStore.lots[i]?.isClosed === false) {
//       return "green"
//     }
//   }

// })


watch(currentTime, (time) => {
  getLots.value.forEach(lot => {
    if(lot.timerEnd && time >= lot.timerEnd && !lot.isClosed) {
      lot.isClosed = true
    }
  })
})


function changeColorIndicator(lot:Lot) {
  if(lot.bids.length === 0 && lot.isClosed) {
      return "grey"
    } else if(lot.isClosed) {
      return "red"
    } else if(!lot.isClosed) {
      return "green"
    }
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

.card-info {
  position: relative;
}

.card-info :deep(.el-carousel__indicators) {
  display: none;
}

.card-info__indicator {
  position: absolute;
  top: 4%;
  left: 92%;
  height: 0.6em;
  width: 0.6em;
  border-radius: 50%;
  z-index: 1;
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

.btn-details :deep(.el-button.is-round) {
  padding: 8px 50px;
}

</style>
