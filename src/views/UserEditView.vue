<template>
  <div class="user-edit">
    <!-- 头像上传 -->
    <div class="avatar-upload">
      <div class="avatar-preview" @click="triggerFileInput">
        <img :src="form.avatar || defaultAvatar" alt="用户头像">
        <div class="upload-mask">
          <i class="fas fa-camera"></i>
          <span>更换头像</span>
        </div>
      </div>
      <input
          type="file"
          ref="fileInput"
          accept="image/*"
          @change="handleAvatarChange"
          style="display: none;"
      >
    </div>

    <!-- 编辑表单 -->
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>昵称</label>
        <input
            type="text"
            v-model="form.username"
            placeholder="请输入昵称"
            required
        >
      </div>

      <div class="form-group">
        <label>个性签名</label>
        <textarea
            v-model="form.bio"
            placeholder="介绍一下自己吧~"
            rows="3"
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="button" class="cancel-btn" @click="$emit('cancel')">
          取消
        </button>
        <button type="submit" class="submit-btn">
          保存更改
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'


const props = defineProps({
  userData: {
    type: Object,
    required: true,
    default: () => ({
      avatar: '',
      username: '新用户',
      bio: ''
    })
  }
})

const emit = defineEmits(['submit', 'cancel'])

const fileInput = ref(null)
const form = reactive({
  avatar: props.userData.avatar,
  username: props.userData.username,
  bio: props.userData.bio || ''
})

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleAvatarChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const submitForm = () => {
  emit('submit', form)
}
</script>

<style scoped>
.user-edit {
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.avatar-upload {
  margin: 0 auto 20px;
  width: 120px;
}

.avatar-preview {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border: 3px solid #f0f0f0;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.avatar-preview:hover .upload-mask {
  opacity: 1;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn,
.submit-btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background: #f0f0f0;
  border: 1px solid #ddd;
}

.submit-btn {
  background: #4361ee;
  color: white;
  border: none;
}
</style>