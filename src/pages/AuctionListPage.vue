<template>
  <div class="content">

    <div class="header-content">
        <el-dropdown @command="handleFilter">

          <el-button>
            <el-icon><Filter /></el-icon>
          </el-button>

          <template #dropdown>
            <el-dropdown-menu>

              <el-dropdown-item command="all">
                Все
              </el-dropdown-item>

              <el-dropdown-item command="open">
                Открытые
              </el-dropdown-item>

              <el-dropdown-item command="closed">
                Закрытые
              </el-dropdown-item>

            </el-dropdown-menu>
          </template>

        </el-dropdown>

        <div class="btn-with-hint">
          <div class="hint-create__lot">Создать лот</div>
          <el-button type="primary" icon=Plus @click="$router.push('/add-lot')">Добавить</el-button>
        </div>
    </div>
    

    <div class="auction-cards">
      <AuctionCards :filter="filter" />
    </div>

  </div>
  
</template>

<script lang="ts" setup>

import {ref} from 'vue'
import AuctionCards from '../components/AuctionCards.vue'

const filter = ref('all')

const handleFilter = (value: string) => {
  filter.value = value
  // console.log(filter.value)
}

</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
}

.header-content{
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px
}

.btn-with-hint {
  display: flex;
  position: relative
}

.hint-create__lot {
  font-weight: 500;
  font-size: 14px;
  visibility: hidden;
  position: absolute;
  top: 104%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 2px 5px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 1.5s;
}

.btn-with-hint:hover .hint-create__lot {
  visibility: visible;
  opacity: 1;
}

</style>