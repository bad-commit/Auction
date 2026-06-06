<template>

  <ul class="auction-cards-list">

    <li class="auction-card" v-for="lot in getLots" :key="lot.id"> <!-- тут будет v-for -->

      <!-- {{ lot }} -->


      <div class="card-info">

        <ul class="card-info-images-list" v-for="(image, index) in lot.photoBase64" :key="index">

          <li class="card-info-image">
            <img class="card-info__img" :src="image" alt="" />
          </li>

        </ul>

        <div>
          Название
        </div>

        <div>
          Год, привод, объем, мощность
        </div>

      </div>


      <div class="auction-bid"></div> <!-- тут будет компонент блока ставок -->

    </li>

  </ul>

</template>

<script lang="ts" setup>

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLotsStore } from '../stores/lots'

const router = useRouter()
const lotsStore = useLotsStore()

const getLots = computed(function () {
  console.log(lotsStore.lots)
  return lotsStore.lots
})

</script >

<style lang="css" scoped>

.card-info-image {
  height: 100px;
  width: 150px;
}

</style>
