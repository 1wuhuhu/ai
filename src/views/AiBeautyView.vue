<template>
  <div class="function-area">
    <div class="function-header">
      <div>
        <h2 class="function-title">AI美颜</h2>
        <p class="function-desc">智能美化人像，一键提升颜值</p>
      </div>
    </div>

    <FileUpload
        @files-selected="handleFiles"
        accept="image/*"
        class="upload-area"
        hint="请上传人像照片"
    />

    <OptionsPanel
        v-if="uploadedImage"
        :options="beautyOptions"
        @process="handleProcess"
    />

    <ImageComparison
        v-if="processedImage"
        :original="uploadedImage"
        :processed="processedImage"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FileUpload from '@/components/features/FileUpload.vue'
import OptionsPanel from '@/components/features/OptionsPanel.vue'
import ImageComparison from '@/components/features/ImageComparison.vue'

const uploadedImage = ref(null)
const processedImage = ref(null)

const beautyOptions = ref({
  intensity: {
    label: '美化强度',
    type: 'slider',
    value: 50,
    min: 0,
    max: 100
  },
  features: {
    label: '美化选项',
    type: 'checkbox',
    options: [
      { label: '皮肤平滑', value: 'smooth', checked: true },
      { label: '祛痘祛斑', value: 'blemish', checked: true },
      { label: '大眼', value: 'eyes', checked: false }
    ]
  },
  style: {
    label: '风格滤镜',
    type: 'radio',
    value: 'natural',
    options: [
      { label: '自然', value: 'natural' },
      { label: '清新', value: 'fresh' }
    ]
  }
})

const handleFiles = (files) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    uploadedImage.value = e.target.result
    processedImage.value = null
  }
  reader.readAsDataURL(files[0])
}

const handleProcess = (params) => {
  // 模拟处理过程
  processedImage.value = uploadedImage.value + '?beauty=' + Date.now()
}
</script>