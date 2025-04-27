<template>
  <div class="ai-beauty-view">
    <!-- 标题区 -->
    <div class="header">
      <h1><i class="fas fa-magic"></i> AI美颜</h1>
      <p class="subtitle">智能人脸美化，一键提升颜值</p>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 上传区 -->
      <div class="upload-section" :class="{ 'has-image': originalImage }">
        <div v-if="!originalImage" class="upload-box" @click="triggerFileInput">
          <i class="fas fa-portrait"></i>
          <p>上传人像照片</p>
          <small>支持 JPG/PNG 格式，建议正面清晰人脸</small>
          <input
              type="file"
              ref="fileInput"
              @change="handleFileUpload"
              accept="image/*"
              hidden
          >
        </div>

        <!-- 上传后的编辑区 -->
        <div v-else class="edit-area">
          <div class="image-container">
            <img
                :src="processedImage || originalImage"
                alt="美颜效果"
                ref="imageElement"
                @load="detectFaces"
            >
            <div v-if="faceLandmarks.length" class="face-overlay">
              <div
                  v-for="(landmark, index) in faceLandmarks"
                  :key="index"
                  class="landmark-point"
                  :style="{
                  left: `${landmark.x}%`,
                  top: `${landmark.y}%`
                }"
              ></div>
            </div>
          </div>

          <div class="image-actions">
            <button @click="replaceImage" class="action-btn">
              <i class="fas fa-sync-alt"></i> 换一张
            </button>
            <button
                @click="detectFaces"
                class="action-btn"
                :disabled="isDetecting"
            >
              <i class="fas fa-redo"></i> 重新检测
            </button>
          </div>
        </div>
      </div>

      <!-- 控制面板 -->
      <div v-if="originalImage" class="control-panel">
        <div class="preset-buttons">
          <button
              v-for="preset in beautyPresets"
              :key="preset.name"
              @click="applyPreset(preset)"
              class="preset-btn"
          >
            {{ preset.name }}
          </button>
        </div>

        <div class="beauty-options">
          <!-- 基础美颜 -->
          <div class="option-group">
            <h3><i class="fas fa-sliders-h"></i> 基础美颜</h3>
            <div class="option">
              <label>
                <i class="fas fa-spa"></i> 磨皮: {{ smoothLevel }}
              </label>
              <input
                  type="range"
                  v-model="smoothLevel"
                  min="0"
                  max="100"
                  @input="applyBeauty"
              >
            </div>

            <div class="option">
              <label>
                <i class="fas fa-sun"></i> 美白: {{ whiteningLevel }}
              </label>
              <input
                  type="range"
                  v-model="whiteningLevel"
                  min="0"
                  max="100"
                  @input="applyBeauty"
              >
            </div>
          </div>

          <!-- 五官调整 -->
          <div class="option-group">
            <h3><i class="fas fa-eye"></i> 五官调整</h3>
            <div class="option">
              <label>
                <i class="fas fa-eye"></i> 大眼: {{ eyeEnlargeLevel }}
              </label>
              <input
                  type="range"
                  v-model="eyeEnlargeLevel"
                  min="0"
                  max="100"
                  @input="applyBeauty"
              >
            </div>

            <div class="option">
              <label>
                <i class="fas fa-grin"></i> 瘦脸: {{ faceSlimLevel }}
              </label>
              <input
                  type="range"
                  v-model="faceSlimLevel"
                  min="0"
                  max="100"
                  @input="applyBeauty"
              >
            </div>
          </div>

          <!-- 高级选项 -->
          <div class="option-group">
            <h3><i class="fas fa-cogs"></i> 高级选项</h3>
            <div class="checkboxes">
              <label v-for="option in advancedOptions" :key="option.id">
                <input
                    type="checkbox"
                    v-model="option.enabled"
                    @change="applyBeauty"
                >
                {{ option.label }}
              </label>
            </div>
          </div>
        </div>

        <button
            @click="downloadResult"
            class="download-btn"
            :disabled="!processedImage"
        >
          <i class="fas fa-download"></i> 下载美颜照
        </button>
      </div>
    </div>

    <!-- 人脸检测提示 -->
    <div v-if="showFaceAlert" class="face-alert">
      <div class="alert-content">
        <i class="fas fa-exclamation-triangle"></i>
        <p>未检测到人脸，请上传包含清晰正面人像的照片</p>
        <button @click="showFaceAlert = false">知道了</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'  // 添加nextTick导入
// 图片状态
const originalImage = ref(null)
const processedImage = ref(null)
const fileInput = ref(null)
const imageElement = ref(null)
const isDetecting = ref(false)
const showFaceAlert = ref(false)

// 人脸特征点 (模拟数据)
const faceLandmarks = ref([])

// 美颜参数
const smoothLevel = ref(50)
const whiteningLevel = ref(50)
const eyeEnlargeLevel = ref(30)
const faceSlimLevel = ref(40)

// 高级选项
const advancedOptions = ref([
  { id: 'teeth', label: '牙齿美白', enabled: true },
  { id: 'nose', label: '鼻梁增强', enabled: false },
  { id: 'eyebrow', label: '眉毛增强', enabled: true }
])

// 预设方案
const beautyPresets = ref([
  { name: '自然', smooth: 40, white: 30, eye: 20, face: 20 },
  { name: '网红', smooth: 70, white: 80, eye: 50, face: 60 },
  { name: '证件照', smooth: 30, white: 40, eye: 10, face: 15 }
])

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value.click()
}

// 处理文件上传
const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (event) => {
    originalImage.value = event.target.result
    processedImage.value = null
    faceLandmarks.value = []
  }
  reader.readAsDataURL(file)
}

// 更换图片
const replaceImage = () => {
  originalImage.value = null
  processedImage.value = null
  faceLandmarks.value = []
  triggerFileInput()
}

// 检测人脸 (模拟)
const detectFaces = () => {
  if (!originalImage.value) return

  isDetecting.value = true
  faceLandmarks.value = []

  // 模拟检测延迟
  setTimeout(() => {
    // 模拟生成68个人脸特征点
    const mockLandmarks = []
    for (let i = 0; i < 68; i++) {
      mockLandmarks.push({
        x: 30 + Math.random() * 40,
        y: 30 + Math.random() * 40
      })
    }

    faceLandmarks.value = mockLandmarks
    isDetecting.value = false

    // 如果没有检测到足够特征点
    if (mockLandmarks.length < 10) {
      showFaceAlert.value = true
    }

    // 初始应用美颜
    applyBeauty()
  }, 800)
}

// 应用美颜效果 (模拟)
const applyBeauty = () => {
  if (!originalImage.value) return

  // 模拟处理延迟
  setTimeout(() => {
    processedImage.value = `${originalImage.value}?beauty=${Date.now()}&smooth=${smoothLevel.value}&white=${whiteningLevel.value}&eye=${eyeEnlargeLevel.value}&face=${faceSlimLevel.value}`
  }, 300)
}

// 应用预设方案
const applyPreset = (preset) => {
  smoothLevel.value = preset.smooth
  whiteningLevel.value = preset.white
  eyeEnlargeLevel.value = preset.eye
  faceSlimLevel.value = preset.face
  applyBeauty()
}

// 下载结果
const downloadResult = () => {
  if (!processedImage.value) return

  const link = document.createElement('a')
  link.href = processedImage.value
  link.download = `beauty-${new Date().getTime()}.jpg`
  link.click()
}

// 监听图片变化
watch(originalImage, (newVal) => {
  if (newVal) {
    // 图片加载后自动检测人脸
    nextTick(() => {
      if (imageElement.value.complete) {
        detectFaces()
      }
    })
  }
})
</script>

<style scoped>
.ai-beauty-view {
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
  position: relative;
}

.upload-section.has-image {
  padding: 20px;
  border-color: var(--primary-light);
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

.edit-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container {
  position: relative;
  max-width: 100%;
  margin-bottom: 20px;
}

.image-container img {
  max-width: 100%;
  max-height: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.face-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.landmark-point {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 0, 0, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.image-actions {
  display: flex;
  gap: 15px;
  margin-top: 15px;
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

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.control-panel {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.preset-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.preset-btn {
  flex: 1;
  padding: 10px;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.preset-btn:hover {
  background: #e0e0e0;
}

.beauty-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.option-group {
  background: white;
  padding: 15px;
  border-radius: 8px;
}

.option-group h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.option {
  margin-bottom: 15px;
}

.option label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 500;
}

input[type="range"] {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e0e0e0;
  outline: none;
}

.checkboxes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.checkboxes label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
  cursor: pointer;
}

.download-btn {
  width: 100%;
  padding: 12px;
  background: var(--success);
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

.download-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.face-alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.alert-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
}

.alert-content i {
  color: var(--warning);
  font-size: 2rem;
  margin-bottom: 15px;
}

.alert-content button {
  margin-top: 15px;
  padding: 8px 20px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .beauty-options {
    grid-template-columns: 1fr;
  }

  .checkboxes {
    grid-template-columns: 1fr;
  }

  .preset-buttons {
    flex-direction: column;
  }
}
</style>