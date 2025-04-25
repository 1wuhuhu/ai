<template>
  <div class="result-container">
    <div class="image-comparison" ref="comparisonContainer">
      <img :src="processed" alt="处理后">
      <div class="comparison-slider" @mousedown="startDrag"></div>
      <img
          :src="original"
          alt="原图"
          :style="{ width: sliderPosition + '%' }"
      >
    </div>

    <button class="download-button">
      <i class="fas fa-download"></i>
      <span>下载结果</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  original: String,
  processed: String
})

const comparisonContainer = ref(null)
const sliderPosition = ref(50)

const startDrag = (e) => {
  e.preventDefault()
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
}

const handleDrag = (e) => {
  if (!comparisonContainer.value) return

  const rect = comparisonContainer.value.getBoundingClientRect()
  const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width)
  sliderPosition.value = (x / rect.width) * 100
}

const stopDrag = () => {
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
}

onMounted(() => {
  // 初始化滑块位置
  sliderPosition.value = 50
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
})
</script>