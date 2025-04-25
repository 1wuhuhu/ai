<template>
  <div class="ai-photography-view">
    <!-- 标题和描述 -->
    <div class="header">
      <h1><i class="fas fa-camera-retro"></i> 摄影老炮</h1>
      <p class="subtitle">多模态AI摄影助手 · 专业摄影分析与建议</p>
    </div>

    <!-- 对话容器 -->
    <div class="chat-container">
      <!-- 消息列表 -->
      <div class="chat-messages" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index"
             :class="['message', message.type === 'ai' ? 'ai-message' : 'user-message']">

          <!-- AI消息 -->
          <div v-if="message.type === 'ai'" class="message-content">
            <div class="ai-avatar">
              <i class="fas fa-robot"></i>
            </div>
            <div class="message-bubble">
              <div v-html="message.content"></div>
              <div v-if="message.images?.length" class="message-images">
                <img v-for="(img, i) in message.images" :key="i" :src="img" @click="showImage(img)">
              </div>
              <div class="message-time">{{ formatTime(message.time) }}</div>
            </div>
          </div>

          <!-- 用户消息 -->
          <div v-else class="message-content user">
            <div class="message-bubble">
              <div v-if="message.text">{{ message.text }}</div>
              <div v-if="message.images?.length" class="message-images">
                <img v-for="(img, i) in message.images" :key="i" :src="img" @click="showImage(img)">
              </div>
              <div class="message-time">{{ formatTime(message.time) }}</div>
            </div>
            <div class="user-avatar">
              <i class="fas fa-user"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="input-area">
        <div class="upload-controls">
          <label class="upload-button">
            <i class="fas fa-image"></i>
            <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" multiple hidden>
          </label>
          <div v-if="pendingImages.length" class="pending-images">
            <div v-for="(img, index) in pendingImages" :key="index" class="pending-image">
              <img :src="img.preview">
              <button @click="removePendingImage(index)" class="remove-image">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="text-input">
          <textarea v-model="userInput" placeholder="输入摄影问题或上传图片分析..."
                    @keydown.enter.exact.prevent="sendMessage"></textarea>
          <button @click="sendMessage" :disabled="!canSend" class="send-button">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- 图片预览模态框 -->
    <div v-if="previewImage" class="image-preview-modal" @click="previewImage = null">
      <img :src="previewImage">
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const messagesContainer = ref(null)
const fileInput = ref(null)
const userInput = ref('')
const previewImage = ref(null)
const pendingImages = ref([])

// 对话消息
const messages = ref([
  {
    type: 'ai',
    content: '您好！我是您的AI摄影助手，可以为您提供：<ul><li>摄影参数建议</li><li>构图分析</li><li>光线评估</li><li>后期处理指导</li></ul>请上传照片或描述您的需求。',
    time: new Date()
  }
])

// 是否可发送消息
const canSend = computed(() => {
  return userInput.value.trim() || pendingImages.value.length
})

// 格式化时间
const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// 处理文件上传
const handleFileUpload = (e) => {
  const files = Array.from(e.target.files)
  files.forEach(file => {
    if (!file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = (event) => {
      pendingImages.value.push({
        file,
        preview: event.target.result
      })
    }
    reader.readAsDataURL(file)
  })
  e.target.value = '' // 重置input
}

// 移除待发送图片
const removePendingImage = (index) => {
  pendingImages.value.splice(index, 1)
}

// 显示大图预览
const showImage = (img) => {
  previewImage.value = img
}

// 发送消息
const sendMessage = async () => {
  if (!canSend.value) return

  // 用户消息
  const userMessage = {
    type: 'user',
    text: userInput.value,
    images: pendingImages.value.map(img => img.preview),
    time: new Date()
  }
  messages.value.push(userMessage)

  // 清空输入
  userInput.value = ''
  pendingImages.value = []

  // 滚动到底部
  await nextTick()
  scrollToBottom()

  // 模拟AI思考
  setTimeout(() => {
    generateAIResponse(userMessage)
  }, 1000)
}

// 生成AI回复
const generateAIResponse = (userMessage) => {
  let responseContent = ''

  if (userMessage.images?.length) {
    // 有图片的分析回复
    responseContent = `
      <div class="ai-analysis">
        <p>已分析您上传的${userMessage.images.length}张照片：</p>
        <div class="photo-feedback">
          <h4>摄影建议：</h4>
          <ul>
            <li>光线：${getRandomFeedback(['理想', '稍暗', '过曝'])}</li>
            <li>构图：${getRandomFeedback(['优秀', '可改进', '主体偏移'])}</li>
            <li>色彩：${getRandomFeedback(['鲜艳', '平淡', '偏色'])}</li>
          </ul>
        </div>
        ${userMessage.text ? `<p>关于"${userMessage.text}"的建议：${getRandomAdvice()}</p>` : ''}
      </div>
    `
  } else if (userMessage.text) {
    // 纯文本回复
    responseContent = `
      <p>关于"${userMessage.text}"：</p>
      <div class="text-response">
        ${getDetailedAdvice(userMessage.text)}
      </div>
    `
  }

  const aiMessage = {
    type: 'ai',
    content: responseContent,
    images: userMessage.images?.slice(0, 1), // AI只引用一张图片
    time: new Date()
  }

  messages.value.push(aiMessage)
  scrollToBottom()
}

// 滚动到底部
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 模拟数据生成
const getRandomFeedback = (options) => {
  return options[Math.floor(Math.random() * options.length)]
}

const getRandomAdvice = () => {
  const advices = [
    '建议使用三分法构图突出主体',
    '尝试降低ISO减少噪点',
    '黄金时段拍摄效果更佳',
    '可尝试使用偏振镜增强色彩'
  ]
  return advices[Math.floor(Math.random() * advices.length)]
}

const getDetailedAdvice = (question) => {
  if (question.includes('参数')) {
    return `
      <ul>
        <li><strong>人像摄影：</strong>光圈f/1.8-f/2.8，ISO 100-400，快门1/200s以上</li>
        <li><strong>风景摄影：</strong>光圈f/8-f/16，ISO 100，使用三脚架</li>
        <li><strong>运动摄影：</strong>快门1/500s以上，连续自动对焦</li>
      </ul>
    `
  } else if (question.includes('构图')) {
    return `
      <p>经典构图技巧：</p>
      <ol>
        <li><strong>三分法：</strong>将主体放在交叉点上</li>
        <li><strong>引导线：</strong>利用自然线条引导视线</li>
        <li><strong>框架式：</strong>用环境元素构建画框</li>
      </ol>
    `
  } else {
    return `
      <p>摄影是一门用光的艺术，建议：</p>
      <ul>
        <li>观察光线的方向和质量</li>
        <li>黄金时段（日出日落前后）拍摄</li>
        <li>阴天适合人像，晴天适合风景</li>
      </ul>
    `
  }
}

// 初始化滚动到底部
onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.ai-photography-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  color: var(--primary);
  margin-bottom: 5px;
}

.subtitle {
  color: var(--gray);
  font-size: 16px;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f9f9f9;
}

.message {
  margin-bottom: 20px;
}

.message-content {
  display: flex;
  max-width: 90%;
}

.message-content.user {
  margin-left: auto;
  flex-direction: row-reverse;
}

.ai-avatar, .user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  flex-shrink: 0;
}

.user-avatar {
  background: var(--secondary);
}

.message-bubble {
  max-width: calc(100% - 60px);
  padding: 12px 16px;
  border-radius: 18px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.user .message-bubble {
  background: var(--primary);
  color: white;
}

.message-time {
  font-size: 12px;
  color: var(--gray);
  margin-top: 5px;
  text-align: right;
}

.user .message-time {
  color: rgba(255,255,255,0.7);
}

.message-images {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.message-images img {
  max-width: 200px;
  max-height: 150px;
  border-radius: 8px;
  cursor: zoom-in;
  object-fit: cover;
}

.input-area {
  border-top: 1px solid #eee;
  padding: 15px;
  background: white;
}

.upload-controls {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
}

.upload-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--primary);
  font-size: 18px;
}

.pending-images {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 5px 0;
}

.pending-image {
  position: relative;
}

.pending-image img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.remove-image {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--secondary);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
}

.text-input {
  display: flex;
  gap: 10px;
}

.text-input textarea {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 12px 15px;
  resize: none;
  height: 50px;
  max-height: 150px;
  outline: none;
  font-family: inherit;
}

.send-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.send-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.image-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: zoom-out;
}

.image-preview-modal img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .message-bubble {
    max-width: calc(100% - 50px);
  }

  .message-images img {
    max-width: 150px;
  }

  .ai-avatar, .user-avatar {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }
}
</style>