import { defineStore } from 'pinia'
import {ref} from 'vue'
import type { Lot } from '../types/lot'

export const useLotsStore = defineStore("lotsStore", () => {
    const lots = ref<Lot[]>([])

    return {
        lots
    }
})