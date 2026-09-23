<template>
  <div>
    <el-table
      :data="bids"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column prop="timestamp" label="Дата" sortable width="180" />
      <el-table-column prop="user" label="Пользователь" width="180" />
      <el-table-column prop="amount" label="Ставка" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type {Bid} from '../types/bid'
import type {Lot} from '../types/lot'
// import type { TableColumnCtx } from 'element-plus'
import { useLotsStore } from '../stores/lots'

const bids = ref<Bid[]>([])
const lotsStore = useLotsStore().lots


lotsStore.forEach((lot) => {
  for(const bid of lot.bids){
    console.log(bid)
    bids.value.push(bid)
  }
  console.log(lot)
})

console.log(bids)


console.log(lotsStore)

</script>

<style></style>
