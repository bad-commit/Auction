<template>

  <div class="bid-form">
    <div class="bid-form__header">
      <div class="header-title">
        <div class="header-title__text">Ставка</div>
        <div class="header-title__indicator"></div>
      </div>
      <div class="header-time">
        <div class="timer">hh mm ss</div>
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
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLotsStore } from '../stores/lots'
import type {Bid} from '../types/bid'

const lotsStore = useLotsStore().lots
const route = useRoute()
const currentLotId = route.params.id


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


// const lotForm: any = reactive<Bid>({
//   id: new Date().getTime(),
//   lotId: 1,
//   user: 'Vladislav',
//   amount: amountBid, // общая сумма после ставки  1) sum = current + step -> 2) sum = sum + step (спросить по поводу 1) и 2) с использованием if - при первой ставки 1), а потом при каждом нажатии 2) )
//   timestamp: 1
// })



// const bidForm: Bid = reactive<Bid>({
//   id: null,
//   lotId: Number(currentLotId),
//   user: 'Vladislav',
//   amount: null,
//   timestamp: null
// })



const amountBid = ref(lotInfo.value?.startPrice ?? 0)

function makeBid() {
  if (lotInfo.value) {

    // const id = new Date().getTime()
    // const time = getDate()

    // amountBid.value += lotInfo.value.step
    // bidForm.amount = amountBid.value
    // bidForm.timestamp = time
    // bidForm.id = id


    const bidForm: Bid = {
    id: new Date().getTime(),
    lotId: Number(currentLotId),
    user: 'Vladislav',
    amount: amountBid.value + lotInfo.value.step,
    timestamp: getDate()
    }

    amountBid.value = bidForm.amount

    lotInfo.value?.bids.push(bidForm)

    console.log(bidForm.amount)
    // console.log(time)
    
  }
  console.log(amountBid)
  // console.log(bidForm)
}



// Попробовать с помощью get и set объеденить логику makeBid и amountBid (или нет - надо думать)

// if(lotInfo.value) {
//   let startBidValue = lotInfo.value.startPrice
//   const bidValue = lotInfo.value.step

//   const amountBid = computed({

//     get() {
//       return startBidValue
//     },
//     set(value) {
//       return startBidValue = value + bidValue
//     }

//     // if(lotInfo.value.bids.length === 0) {
//     //   return startBidValue
//     // } else {
//     //   return startBidValue = startBidValue + bidValue
//     //   // return lotForm.amount = startBidValue
//     // }

    
//   })
//   console.log(amountBid.value)

// }



// const makeBid = (amountBid: number) => {
//   // console.log(lotInfo.value)

//   if(lotInfo.value) {

//     // if(lotInfo.value.bids.length === 0) {
//     //   console.log('НОЛЬ')
//     //   console.log(lotInfo.value.bids.length)
//     // } else {
//     //   console.log('НЕ НОЛЬ')
//     //   console.log(lotInfo.value.bids.length)
//     // }

//     lotForm.value.amount = amountBid

//     console.log(lotForm.value.amount)

//     console.log(lotInfo.value)


//   }

// }

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
  background-color: green;
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
