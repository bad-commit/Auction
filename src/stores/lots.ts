import { defineStore } from 'pinia'
import {ref, watch} from 'vue'
import type { Lot } from '../types/lot'

export const useLotsStore = defineStore("lotsStore", () => {
  const lots = ref<Lot[]>([])

  const lotsInLocalStorage = localStorage.getItem("lots")
  if(lotsInLocalStorage) {
    lots.value = JSON.parse(lotsInLocalStorage)
  }

  watch(() => lots, (state) => {
    localStorage.setItem('lots', JSON.stringify(state.value))
  }, {deep: true})

  return {
    lots
  }
})