<template>
  <el-form ref="ruleFormRef" style="max-width: 600px" :model="lotForm" label-width="200px">
    <el-form-item label="Наименование" prop="title">
      <el-input v-model="lotForm.title" />
    </el-form-item>

    <el-form-item label="Начальная цена" prop="startPrice">
      <el-input-number v-model="lotForm.startPrice"/>
    </el-form-item>

    <el-form-item label="Описание" prop=" description">
      <el-input v-model="lotForm.description" type="textarea" />
    </el-form-item>

    <div class="upload-image">

      <el-upload action="#" list-type="picture-card" :auto-upload="false" v-model:file-list="lotForm.photo">
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

    </div>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"> Create </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {useLotsStore} from '../stores/lots'
import type { FormInstance, UploadFile } from 'element-plus'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { Lot } from '../types/lot'

const router = useRouter()

const ruleFormRef = ref<FormInstance>()
const lotForm = reactive<Lot>({
  id: new Date().getTime(),
  title: '',
  description: '',
  startPrice: 1000,
  photo: [],
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
}




const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)


// const handleChange = (file: UploadFile) => {
//   // lotForm.photo.push(file)
//   console.log(lotForm)
// }

const handleRemove = (file: UploadFile) => {

  console.log(lotForm)

  const index = lotForm.photo.findIndex(
    item => item.uid === file.uid
  )

  if (index > -1) {
    lotForm.photo.splice(index, 1)
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