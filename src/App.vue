<template>
  <div>
    <router-view name="NavbarComponents"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
/* 引入外部样式文件 */
@import url('./css/styles.css');
</style>