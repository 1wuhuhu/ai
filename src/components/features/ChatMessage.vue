<template>
  <div class="message" :class="messageClasses">
    <div class="message-content" :class="contentClasses">
      <!-- 文字内容 (支持简单HTML) -->
      <div v-if="message.content" v-html="message.content"></div>

      <!-- 附件预览 -->
      <div v-if="message.files?.length" class="attachments-container">
        <div v-for="(file, index) in message.files" :key="index" class="attachment-item">
          <img :src="file.preview || file.data" :alt="file.name">
          <span class="attachment-name" v-if="showFileName">{{ file.name }}</span>
        </div>
      </div>
    </div>

    <!-- 消息元信息 -->
    <div class="message-meta">
      <i v-if="message.type === 'ai'" class="fas fa-robot"></i>
      <span>{{ message.time }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: Object,
    required: true,
    validator: (value) => {
      return ['ai', 'user'].includes(value.type) &&
          (value.content || value.files?.length)
    }
  },
  showFileName: {
    type: Boolean,
    default: false
  }
})

const messageClasses = computed(() => ({
  'message-ai': props.message.type === 'ai',
  'message-user': props.message.type === 'user'
}))

const contentClasses = computed(() => ({
  'ai-message': props.message.type === 'ai',
  'user-message': props.message.type === 'user',
  'has-attachments': props.message.files?.length
}))
</script>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.message-ai {
  align-items: flex-start;
}

.message-user {
  align-items: flex-end;
}

.message-content {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.5;
  word-break: break-word;
}

.ai-message {
  background-color: #f1f5f9;
  color: var(--dark);
  border-top-left-radius: 4px !important;
}

.user-message {
  background-color: var(--primary);
  color: white;
  border-top-right-radius: 4px !important;
}

.has-attachments {
  padding: 8px;
}

.message-meta {
  font-size: 0.75rem;
  color: var(--gray);
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 附件样式 */
.attachments-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.attachment-item {
  position: relative;
  max-width: 200px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.1);
}

.attachment-item img {
  width: 100%;
  height: auto;
  display: block;
}

.attachment-name {
  display: block;
  padding: 4px;
  font-size: 0.7rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

/* 用户消息中的附件样式 */
.user-message .attachment-item {
  border-color: rgba(255,255,255,0.3);
}
</style>