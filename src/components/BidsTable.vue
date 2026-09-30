<template>
  <div style="height: 100%; width: 100%;">
    <el-table
      :data="bids"
      :default-sort="{ prop: 'timestamp', order: 'descending' }"
      style="width: 100%; height: 100%"
    >
      <el-table-column prop="timestamp" label="Дата" sortable width="180" />
      <el-table-column prop="user" label="Пользователь" width="180" />
      <el-table-column prop="amount" label="Ставка" />
      <el-table-column prop="title" label="Автомобиль" sortable />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type {Bid} from '../types/bid'
import type {Lot} from '../types/lot'
import { useLotsStore } from '../stores/lots'

interface BidWithTitle extends Bid {
  title: string
}

const lotsStore = useLotsStore().lots

const bids = computed<BidWithTitle[]>(() =>
  lotsStore.flatMap(lot =>
    lot.bids.map(bid => ({
      ...bid,
      title: lot.title
    }))
    
  )
  
)

console.log(lotsStore)

</script>

<style></style>
