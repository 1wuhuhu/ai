<template>
  <div class="function-area">
    <div class="function-header">
      <div>
        <h2 class="function-title">超分辨率</h2>
        <p class="function-desc">提升图片分辨率，修复模糊细节</p>
      </div>
    </div>

    <FileUpload
        @files-selected="handleFiles"
        accept="image/*"
        class="upload-area"
    />

    <OptionsPanel
        v-if="uploadedImage"
        :options="options"
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

const options = ref({
  scale: {
    label: '放大倍数',
    type: 'radio',
    value: '2x',
    options: [
      { label: '2×', value: '2x' },
      { label: '4×', value: '4x' },
      { label: '8×', value: '8x' }
    ]
  },
  denoise: {
    label: '降噪强度',
    type: 'slider',
    value: 50,
    min: 0,
    max: 100
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
  processedImage.value = uploadedImage.value + '?processed=' + Date.now()
}
</script>

<style scoped>
.upload-area {
  margin-top: 20px;
  height: 300px;
}
</style>