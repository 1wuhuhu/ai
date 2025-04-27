<template>
  <div class="markdown-editor">
    <!-- 工具栏 -->
    <div class="editor-toolbar">
      <button
          v-for="btn in toolbarButtons"
          :key="btn.action"
          type="button"
          @click="insertText(btn.prefix, btn.suffix)"
          :title="btn.title"
      >
        <i :class="btn.icon"></i>
      </button>
    </div>

    <!-- 编辑区 -->
    <textarea
        ref="textarea"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        class="editor-textarea"
    ></textarea>

    <!-- 预览区 -->
    <div
        v-if="showPreview"
        class="markdown-preview"
        v-html="compiledMarkdown"
    ></div>
  </div>
</template>

<script>
import { marked } from 'marked'
import DOMPurify from 'dompurify' // 用于安全地渲染HTML

export default {
  name: 'MarkdownEditor',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入Markdown格式文本...'
    },
    showPreview: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      toolbarButtons: [
        { action: 'bold', icon: 'fas fa-bold', prefix: '**', suffix: '**', title: '加粗' },
        { action: 'italic', icon: 'fas fa-italic', prefix: '*', suffix: '*', title: '斜体' },
        { action: 'link', icon: 'fas fa-link', prefix: '[', suffix: '](url)', title: '链接' },
        { action: 'image', icon: 'fas fa-image', prefix: '![', suffix: '](image-url)', title: '图片' },
        { action: 'code', icon: 'fas fa-code', prefix: '`', suffix: '`', title: '行内代码' },
        { action: 'codeBlock', icon: 'fas fa-square-code', prefix: '```\n', suffix: '\n```', title: '代码块' },
        { action: 'ul', icon: 'fas fa-list-ul', prefix: '- ', suffix: '', title: '无序列表' },
        { action: 'ol', icon: 'fas fa-list-ol', prefix: '1. ', suffix: '', title: '有序列表' },
        { action: 'heading1', icon: 'fas fa-heading', prefix: '# ', suffix: '', title: '一级标题' },
        { action: 'heading2', icon: 'fas fa-heading', prefix: '## ', suffix: '', title: '二级标题' },
        { action: 'quote', icon: 'fas fa-quote-right', prefix: '> ', suffix: '', title: '引用' },
        { action: 'hr', icon: 'fas fa-minus', prefix: '---\n', suffix: '', title: '分割线' }
      ]
    }
  },
  computed: {
    compiledMarkdown() {
      // 使用DOMPurify进行XSS防护
      return DOMPurify.sanitize(marked(this.modelValue || ''))
    }
  },
  methods: {
    insertText(prefix, suffix) {
      const textarea = this.$refs.textarea
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = this.modelValue.substring(start, end)
      const beforeText = this.modelValue.substring(0, start)
      const afterText = this.modelValue.substring(end)

      const newText = beforeText + prefix + selectedText + suffix + afterText
      this.$emit('update:modelValue', newText)

      // 设置光标位置
      this.$nextTick(() => {
        textarea.focus()
        textarea.setSelectionRange(
            start + prefix.length,
            start + prefix.length + selectedText.length
        )
      })
    },
    focus() {
      this.$refs.textarea.focus()
    }
  }
}
</script>

<style scoped>
.markdown-editor {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.markdown-editor:focus-within {
  border-color: #ff7e33;
  box-shadow: 0 0 0 2px rgba(255, 126, 51, 0.2);
}

.editor-toolbar {
  padding: 8px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.editor-toolbar button {
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor-toolbar button:hover {
  background: #e9ecef;
  color: #333;
}

.editor-textarea {
  width: 100%;
  min-height: 150px;
  padding: 12px;
  border: none;
  resize: vertical;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 14px;
  line-height: 1.6;
}

.editor-textarea:focus {
  outline: none;
}

.markdown-preview {
  padding: 12px;
  border-top: 1px solid #eee;
  background: #fcfcfc;
  line-height: 1.6;
}

.markdown-preview >>> h1,
.markdown-preview >>> h2,
.markdown-preview >>> h3 {
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.markdown-preview >>> p {
  margin-bottom: 1em;
}

.markdown-preview >>> ul,
.markdown-preview >>> ol {
  padding-left: 2em;
  margin-bottom: 1em;
}

.markdown-preview >>> code {
  background: #f3f3f3;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.markdown-preview >>> pre {
  background: #f8f9fa;
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 1em;
}

.markdown-preview >>> blockquote {
  border-left: 3px solid #ddd;
  padding-left: 1em;
  color: #666;
  margin-bottom: 1em;
}

.markdown-preview >>> a {
  color: #ff7e33;
  text-decoration: none;
}

.markdown-preview >>> a:hover {
  text-decoration: underline;
}

.markdown-preview >>> img {
  max-width: 100%;
  height: auto;
}
</style>