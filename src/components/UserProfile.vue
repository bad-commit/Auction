<template>

  <div class="profile-content">

    <div class="profile-header">

      <div class="profile-user">

        <el-avatar
          class="profile-avatar"
          :size="160"
          src="/src/assets/images/avatar.jpg"
        />

        <div class="user-info">

          <div class="user-info__item">
            <el-icon><User /></el-icon>
            <span>Vladislav</span>
          </div>

          <div class="user-info__item">
            <el-icon><Message /></el-icon>
            <span>test@gmail.com</span>
          </div>

          <div class="user-info__item">
            <el-icon><Iphone /></el-icon>
            <span>+79997770077</span>
          </div>

          <div class="user-info__item">
            <el-icon><Location /></el-icon>
            <span>Москва</span>
          </div>

        </div>
      </div>

      <div class="lot-stats">

        <div class="stat-card">
          <el-icon><Trophy /></el-icon>
          <span class="stat-card__label">
            Завершённых аукционов
          </span>
          <strong>{{ completedAuctions }}</strong>
        </div>

        <div class="stat-card">
          <el-icon><Van /></el-icon>
          <span class="stat-card__label">
            Всего лотов
          </span>
          <strong>{{ totalLots }}</strong>
        </div>

        <div class="stat-card">
          <el-icon><TrendCharts /></el-icon>
          <span class="stat-card__label">
            Общее число ставок
          </span>
          <strong>{{ totalBids }}</strong>
        </div>

        <div class="stat-card">
          <el-icon><DataLine /></el-icon>
          <span class="stat-card__label">
            Среднее кол-во ставок на лот
          </span>
          <strong>{{ avgLotBids }}</strong>
        </div>

      </div>
    </div>

    <div class="profile-content__main">

      <h2 class="section-title">
        Ваши достижения
      </h2>

      <div class="achievement-list">

        <div class="lot-card">

          <h3 class="lot-card__heading">
            <el-icon><Trophy /></el-icon>
            Самый популярный лот
          </h3>

          <div
            v-if="lotMostBids"
            class="lot-card__content"
          >
            <img
              class="lot-card__image"
              :src="lotMostBids.photoBase64[0]"
              alt="Автомобиль"
            />

            <div class="lot-card__footer">

              <div class="lot-card__info">
                <h4>{{ lotMostBids.title }}</h4>

                <p>
                  {{ lotMostBids.yearManufacture }}
                  • {{ lotMostBids.color }}
                </p>
              </div>

              <div class="lot-card__badge">
                <el-icon><TrendCharts /></el-icon>
                {{ lotMostBids.bids.length }} ставок
              </div>

            </div>
          </div>

          <div v-else class="empty-state">
            Нет данных
          </div>

        </div>

        <div class="lot-card">

          <h3 class="lot-card__heading">
            <el-icon><Star /></el-icon>
            Лот с самой высокой ставкой
          </h3>

          <div
            v-if="highestBidLot"
            class="lot-card__content"
          >
            <img
              class="lot-card__image"
              :src="highestBidLot.photoBase64[0]"
              alt="Автомобиль"
            />

            <div class="lot-card__footer">

              <div class="lot-card__info">
                <h4>{{ highestBidLot.title }}</h4>

                <p>
                  {{ highestBidLot.yearManufacture }}
                  • {{ highestBidLot.color }}
                </p>
              </div>

              <div class="lot-card__badge">
                {{ highestBidLot.bids.at(-1)?.amount.toLocaleString('ru-RU') }}
                ₽
              </div>

            </div>
          </div>

          <div v-else class="empty-state">
            Нет данных
          </div>

        </div>

      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLotsStore } from '../stores/lots'
import type { Lot } from '@/types/lot'
import { Star, Iphone, Trophy, Van, TrendCharts, Location, DataLine, User, Message } from '@element-plus/icons-vue'

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

  const avg = Number(totalBids.value) / Number(totalLots.value)
  return Math.round(avg * 100) / 100
})

</script>


<style scoped>

.profile-content {
  min-height: 100%;
  padding: 28px;
  color: #e8edf7;
  background: #0c111a;
  box-sizing: border-box;
}

.profile-header {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 28px;
  padding: 24px;
  background: #111925;
  border: 1px solid #243246;
  border-radius: 14px;
}

.profile-user {
  display: flex;
  align-items: center;
  gap: 28px;
  flex: 0 1 42%;
  min-width: 0;
  padding-right: 24px;
  border-right: 1px solid #29384d;
}

.profile-avatar {
  flex-shrink: 0;
  border: 3px solid #263b55;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.user-info__item {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  font-size: 17px;
  color: #c6d3e8;
}

.user-info__item .el-icon {
  flex-shrink: 0;
  font-size: 23px;
  color: #65a5ff;
}

.user-info__item span {
  overflow-wrap: anywhere;
}


.lot-stats {
  display: flex;
  flex: 1;
  gap: 14px;
  min-width: 0;
}

.stat-card {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  padding: 18px;
  background: #121c29;
  border: 1px solid #2a3a50;
  border-radius: 11px;
}

.stat-card:hover {
  background: #162235;
  border-color: #4c83c7;
}

.stat-card > .el-icon {
  font-size: 25px;
  color: #65a5ff;
}

.stat-card__label {
  min-height: 40px;
  color: #aebed6;
  font-size: 14px;
  line-height: 1.5;
}

.stat-card strong {
  font-size: 28px;
  line-height: 1.2;
  color: #f4f7ff;
}


.profile-content__main {
  margin-top: 28px;
}

.section-title {
  position: relative;
  margin: 0 0 24px;
  padding-bottom: 12px;
  color: #f0f4fc;
  font-size: 26px;
  font-weight: 700;
}

.section-title::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 48px;
  height: 4px;
  content: "";
  background: #65a5ff;
  border-radius: 4px;
}


.achievement-list {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 20px;
}


.lot-card {
  display: flex;
  flex: 1 1 380px;
  flex-direction: column;
  min-width: 0;
  padding: 20px;
  background: #111925;
  border: 1px solid #243246;
  border-radius: 13px;
}

.lot-card:hover {
  transform: translateY(-3px);
  border-color: #426da5;
  box-shadow: 0 10px 28px rgb(0 0 0 / 20%);
}

.lot-card__heading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 18px;
  font-size: 18px;
  line-height: 1.4;
  color: #eaf1ff;
}

.lot-card__heading .el-icon {
  flex-shrink: 0;
  font-size: 25px;
  color: #65a5ff;
}


.lot-card__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.lot-card__image {
  display: block;
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 9px;
  background: #1b2635;
}


.lot-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 16px;
}

.lot-card__info {
  min-width: 0;
}

.lot-card__info h4 {
  margin: 0 0 7px;
  color: #f0f4fc;
  font-size: 19px;
  overflow-wrap: anywhere;
}

.lot-card__info p {
  margin: 0;
  color: #9eafc9;
  font-size: 15px;
}


.lot-card__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  color: #e5efff;
  background: #17283d;
  border: 1px solid #294c73;
  border-radius: 24px;
  font-size: 14px;
  white-space: nowrap;
}

.lot-card__badge .el-icon {
  color: #65a5ff;
}


.empty-state {
  margin: auto 0;
  padding: 40px 0;
  color: #8c9bb1;
  text-align: center;
}





@media (max-width: 1200px) {
  .profile-header {
    flex-direction: column;
  }

  .profile-user {
    flex-basis: auto;
    padding: 0 0 24px;
    border-right: none;
    border-bottom: 1px solid #29384d;
  }

  .lot-stats {
    flex-wrap: wrap;
  }

  .stat-card {
    flex-basis: 180px;
  }
}


@media (max-width: 700px) {
  .profile-content {
    padding: 14px;
  }

  .profile-header {
    padding: 16px;
  }

  .profile-user {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .user-info {
    width: 100%;
  }

  .user-info__item {
    font-size: 15px;
  }

  .lot-stats {
    gap: 10px;
  }

  .stat-card {
    flex-basis: calc(50% - 10px);
    box-sizing: border-box;
    padding: 12px;
  }

  .stat-card strong {
    font-size: 24px;
  }

  .achievement-list {
    flex-direction: column;
  }

  .lot-card {
    flex: auto;
    width: 100%;
    box-sizing: border-box;
    padding: 14px;
  }

  .lot-card__image {
    height: 200px;
  }

  .lot-card__footer {
    align-items: flex-start;
    flex-direction: column;
  }
}

</style>
