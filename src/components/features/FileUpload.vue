<template>
  <div class="upload-area" @click="triggerFileInput" @dragover.prevent="isDragging = true" @dragleave="isDragging = false" @drop.prevent="handleDrop" :class="{ 'dragging': isDragging }">
    <input type="file" ref="fileInput" @change="handleFiles" :accept="accept" multiple style="display: none">
    <i class="fas fa-cloud-upload-alt upload-icon"></i>
    <div class="upload-text">{{ dragText }}</div>
    <div class="upload-hint">支持 {{ acceptTypes }} 格式，最大 {{ maxSizeMB }}MB</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// eslint-disable-next-line no-undef
const props = defineProps({
  accept: {
    type: String,
    default: 'image/*'
  },
  maxSizeMB: {
    type: Number,
    default: 10
  }
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['files-selected'])

const fileInput = ref(null)
const isDragging = ref(false)

const acceptTypes = computed(() => {
  return props.accept.split(',').map(t => t.replace('/*', '')).join('、')
})

const dragText = computed(() => {
  return isDragging.value ? '松开鼠标上传文件' : '拖放文件到此处或点击上传'
})

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFiles = (e) => {
  processFiles(e.target.files)
  e.target.value = '' // 重置以允许重复选择相同文件
}

const handleDrop = (e) => {
  isDragging.value = false
  if (e.dataTransfer.files.length) {
    processFiles(e.dataTransfer.files)
  }
}

const processFiles = (files) => {
  const validFiles = Array.from(files).filter(file => {
    const isValidType = props.accept === '*' ||
        props.accept.split(',').some(type => {
          if (type.endsWith('/*')) {
            return file.type.startsWith(type.replace('/*', '/'))
          }
          return file.type === type
        })

    const isValidSize = file.size <= props.maxSizeMB * 1024 * 1024

    if (!isValidType) alert(`不支持的文件类型: ${file.type}`)
    if (!isValidSize) alert(`文件大小超过限制: ${(file.size / (1024 * 1024)).toFixed(2)}MB`)

    return isValidType && isValidSize
  })

  if (validFiles.length) {
    emit('files-selected', validFiles)
  }
}
</script>

<style scoped>
.dragging {
  border-color: var(--primary);
  background-color: #f0f4ff;
}
</style>