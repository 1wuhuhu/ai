<template>
  <div class="app-container">
    <!-- 左侧AI导航栏 -->
    <div class="ai-sidebar">
      <div v-for="item in aiNavItems" :key="item.path">
        <router-link :to="{ name: item.name }">
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </router-link>
      </div>
    </div>

    <!-- 右侧内容区 -->
    <div class="ai-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const aiNavItems = computed(() => {
  // 找到AI布局路由
  const aiLayoutRoute = router.options.routes
      .find(r => r.path === '/NavbarComponents')?.children
      ?.find(child => child.name === 'AiLayout')

  // 提取子路由作为导航项
  return aiLayoutRoute?.children?.map(route => ({
    name: route.name,
    path: route.path,
    label: route.meta?.title || route.name,
    icon: route.meta?.icon || 'fas fa-circle'
  })) || [] // 确保始终返回数组
})
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}

.ai-sidebar {
  width: 220px;
  background: #2c3e50;
  color: white;
  padding: 20px;
}

.ai-content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

/* 导航项样式 */
.ai-sidebar a {
  display: block;
  color: white;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  text-decoration: none;
}

.ai-sidebar a:hover {
  background: #34495e;
}

.ai-sidebar a.router-link-active {
  background: var(--primary);
}

.ai-sidebar i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}
</style>