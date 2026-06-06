<template>
  <el-form ref="ruleFormRef" style="max-width: 600px" :model="lotForm" label-width="200px">
    <el-form-item label="Наименование" prop="title">
      <el-input v-model="lotForm.title" />
    </el-form-item>

    <el-form-item label="Год выпуска" prop="yearManufacture">
      <el-input v-model="lotForm.yearManufacture" />
    </el-form-item>

    <el-form-item label="Цвет" prop="color">
      <el-input v-model="lotForm.color" />
    </el-form-item>

    <el-form-item label="Привод" prop="drive">
      <el-select v-model="lotForm.drive" clearable placeholder="Выбрать значение">
        <el-option
          v-for="item in drive"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Тип двигателя" prop="engineType">
      <el-select v-model="lotForm.engineType" clearable placeholder="Выбрать значение">
        <el-option
          v-for="item in engineType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Объем двигателя" prop="engineDisplacement">
      <el-select v-model="lotForm.engineDisplacement" clearable placeholder="Выбрать значение">
        <el-option
          v-for="item in engineDisplacement"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Мощность" prop="power">
      <el-input v-model="lotForm.power" placeholder="л.с." />
    </el-form-item>

    <el-form-item label="Пробег" prop="mileage">
      <el-input v-model="lotForm.mileage" placeholder="км" />
    </el-form-item>

    <el-form-item label="Описание" prop="description">
      <el-input v-model="lotForm.description" type="textarea" />
    </el-form-item>

    <el-form-item label="Начальная цена" prop="startPrice">
      <el-input-number v-model="lotForm.startPrice" />
    </el-form-item>

    <el-form-item label="Шаг ставки" prop="step">
      <el-input-number v-model="lotForm.step" />
    </el-form-item>

    <div class="upload-image">
      <el-form-item label="Фото" prop="photo">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          v-model:file-list="lotForm.photo"
          :on-change="handleChange"
        >
          <el-icon><Plus /></el-icon>

          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <el-icon><Download /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
    </div>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"> Создать </el-button>
      <el-button @click="resetForm(ruleFormRef)">Сбросить</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useLotsStore } from '../stores/lots'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import { drive, engineType, engineDisplacement } from '../assets/optionsForm'
import type { FormInstance, UploadFile } from 'element-plus'
import type { Lot } from '../types/lot'

const router = useRouter()

const ruleFormRef = ref<FormInstance>()
const lotForm = reactive<Lot>({
  id: new Date().getTime(),
  title: '',
  yearManufacture: null,
  color: '',
  description: '',
  drive: '',
  engineType: '',
  engineDisplacement: null,
  power: null,
  mileage: null,
  startPrice: 10000,
  step: 2000,
  photo: [],
  photoBase64: [],
  isClosed: false,
  bids: [],
})

const lotsStore = useLotsStore()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
    if (valid) {
      lotsStore.lots.push(lotForm)
      router.push('/')
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  lotForm.photo = []
  lotForm.photoBase64 = []
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleChange = (UploadFile: UploadFile) => {
  const reader = new FileReader()
  const file = UploadFile.raw

  if (!file) return

  reader.onload = function () {
    lotForm.photoBase64.push(reader.result as string)
  }

  reader.readAsDataURL(file)

  console.log(lotForm)
}

const handleRemove = (file: UploadFile) => {
  console.log(lotForm)

  const index = lotForm.photo.findIndex((item) => item.uid === file.uid)

  if (index > -1) {
    lotForm.photo.splice(index, 1)
    lotForm.photoBase64.splice(index, 1)
  }

  console.log(file)
  console.log(lotForm)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}
</script>

<style></style>
