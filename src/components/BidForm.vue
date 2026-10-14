<template>
  <div class="auction-header">
    <span
      class="auction-status"
      :class="{
        'is-open': changeColorIndicator === 'green',
        'is-closed': changeColorIndicator === 'red',
        'is-closed-empty': changeColorIndicator === 'grey',
      }"
    >
      <span
        class="status-dot"
        :style="{
          backgroundColor: changeColorIndicator,
          boxShadow: `0 0 10px ${changeColorIndicator}`,
        }"
      ></span>

      {{
        changeColorIndicator === 'grey'
          ? 'Аукцион еще не начался'
          : changeColorIndicator === 'red'
            ? 'Аукцион закрыт'
            : 'Аукцион открыт'
      }}
    </span>

    <span class="lot-number"> № {{ lotInfo?.id }} </span>
  </div>


  <div class="auction-timer">
    <span class="auction-icon"><img src="../assets/icons/clock.svg" alt=""></span>

    <div class="auction-timer-info">
      <span class="section-label"> До окончания аукциона </span>

      <strong class="timer-value">
        {{ formatTimer }}
      </strong>

      <span class="auction-date">
        {{ lotInfo?.bids.at(-1)?.timestamp ?? 'Ставок пока нет' }}
      </span>
    </div>
  </div>


  <div class="bid-summary">
    <span class="auction-icon"><img src="../assets/icons/coins.svg" alt=""></span>

    <div class="bid-info">
      <span class="section-label">Текущая ставка</span>

      <strong class="bid-value">
        {{ amountBid.toLocaleString('ru-RU') }}
        ₽
      </strong>

      <span class="bid-step">
        Шаг ставки:
        {{ lotInfo?.step.toLocaleString('ru-RU') }} ₽
      </span>
    </div>
  </div>

  <el-button :disabled="isDisabledButton" type="primary" @click="makeBid">Сделать ставку</el-button>

</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLotsStore } from '../stores/lots'
import type { Bid } from '../types/bid'

const lotsStore = useLotsStore().lots
const route = useRoute()
const currentLotId = route.params.id

const remainingTime = ref()
let interval: ReturnType<typeof setInterval> | null = null

const formatTimer = computed(() => {
  const totalSeconds = Math.floor(remainingTime.value / 1000)

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0'),
  ].join(':')
})

const lotInfo = computed(() => {
  return lotsStore.find((lot) => lot.id === Number(currentLotId))
})

function getDate() {
  const date = new Date()

  const options: object = {
    timeZone: 'Europe/Moscow',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }

  const currentDateTime: string = new Intl.DateTimeFormat('ru-RU', options)
    .format(date)
    .replace(',', '')

  return currentDateTime
}

const amountBid = ref(lotInfo.value?.bids.at(-1)?.amount ?? lotInfo.value?.startPrice ?? 0)

function makeBid() {
  if (lotInfo.value) {
    const bidForm: Bid = {
      id: new Date().getTime(),
      lotId: Number(currentLotId),
      user: 'Vladislav',
      amount: amountBid.value + lotInfo.value.step,
      timestamp: getDate(),
    }

    amountBid.value = bidForm.amount

    lotInfo.value?.bids.push(bidForm)
    lotInfo.value.isClosed = false

    if (!lotInfo.value.timerEnd) {
      lotInfo.value.timerEnd = Date.now() + 0.5 * 60 * 1000
    } else {
      lotInfo.value.timerEnd += 0.5 * 60 * 1000
    }

    console.log(bidForm.amount)
  }
  console.log(amountBid)
}

const updateTimer = () => {
  if (!lotInfo.value?.timerEnd) {
    remainingTime.value = 0
    return
  }

  const remaining = lotInfo.value.timerEnd - Date.now()

  if (remaining <= 0) {
    remainingTime.value = 0
    lotInfo.value.isClosed = true

    if (interval) {
      clearInterval(interval)
      interval = null
    }

    return
  }

  remainingTime.value = remaining
}

onMounted(() => {
  updateTimer()
  interval = setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
})

const changeColorIndicator = computed(() => {
  if (lotInfo.value?.bids.length === 0 && lotInfo.value?.isClosed === true) {
    return 'grey'
  } else if (lotInfo.value?.isClosed === true) {
    return 'red'
  } else if (lotInfo.value?.isClosed === false) {
    return 'green'
  }
})

const isDisabledButton = computed(() => {
  if(lotInfo.value?.isClosed === true && lotInfo.value?.bids.length > 0) {
    return true
  } else false
})

</script>

<style lang="css" scoped>

.auction-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.auction-status {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 9px 14px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 650;
}

.is-open {
  background: rgba(0, 190, 112, 0.15);
  color: #52e6a0;
}

.is-closed {
  background: rgba(255, 75, 88, 0.14);
  color: #ff7d87;
}

.is-closed-empty {
  background: rgba(158, 158, 158, 0.14);
  color: #a0a0a0;
}

.status-dot {
  width: 9px;
  height: 9px;
  flex-shrink: 0;
  border-radius: 50%;
}

.lot-number {
  padding: 9px 13px;
  border: 1px solid #233b57;
  border-radius: 12px;
  background: #14243a;
  color: #e3edff;
  font-size: 13px;
  font-weight: 700;
}



.auction-timer {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.auction-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #142943;
  color: #48a5ff;
  font-size: 27px;
}

.auction-timer-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
}

.section-label {
  color: #98b1d2;
  font-size: 14px;
  line-height: 1.5;
}

.timer-value {
  color: #ffffff;
  font-size: clamp(25px, 2vw, 34px);
  font-weight: 750;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.5px;
}

.auction-date {
  color: #93aac9;
  font-size: 13px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}



.bid-summary {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px;
  border: 1px solid #203955;
  border-radius: 14px;
  background: #0d1b2d;
}

.bid-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
}

.bid-value {
  color: #ffffff;
  font-size: clamp(22px, 2vw, 30px);
  font-weight: 750;
  overflow-wrap: anywhere;
}

.bid-step {
  color: #9eb5d5;
  font-size: 14px;
  line-height: 1.5;
}
</style>
