<template>
  <div class="content">
    <div class="header-content">
      <el-dropdown @command="handleFilter">
        <el-button>
          <el-icon><Filter /></el-icon>
        </el-button>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="all"> Все </el-dropdown-item>

            <el-dropdown-item command="open"> Открытые </el-dropdown-item>

            <el-dropdown-item command="closed"> Закрытые </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="btn-with-hint">
        <div class="hint-create__lot">Создать лот</div>
        <el-button type="primary" icon="Plus" @click="$router.push('/add-lot')">Добавить</el-button>
      </div>
    </div>

    <div class="auction-cards">
      <AuctionCards :filter="filter" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
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
  width: 100%;
  height: 100%;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7%;
  margin-bottom: 1em;
}

.header-content .el-dropdown {
  height: 2.8rem;
  width: 2.8rem;
}

.header-content .el-button {
  height: 2.8rem;
  width: 2.8rem;
  font-size: 1.8rem;
}

.btn-with-hint {
  display: flex;
  position: relative;
  height: 2.5rem;
  width: 8rem;
}

.btn-with-hint .el-button {
  font-size: 50%;
  height: 100%;
  width: 100%;
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

.auction-cards {
  height: 93%;
  width: 99%;
  padding: 1% 1% 0;
  overflow-y: scroll;
}
</style>