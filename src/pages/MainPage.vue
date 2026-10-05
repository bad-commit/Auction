<template>
  <el-main>
    <el-tabs :tab-position="tabPosition" v-model="activeTab" style="height: 100%" class="demo-tabs">
      <el-tab-pane name="/" label="Главная" title="Лоты">
        <template #label>
          <div class="custom-tab-label__profile">
            <div class="hint-box">Главная</div>
            <el-icon style="font-size: 50px">
              <House />
            </el-icon>
          </div>
        </template>
      </el-tab-pane>

      <el-tab-pane name="/stats" label="Статистика">
        <template #label>
          <div class="custom-tab-label__profile">
            <div class="hint-box">История ставок</div>
            <el-icon style="font-size: 50px">
              <PieChart />
            </el-icon>
          </div>
        </template>
      </el-tab-pane>

      <el-tab-pane name="/profile" label="Профиль">
        <template #label>
          <div class="custom-tab-label__profile">
            <div class="hint-box">Профиль</div>
            <el-icon style="font-size: 50px">
              <User />
            </el-icon>
          </div>
        </template>
      </el-tab-pane>
      <RouterView />
    </el-tabs>
  </el-main>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { TabsInstance } from 'element-plus'


const tabPosition = ref<TabsInstance['tabPosition']>('left')

const route = useRoute()
const router = useRouter()

const activeTab = computed({
  get() {
    if (route.path === '/add-lot') {
      return '/'
    }

    return route.path
  },
  set(path) {
    router.push(path)
  }
})

onMounted(() => {
  router.replace('/')
})

</script>

<style>
.el-main {
  height: 100%;
}

.el-tabs {
  --el-tabs-header-height: 70px !important;
}

.demo-tabs > .el-tabs__content {
  padding: 5px 10px 10px 10px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.el-tabs--left .el-tabs__nav-wrap.is-left {
  width: 150px;
}

.el-tabs--left .el-tabs__nav.is-left {
  width: 150px;
}

.el-tabs--left .el-tabs__item.is-left {
  justify-content: center !important;
}

.el-tabs__item {
  padding: 0 !important;
}

.custom-tab-label__profile {
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.hint-box {
  visibility: hidden;
  position: absolute;
  top: 87%;
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

.custom-tab-label__profile:hover .hint-box {
  visibility: visible;
  opacity: 1;
}


</style>
