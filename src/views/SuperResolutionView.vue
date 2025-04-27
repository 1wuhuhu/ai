<template>
  <div class="super-resolution-view">
    <!-- 标题区 -->
    <div class="header">
      <h1><i class="fas fa-search-plus"></i> 超分辨率增强</h1>
      <p class="subtitle">提升图像分辨率，修复模糊细节</p>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 上传区 -->
      <div class="upload-section" :class="{ 'has-image': originalImage }">
        <div v-if="!originalImage" class="upload-box" @click="triggerFileInput">
          <i class="fas fa-cloud-upload-alt"></i>
          <p>拖放图片到此处或点击上传</p>
          <small>支持 JPG/PNG 格式，最大 10MB</small>
          <input
              type="file"
              ref="fileInput"
              @change="handleFileUpload"
              accept="image/*"
              hidden
          >
        </div>

        <!-- 上传后的预览 -->
        <div v-else class="image-preview">
          <img :src="originalImage" alt="原始图片">
          <div class="preview-actions">
            <button @click="replaceImage" class="action-btn">
              <i class="fas fa-sync-alt"></i> 更换图片
            </button>
            <button @click="originalImage = null" class="action-btn">
              <i class="fas fa-trash"></i> 移除
            </button>
          </div>
        </div>
      </div>

      <!-- 处理参数面板 -->
      <div v-if="originalImage" class="control-panel">
        <h3><i class="fas fa-sliders-h"></i> 增强设置</h3>

        <div class="option-group">
          <label>放大倍数</label>
          <div class="option-buttons">
            <button
                v-for="scale in [2, 4, 8]"
                :key="scale"
                :class="{ active: scaleFactor === scale }"
                @click="scaleFactor = scale"
            >
              {{ scale }}×
            </button>
          </div>
        </div>

        <div class="option-group">
          <label>降噪强度: {{ denoiseLevel }}</label>
          <input
              type="range"
              v-model="denoiseLevel"
              min="0"
              max="100"
              step="5"
          >
        </div>

        <div class="option-group">
          <label>锐化强度: {{ sharpenLevel }}</label>
          <input
              type="range"
              v-model="sharpenLevel"
              min="0"
              max="100"
              step="5"
          >
        </div>

        <button
            @click="processImage"
            :disabled="isProcessing"
            class="process-btn"
        >
          <i class="fas fa-cog" :class="{ 'fa-spin': isProcessing }"></i>
          {{ isProcessing ? '处理中...' : '开始增强' }}
        </button>
      </div>

      <!-- 结果展示区 -->
      <div v-if="processedImage" class="result-section">
        <h3><i class="fas fa-image"></i> 效果对比</h3>
        <div class="comparison-container">
          <div class="image-wrapper">
            <p>原始图片 ({{ originalWidth }}×{{ originalHeight }})</p>
            <img :src="originalImage" alt="原始图片">
          </div>
          <div class="image-wrapper">
            <p>增强结果 ({{ processedWidth }}×{{ processedHeight }})</p>
            <img :src="processedImage" alt="增强结果">
          </div>
        </div>

        <div class="result-actions">
          <button @click="downloadResult" class="download-btn">
            <i class="fas fa-download"></i> 下载结果
          </button>
          <div class="format-options">
            <label>保存格式:</label>
            <select v-model="downloadFormat">
              <option value="png">PNG (高质量)</option>
              <option value="jpeg">JPEG (较小体积)</option>
              <option value="webp">WebP (平衡)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// 图片状态
const originalImage = ref(null)
const processedImage = ref(null)
const fileInput = ref(null)
const isProcessing = ref(false)

// 图片尺寸信息
const originalWidth = ref(0)
const originalHeight = ref(0)
const processedWidth = ref(0)
const processedHeight = ref(0)

// 处理参数
const scaleFactor = ref(2)
const denoiseLevel = ref(50)
const sharpenLevel = ref(50)
const downloadFormat = ref('png')

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value.click()
}

// 处理文件上传
const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return

  if (file.size > 10 * 1024 * 1024) {
    alert('文件大小超过10MB限制')
    return
  }

  const reader = new FileReader()
  reader.onload = (event) => {
    const img = new Image()
    img.onload = () => {
      originalWidth.value = img.width
      originalHeight.value = img.height
      originalImage.value = event.target.result
      processedImage.value = null
    }
    img.src = event.target.result
  }
  reader.readAsDataURL(file)
}

// 更换图片
const replaceImage = () => {
  originalImage.value = null
  processedImage.value = null
  triggerFileInput()
}

// 处理图片 (模拟)
const processImage = () => {
  isProcessing.value = true

  // 模拟处理延迟
  setTimeout(() => {
    processedWidth.value = originalWidth.value * scaleFactor.value
    processedHeight.value = originalHeight.value * scaleFactor.value

    // 在实际应用中替换为真实的AI处理结果
    processedImage.value = `${originalImage.value}?processed=${Date.now()}&scale=${scaleFactor.value}&denoise=${denoiseLevel.value}&sharpen=${sharpenLevel.value}`

    isProcessing.value = false
  }, 1500)
}

// 下载结果
const downloadResult = () => {
  // 实际应用中需要实现真实的下载逻辑
  alert(`将下载 ${processedWidth.value}×${processedHeight.value} 的 ${downloadFormat.value.toUpperCase()} 图片`)

  // 模拟下载
  const link = document.createElement('a')
  link.href = processedImage.value
  link.download = `super-resolution-result.${downloadFormat.value}`
  link.click()
}

// 监听放大倍数变化
watch(scaleFactor, (newVal) => {
  if (processedImage.value) {
    processedWidth.value = originalWidth.value * newVal
    processedHeight.value = originalHeight.value * newVal
  }
})
</script>

<style scoped>
.super-resolution-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: var(--primary);
  font-size: 2rem;
  margin-bottom: 8px;
}

.subtitle {
  color: var(--gray);
  font-size: 1.1rem;
}

.main-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 30px;
}

.upload-section {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  transition: all 0.3s;
  margin-bottom: 30px;
}

.upload-section.has-image {
  border-color: var(--primary-light);
  background: #f8faff;
}

.upload-box {
  cursor: pointer;
}

.upload-box i {
  font-size: 48px;
  color: var(--primary);
  margin-bottom: 15px;
}

.upload-box p {
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.upload-box small {
  color: var(--gray);
}

.image-preview {
  position: relative;
}

.image-preview img {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.preview-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.action-btn {
  padding: 8px 16px;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn:hover {
  background: #e0e0e0;
}

.control-panel {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.control-panel h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 10px;
}

.option-group {
  margin-bottom: 25px;
}

.option-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
}

.option-buttons {
  display: flex;
  gap: 10px;
}

.option-buttons button {
  flex: 1;
  padding: 10px;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.option-buttons button.active {
  background: var(--primary);
  color: white;
}

input[type="range"] {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e0e0e0;
  outline: none;
}

.process-btn {
  width: 100%;
  padding: 12px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.process-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.result-section {
  margin-top: 30px;
}

.result-section h3 {
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 10px;
}

.comparison-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

.image-wrapper {
  text-align: center;
}

.image-wrapper p {
  margin-bottom: 10px;
  font-weight: 500;
}

.image-wrapper img {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.result-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.download-btn {
  padding: 12px 24px;
  background: var(--success);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}

.format-options {
  display: flex;
  align-items: center;
  gap: 10px;
}

.format-options select {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .comparison-container {
    grid-template-columns: 1fr;
  }

  .result-actions {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}
</style>