<template>
  <div class="sidebar">
    <div class="logo">
      <img src="@/assets/logo.png" alt="AI摄影平台">
      <h1>AI摄影平台</h1>
    </div>

    <div class="nav-items">
      <router-link
          v-for="item in navItems"
          :key="item.id"
          :to="{ name: item.id }"
          custom
          v-slot="{ navigate, isActive }"
      >
        <div
            class="nav-item"
            :class="{ active: isActive }"
            @click="navigate"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </div>
      </router-link>
    </div>

    <div class="user-section">
      <div class="user-info">
        <div class="user-avatar">U</div>
        <div class="user-name">用户名</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const navItems = [
  { id: 'photography', label: '摄影老炮', icon: 'fas fa-camera-retro' },
  { id: 'resolution', label: '超分辨率', icon: 'fas fa-search-plus' },
  { id: 'beauty', label: 'AI美颜', icon: 'fas fa-magic' }
]
</script>

<!-- 保持原有样式 -->