<template>
  <div class="input-area">
    <div class="input-container">
      <div class="input-tools">
        <label class="tool-button" title="上传图片">
          <i class="fas fa-image"></i>
          <FileUpload
              @files-selected="handleFiles"
              accept="image/*"
              :maxSizeMB="10"
              ref="fileUpload"
          />
        </label>
      </div>

      <div class="attachments-preview" v-if="attachments.length">
        <div class="attachment-item" v-for="(file, index) in attachments" :key="index">
          <img :src="file.preview" :alt="file.name">
          <button class="attachment-remove" @click="removeAttachment(index)">×</button>
        </div>
      </div>

      <div class="input-box-container">
        <textarea
            class="input-box"
            v-model="messageText"
            @keydown.enter.exact.prevent="sendMessage"
            placeholder="输入您的问题或指令..."
        ></textarea>
        <button class="send-button" @click="sendMessage">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FileUpload from './FileUpload.vue'

const messageText = ref('')
const attachments = ref([])

const emit = defineEmits(['send'])

const handleFiles = (files) => {
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      attachments.value.push({
        name: file.name,
        size: file.size,
        type: file.type,
        preview: e.target.result,
        file
      })
    }
    reader.readAsDataURL(file)
  })
}

const removeAttachment = (index) => {
  attachments.value.splice(index, 1)
}

const sendMessage = () => {
  if (messageText.value.trim() || attachments.value.length) {
    emit('send', {
      text: messageText.value.trim(),
      files: [...attachments.value]
    })
    messageText.value = ''
    attachments.value = []
  }
}
</script>

<!-- 保持原有样式 -->