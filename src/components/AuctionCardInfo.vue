<template>
  <div class="btn-back" @click="goBackMain">
    <el-button type="primary" :icon="ArrowLeft" circle />
  </div>

  <div class="lot-page" v-if="lotInfo">
    <div class="carousel-img">
      <el-carousel :autoplay="true" trigger="click" :interval="4000" type="card">
        <el-carousel-item v-for="(image, index) in lotInfo.photoBase64" :key="index">
          <img class="lot-page__img" :src="image" alt="car" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="lot-layout">

      <div class="lot-info panel">
        <div class="lot-heading">
          <div class="brand-icon"><img :src="changeBrandLogo" alt="brand"></div>

          <div class="lot-title">
            <h1>{{ lotInfo.title }}</h1>

            <div class="lot-subtitle">
              <span>{{ lotInfo.yearManufacture }}</span>
              <span>•</span>
              <span>{{ lotInfo?.engineDisplacement }} л</span>
              <span>•</span>
              <span>{{ lotInfo.engineType }}</span>
            </div>
          </div>
        </div>


        <div class="specs-list">
          <div class="spec-item">
            <span class="spec-icon"><img src="../assets/icons/calendar.svg" alt="Календарь"></span>
            <div class="spec-text">
              <span class="spec-label">Год выпуска</span>
              <strong>{{ lotInfo.yearManufacture }}</strong>
            </div>
          </div>

          <div class="spec-item">
            <span class="spec-icon"><img src="../assets/icons/odometer.svg" alt="Одометр"></span>
            <div class="spec-text">
              <span class="spec-label">Пробег</span>
              <strong>{{ lotInfo.mileage}} км</strong>
            </div>
          </div>

          <div class="spec-item">
            <span class="spec-icon"><img src="../assets/icons/color.svg" alt="Капля"></span>
            <div class="spec-text">
              <span class="spec-label">Цвет</span>
              <strong>{{ lotInfo.color }}</strong>
            </div>
          </div>

          <div class="spec-item">
            <span class="spec-icon"><img src="../assets/icons/awd.svg" alt="Привод"></span>
            <div class="spec-text">
              <span class="spec-label">Привод</span>
              <strong>{{ lotInfo.drive }}</strong>
            </div>
          </div>

          <div class="spec-item">
            <span class="spec-icon"><img src="../assets/icons/meter-cube.svg" alt="Объем"></span>
            <div class="spec-text">
              <span class="spec-label">Объём двигателя</span>
              <strong>{{ lotInfo.engineDisplacement }} л</strong>
            </div>
          </div>

          <div class="spec-item">
            <span class="spec-icon"><img src="../assets/icons/gas-station.svg" alt="Топливо"></span>
            <div class="spec-text">
              <span class="spec-label">Тип двигателя</span>
              <strong>{{ lotInfo.engineType }}</strong>
            </div>
          </div>

          <div class="spec-item">
            <span class="spec-icon"><img src="../assets/icons/gearbox.svg" alt="КПП"></span>
            <div class="spec-text">
              <span class="spec-label">Тип КПП</span>
              <strong>{{ lotInfo.gearboxType }}</strong>
            </div>
          </div>

          <div class="spec-item">
            <span class="spec-icon"><img src="../assets/icons/lightning.svg" alt="Молния"></span>
            <div class="spec-text">
              <span class="spec-label">Мощность</span>
              <strong>{{ lotInfo.power }} л.с.</strong>
            </div>
          </div>
        </div>


        <div class="lot-description">
          <h2>
            <span class="description-icon"><img src="../assets/icons/description.svg" alt="Описание"></span>
            Описание
          </h2>

          <p>{{ lotInfo.description }}</p>
        </div>
      </div>



      <div class="lot-auction panel">
        <BidForm />
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLotsStore } from '../stores/lots'
import { ArrowLeft } from '@element-plus/icons-vue'
import BidForm from './BidForm.vue'
import bmwLogo from '../assets/icons/BMW.svg'
import mercedesLogo from '../assets/icons/Mercedes.svg'
import carLogo from '../assets/icons/car.svg'

const router = useRouter()
const route = useRoute()

const lotsStore = useLotsStore().lots

console.log(useLotsStore().lots)

// console.log(route.params.id)
// console.log(typeof(route.params.id))

const currentLotId = route.params.id

const lotInfo = computed(() => {
  return lotsStore.find((lot) => lot.id === Number(currentLotId))
})

const goBackMain = () => {
  router.push('/')
}

const changeBrandLogo = computed(() => {
  if(lotInfo.value?.title.includes("BMW")) {
    return bmwLogo
  } else if(lotInfo.value?.title.includes("Mercedes")) {
    return mercedesLogo
  } else {
    return carLogo
  }
})

</script>

<style scoped>
.btn-back {
  height: 5%;
}

.lot-page {
  height: 95%;
}

.lot-page :deep(.el-carousel__indicators) {
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

.lot-page__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.lot-layout {
  display: flex;
  align-items: stretch;
  gap: 16px;
  width: 100%;
  height: 62%;
  margin-top: 20px;
}

.panel {
  min-width: 0;
  padding: 24px;
  box-sizing: border-box;
  border: 1px solid #203955;
  border-radius: 17px;
  background: linear-gradient(145deg, rgba(13, 26, 42, 0.98), rgba(7, 16, 29, 0.98));
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
}


.lot-info {
  flex: 1 1 0;
}

.lot-auction {
  display: flex;
  flex: 0 1 36%;
  flex-direction: column;
  gap: 24px;
  min-width: 300px;
}


.lot-heading {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 24px;
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 68px;
  height: 68px;
  border: 1px solid #294361;
  border-radius: 50%;
  background: #101f33;
  color: #75b5ff;
  font-size: 30px;
}

.brand-icon img {
  height: 68px;
  width: 68px;
}

.lot-title {
  min-width: 0;
}

.lot-title h1 {
  margin: 0 0 8px;
  color: #f5f8ff;
  font-size: clamp(24px, 2.3vw, 36px);
  font-weight: 750;
  letter-spacing: -0.7px;
  overflow-wrap: anywhere;
}

.lot-subtitle {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 9px;
  color: #9bb4d6;
  font-size: 15px;
}


.specs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 24px;
  border-bottom: 1px solid #20344d;
}

.spec-item {
  display: flex;
  align-items: center;
  flex: 1 1 180px;
  gap: 12px;
  min-width: 0;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #172b43;
  border-radius: 13px;
  background: rgba(12, 26, 43, 0.7);
}

.spec-item:hover {
  border-color: #315579;
  background: #12243a;
  transform: translateY(-2px);
}

.spec-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: #142943;
  color: #70b3ff;
  font-size: 23px;
}

.spec-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.spec-label {
  color: #92aac9;
  font-size: 13px;
  line-height: 1.4;
}

.spec-text strong {
  color: #f2f6ff;
  font-size: 14px;
  font-weight: 650;
  line-height: 1.4;
  overflow-wrap: anywhere;
}


.lot-description {
  padding-top: 24px;
}

.lot-description h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 16px;
  color: #f4f7ff;
  font-size: 22px;
  font-weight: 700;
}

.description-icon {
  color: #70b3ff;
  font-size: 26px;
}

.lot-description p {
  margin: 0;
  color: #a6bad7;
  font-size: 16px;
  line-height: 1.8;
  overflow-wrap: anywhere;
  overflow-y: scroll;
  height: 60px;
}




@media (max-width: 1050px) {
  .lot-page {
    padding: 18px;
  }

  .panel {
    padding: 18px;
  }

  .lot-auction {
    flex-basis: 38%;
    min-width: 270px;
  }

  .spec-item {
    flex-basis: 150px;
  }
}

@media (max-width: 760px) {
  .lot-layout {
    flex-direction: column;
  }

  .lot-info,
  .lot-auction {
    flex: 1 1 auto;
    width: 100%;
    min-width: 0;
  }

  .lot-auction {
    gap: 20px;
  }

  .lot-heading {
    gap: 12px;
  }

  .brand-icon {
    width: 54px;
    height: 54px;
  }

  .spec-item {
    flex-basis: 180px;
  }
}

@media (max-width: 480px) {
  .lot-page {
    padding: 12px;
  }

  .panel {
    padding: 15px;
    border-radius: 13px;
  }

  .specs-list {
    gap: 8px;
  }

  .spec-item {
    flex-basis: 130px;
    gap: 8px;
    padding: 9px 7px;
  }

  .spec-icon {
    width: 32px;
    height: 32px;
    font-size: 18px;
  }

  .spec-label {
    font-size: 12px;
  }

  .spec-text strong {
    font-size: 13px;
  }

  .bid-button {
    min-height: 52px;
    font-size: 15px;
  }
}
</style>