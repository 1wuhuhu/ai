<template>
  <div class="options-panel">
    <div class="option-group" v-for="(option, key) in options" :key="key">
      <div class="option-title">{{ option.label }}</div>

      <!-- 单选按钮组 -->
      <div class="checkbox-group" v-if="option.type === 'radio'">
        <label
            class="checkbox-item"
            v-for="opt in option.options"
            :key="opt.value"
        >
          <input
              type="radio"
              :name="key"
              :value="opt.value"
              v-model="option.value"
          >
          {{ opt.label }}
        </label>
      </div>

      <!-- 滑动条 -->
      <div class="slider-container" v-else-if="option.type === 'slider'">
        <input
            type="range"
            :min="option.min"
            :max="option.max"
            v-model="option.value"
            class="slider"
        >
        <span class="slider-value">{{ option.value }}</span>
      </div>

      <!-- 复选框组 -->
      <div class="checkbox-group" v-else-if="option.type === 'checkbox'">
        <label
            class="checkbox-item"
            v-for="opt in option.options"
            :key="opt.value"
        >
          <input
              type="checkbox"
              :value="opt.value"
              v-model="opt.checked"
          >
          {{ opt.label }}
        </label>
      </div>
    </div>

    <button class="process-button" @click="handleProcess">
      开始处理
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  options: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['process'])

const handleProcess = () => {
  const params = {}
  Object.keys(props.options).forEach(key => {
    const option = props.options[key]
    if (option.type === 'checkbox') {
      params[key] = option.options
          .filter(opt => opt.checked)
          .map(opt => opt.value)
    } else {
      params[key] = option.value
    }
  })
  emit('process', params)
}
</script>