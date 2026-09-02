<template>

  <div class="bid-form">
    <div class="bid-form__header">
      <div class="header-title">
        <div class="header-title__text">Ставка</div>
        <div class="header-title__indicator" :style="{ background: `${changeColorIndicator}` }" ></div>
      </div>
      <div class="header-time">
        <div class="timer">{{ formatTimer }}</div>
        <div class="time-bid" v-if="lotInfo?.bids"> {{ lotInfo.bids.at(-1)?.timestamp }} </div>
      </div>
    </div>

    <div class="main-bid">
      <div class="current-bid">
        <div class="current-bid__name">Текущая ставка:</div>
        <div class="current-bid__value">{{amountBid}}</div>
      </div>

      <div class="place-bid">
        <div class="step-bid">Шаг: {{ lotInfo?.step }}</div>
        <div class="btn-bid">
          <el-button type="primary" @click="makeBid">Сделать ставку</el-button>
        </div>
      </div>

    </div>

  </div>

</template>

<script lang="ts" setup>
import { ref, reactive, computed, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLotsStore } from '../stores/lots'
import type {Bid} from '../types/bid'

const lotsStore = useLotsStore().lots
const route = useRoute()
const currentLotId = route.params.id

const timer = ref(0)
let interval: ReturnType<typeof setInterval> | null = null


const formatTimer = computed (() => {
  const hours = Math.floor(timer.value / 3600)
  const minutes = Math.floor((timer.value % 3600) / 60)
  const seconds = timer.value % 60

  return [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0')
  ].join(':')

})

function stopTimer() {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

function startTimer() {

  if (interval) return

  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      stopTimer()

      if(lotInfo.value) {
        lotInfo.value.isClosed = true
      }

    }
  }, 1000)
}



const lotInfo = computed(() => {
  return lotsStore.find(lot => lot.id === Number(currentLotId))
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
    second: '2-digit'
  }

  const currentDateTime:string = new Intl.DateTimeFormat('ru-RU', options).format(date).replace(',', '')

  return currentDateTime

}



const amountBid = ref(lotInfo.value?.startPrice ?? 0)

function makeBid() {
  if (lotInfo.value) {

    const bidForm: Bid = {
      id: new Date().getTime(),
      lotId: Number(currentLotId),
      user: 'Vladislav',
      amount: amountBid.value + lotInfo.value.step,
      timestamp: getDate()
    }

    amountBid.value = bidForm.amount

    lotInfo.value?.bids.push(bidForm)
    lotInfo.value.isClosed = false


    if (timer.value === 0) {
      timer.value = 0.5 * 60
    } else {
      timer.value += 0.5 * 60
    }

    startTimer()


    console.log(bidForm.amount)
    
  }
  console.log(amountBid)

}

onUnmounted(() => {
  stopTimer()
})

const changeColorIndicator = computed(() => {
  if(lotInfo.value?.bids.length === 0 && lotInfo.value?.isClosed === true) {
    return "grey"
  } else if(lotInfo.value?.isClosed === true) {
    return "red"
  } else if(lotInfo.value?.isClosed === false) {
    return "green"
  }

})


</script>

<style lang="css" scoped>

.bid-form {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.bid-form__header {
  display: flex;
}

.header-title {
  display: flex;
}

.header-title__indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}


.header-time {
  display: flex;
  flex-direction: column;
}



.main-bid {
  display: flex;
  flex-direction: column;
}

.current-bid {
  display: flex;
  flex-direction: column;
}

.place-bid {
  display: flex;
}

</style>
