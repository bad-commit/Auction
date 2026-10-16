<template>
  <div style="height: 100%; width: 100%;">
    <el-table
      :data="filterTableData"
      :default-sort="{ prop: 'timestamp', order: 'descending' }"
      style="width: 100%; height: 100%"
    >
      <el-table-column prop="timestamp" label="Дата" sortable width="180" />
      <el-table-column prop="user" label="Пользователь" width="180" />
      <el-table-column prop="amount" label="Ставка" />
      <el-table-column prop="title" label="Автомобиль" sortable />

      <el-table-column>
        <template #header>
        <el-input v-model="search" size="small" placeholder="Наименование автомобиля" />
      </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type {Bid} from '../types/bid'
import { useLotsStore } from '../stores/lots'

const search = ref('')

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

const filterTableData = computed(() =>
  bids.value.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase())
  )
)


console.log(lotsStore)

</script>

<style></style>
