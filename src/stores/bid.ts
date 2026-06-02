import { defineStore } from 'pinia'
import {ref} from 'vue'
import type { Bid } from '../types/bid'

export const useLotsStore = defineStore("bidssStore", () => {
    const bids = ref<Bid[]>([])

    return {
        bids
    }
})