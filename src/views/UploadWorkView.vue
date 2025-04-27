<template>
  <div class="upload-container">
    <div class="upload-card">
      <h2 class="upload-title">
        <i class="fas fa-cloud-upload-alt"></i> 上传新作品
      </h2>

      <!-- 图片上传区域 -->
      <div
          class="upload-area"
          @dragover.prevent="dragover"
          @dragleave.prevent="dragleave"
          @drop.prevent="drop"
          :class="{ 'drag-active': isDragActive }"
          @click="triggerFileInput"
      >
        <input
            type="file"
            ref="fileInput"
            accept="image/*"
            @change="handleFileChange"
            hidden
        >
        <div v-if="!previewImage" class="upload-placeholder">
          <i class="fas fa-images"></i>
          <p>点击或拖拽图片到此处</p>
          <p class="file-size-hint">支持 JPG/PNG/HEIC 格式，最大 20MB</p>
        </div>
        <div v-else class="preview-container">
          <img :src="previewImage" alt="作品预览" class="preview-image">
          <button class="remove-btn" @click.stop="removeImage">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <div v-if="fileError" class="error-message">
        <i class="fas fa-exclamation-circle"></i> {{ fileError }}
      </div>

      <!-- 表单区域 -->
      <form @submit.prevent="submitForm" class="upload-form">
        <div class="form-group">
          <label for="title">
            <i class="fas fa-heading"></i> 作品标题
          </label>
          <input
              type="text"
              id="title"
              v-model="form.title"
              placeholder="为你的作品起个吸引人的标题"
              maxlength="30"
              required
          >
          <div class="char-counter">{{ form.title.length }}/30</div>
        </div>

        <div class="form-group">
          <label>
            <i class="fas fa-align-left"></i> 作品描述
          </label>
          <MarkdownEditor
              v-model="form.description"
              placeholder="## 创作背景\n\n## 技术参数\n\n## 后期处理"
          />
        </div>

        <div class="form-group">
          <label>
            <i class="fas fa-tags"></i> 作品分类
          </label>
          <div class="category-tags">
            <button
                v-for="category in categories"
                :key="category.value"
                type="button"
                class="category-tag"
                :class="{ 'selected': form.category === category.value }"
                @click="form.category = category.value"
            >
              <i :class="category.icon"></i>
              {{ category.label }}
            </button>
          </div>
        </div>

        <div class="form-group">
          <label>
            <i class="fas fa-hashtag"></i> 添加标签（可选）
          </label>
          <div class="tags-input">
            <input
                type="text"
                v-model="tagInput"
                placeholder="输入标签后按回车（如：人像摄影、夜景）"
                @keydown.enter.prevent="addTag"
                @keydown.backspace="handleBackspace"
            >
            <div class="tags-list">
              <span v-for="(tag, index) in form.tags" :key="index" class="tag">
                #{{ tag }}
                <button @click="removeTag(index)" class="tag-remove">
                  <i class="fas fa-times"></i>
                </button>
              </span>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="cancelUpload">
            <i class="fas fa-times"></i> 取消
          </button>
          <button
              type="submit"
              class="submit-btn"
              :disabled="isSubmitting || !selectedFile"
          >
            <template v-if="isSubmitting">
              <i class="fas fa-spinner fa-spin"></i> 上传中...
            </template>
            <template v-else>
              <i class="fas fa-paper-plane"></i> 发布作品
            </template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor/MarkdownEditorComponents'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// 配置marked
marked.setOptions({
  breaks: true,
  gfm: true
})

export default {
  name: 'UploadWork',
  components: {
    MarkdownEditor
  },
  data() {
    return {
      isDragActive: false,
      previewImage: null,
      selectedFile: null,
      fileError: null,
      tagInput: '',
      isSubmitting: false,
      categories: [
        { value: 'portrait', label: '人像', icon: 'fas fa-user' },
        { value: 'landscape', label: '风光', icon: 'fas fa-mountain' },
        { value: 'animal', label: '动物', icon: 'fas fa-paw' },
        { value: 'still-life', label: '静物', icon: 'fas fa-apple-alt' },
        { value: 'street', label: '街拍', icon: 'fas fa-city' },
        { value: 'event', label: '活动', icon: 'fas fa-calendar-alt' }
      ],
      form: {
        title: '',
        description: '',
        category: 'portrait', // 默认选择人像
        tags: []
      }
    }
  },
  computed: {
    compiledMarkdown() {
      return DOMPurify.sanitize(marked(this.form.description || ''))
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileChange(e) {
      const file = e.target.files[0]
      this.validateAndPreview(file)
    },
    dragover() {
      this.isDragActive = true
    },
    dragleave() {
      this.isDragActive = false
    },
    drop(e) {
      this.isDragActive = false
      const file = e.dataTransfer.files[0]
      this.validateAndPreview(file)
    },
    validateAndPreview(file) {
      this.fileError = null

      if (!file) return

      // 验证文件类型
      const validTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/heif']
      if (!validTypes.includes(file.type)) {
        this.fileError = '仅支持 JPG/PNG/HEIC 格式的图片'
        return
      }

      // 验证文件大小 (20MB)
      const maxSize = 20 * 1024 * 1024
      if (file.size > maxSize) {
        this.fileError = '图片大小不能超过 20MB'
        return
      }

      // 预览图片
      const reader = new FileReader()
      reader.onload = (e) => {
        this.previewImage = e.target.result
        this.selectedFile = file
      }
      reader.readAsDataURL(file)
    },
    removeImage() {
      this.previewImage = null
      this.selectedFile = null
      this.$refs.fileInput.value = ''
    },
    addTag() {
      if (!this.tagInput.trim()) return

      const tag = this.tagInput.trim()
      // 检查标签是否已存在
      if (!this.form.tags.includes(tag)) {
        // 检查标签数量限制
        if (this.form.tags.length >= 5) {
          this.fileError = '最多只能添加5个标签'
          return
        }
        this.form.tags.push(tag)
        this.tagInput = ''
      }
    },
    removeTag(index) {
      this.form.tags.splice(index, 1)
    },
    handleBackspace() {
      if (!this.tagInput && this.form.tags.length) {
        this.form.tags.pop()
      }
    },
    cancelUpload() {
      this.previewImage = null
      this.selectedFile = null
      this.fileError = null
      this.form = {
        title: '',
        description: '',
        category: 'portrait',
        tags: []
      }
      this.$refs.fileInput.value = ''
      this.$emit('cancel')
    },
    async submitForm() {
      if (!this.selectedFile) {
        this.fileError = '请选择要上传的图片'
        return
      }

      this.isSubmitting = true

      try {
        const formData = new FormData()
        formData.append('image', this.selectedFile)
        formData.append('title', this.form.title)
        formData.append('description', this.form.description)
        formData.append('category', this.form.category)
        formData.append('tags', JSON.stringify(this.form.tags))

        // 这里替换为实际的API调用
        // const response = await this.$api.post('/works', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // })

        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1500))

        this.$notify({
          title: '上传成功',
          message: '你的作品已成功发布！',
          type: 'success'
        })

        this.cancelUpload()
        this.$emit('success')

      } catch (error) {
        console.error('上传失败:', error)
        this.$notify({
          title: '上传失败',
          message: error.response?.data?.message || '请稍后再试',
          type: 'error'
        })
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
/* 基础样式 */
.upload-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.upload-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.upload-title {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

/* 上传区域样式 */
.upload-area {
  border: 2px dashed #ddd;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  position: relative;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-area:hover,
.drag-active {
  border-color: #ff7e33;
  background-color: #f9f9f9;
}

.upload-placeholder {
  color: #888;
}

.upload-placeholder i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ff7e33;
}

.file-size-hint {
  font-size: 0.9rem;
  color: #aaa;
  margin-top: 0.5rem;
}

.preview-container {
  position: relative;
  max-width: 100%;
  max-height: 400px;
}

.preview-image {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.remove-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.error-message {
  color: #ff4d4f;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

/* 表单样式 */
.upload-form {
  margin-top: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #ff7e33;
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 126, 51, 0.2);
}

.char-counter {
  text-align: right;
  font-size: 0.8rem;
  color: #999;
  margin-top: 0.3rem;
}

/* 分类标签样式 */
.category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

.category-tag {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  color: #555;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.category-tag:hover {
  border-color: #ff7e33;
  color: #ff7e33;
}

.category-tag.selected {
  background: #ff7e33;
  color: white;
  border-color: #ff7e33;
}

/* 自定义标签样式 */
.tags-input {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  transition: all 0.3s;
}

.tags-input:focus-within {
  border-color: #ff7e33;
  box-shadow: 0 0 0 2px rgba(255, 126, 51, 0.2);
}

.tags-input input {
  border: none;
  outline: none;
  width: 100%;
  padding: 8px;
  font-size: 1rem;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.tag {
  background: #fff4e6;
  color: #ff7e33;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tag-remove {
  background: none;
  border: none;
  color: #ff7e33;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
}

/* 按钮样式 */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-btn,
.submit-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cancel-btn {
  background: #f5f5f5;
  border: 1px solid #ddd;
  color: #666;
}

.cancel-btn:hover {
  background: #eee;
}

.submit-btn {
  background: #ff7e33;
  color: white;
  border: none;
}

.submit-btn:hover:not(:disabled) {
  background: #ff6a1a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 126, 51, 0.3);
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .upload-card {
    padding: 1.5rem;
  }

  .upload-title {
    font-size: 1.5rem;
  }

  .category-tags {
    gap: 8px;
  }

  .category-tag {
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-btn,
  .submit-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>