<template>
  <nav class="flex items-center justify-between px-8 py-4 bg-white shadow-md border-b border-gray-200">
    <div class="logo font-bold text-2xl text-orange-600 hover:scale-105 transition-transform duration-300">AI摄影平台</div>
    <ul class="flex items-center space-x-4">
      <li>
        <router-link to="/" class="text-orange-600 hover:text-orange-800 hover:scale-110 transition-transform duration-300">首页</router-link>
      </li>
      <li>
        <router-link to="/NavbarComponents/WorkList" class="text-orange-600 hover:text-orange-800 hover:scale-110 transition-transform duration-300">作品集</router-link>
      </li>
      <li>
        <router-link to="/NavbarComponents/AiLayout/AiPhotographyView" class="text-orange-600 hover:text-orange-800 hover:scale-110 transition-transform duration-300">AI创作</router-link>
      </li>
      <li>
        <router-link to="/booking" class="text-orange-600 hover:text-orange-800 hover:scale-110 transition-transform duration-300">约拍</router-link>
      </li>
      <li class="search-container relative flex items-center">
        <input
            type="text"
            placeholder="搜索"
            class="px-4 py-2 border border-gray-300 rounded-l-md focus:border-orange-600 focus:ring-orange-600 focus:ring-1 outline-none transition-all duration-300"
        />
        <button class="search-btn px-4 py-2 bg-orange-600 text-white rounded-r-md hover:bg-orange-800 transition-colors duration-300">
          <i class="fa-solid fa-magnifying-glass"></i> 搜索
        </button>
      </li>
      <!-- 新增的上传作品按钮 -->
      <li>
        <button
            class="upload-btn px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-md hover:from-orange-600 hover:to-yellow-500 hover:scale-105 transition-all duration-300 shadow-md"
            @click="handleUpload"
        >
          <i class="fa-solid fa-cloud-upload-alt mr-2"></i>上传作品
        </button>
      </li>
      <li>
        <button class="login-btn px-4 py-2 bg-yellow-200 text-orange-600 rounded-md hover:bg-yellow-300 hover:scale-105 transition-all duration-300">登录</button>
      </li>
      <li>
        <button class="register-btn px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-800 hover:scale-105 transition-all duration-300">注册</button>
      </li>
    </ul>
  </nav>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'NavbarComponents',
  methods: {
    handleUpload() {
      // 这里添加上传作品的逻辑
      this.$router.push('/NavbarComponents/UploadWork')
      // 可以触发一个事件或路由跳转
      // this.$emit('open-upload-modal');
      // 或者 this.$router.push('/upload');
    }
  }
}
</script>

<style scoped>
/* 引入 Font Awesome 图标库 */
@import url('https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/css/all.min.css');

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-bottom: 1px solid #e0e0e0;
}

nav .logo {
  font-size: 20px;
  font-weight: bold;
  color: #d9480f; /* 橙色，类似 Tailwind 的 orange-600 */
  transition: transform 0.3s ease;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

nav ul li {
  margin-right: 16px;
}

nav ul li a {
  text-decoration: none;
  color: #d9480f; /* 橙色，类似 Tailwind 的 orange-600 */
  transition: all 0.3s ease;
  display: inline-block;
}

nav ul li a:hover {
  color: #993300; /* 更深的橙色，类似 Tailwind 的 orange-800 */
  transform: scale(1.1);
}

nav .search-container {
  position: relative;
  display: flex;
  align-items: center;
}

nav input[type="text"] {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px 0 0 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

nav input[type="text"]:focus {
  border-color: #d9480f; /* 橙色，类似 Tailwind 的 orange-600 */
}

nav .search-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 0 8px 8px 0;
  background-color: #d9480f; /* 橙色，类似 Tailwind 的 orange-600 */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

nav .search-btn:hover {
  background-color: #993300; /* 更深的橙色，类似 Tailwind 的 orange-800 */
}

/* 上传按钮特殊样式 */
nav .upload-btn {
  position: relative;
  overflow: hidden;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(251, 146, 60, 0.3);
}

nav .upload-btn:hover {
  box-shadow: 0 4px 15px rgba(251, 146, 60, 0.4);
}

nav .upload-btn::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0)
  );
  transform: rotate(30deg);
  transition: all 0.3s ease;
}

nav .upload-btn:hover::after {
  left: 100%;
}

nav button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

nav .login-btn {
  background-color: #fef3c7; /* 浅黄色，类似 Tailwind 的 yellow-200 */
  color: #d9480f; /* 橙色，类似 Tailwind 的 orange-600 */
}

nav .login-btn:hover {
  background-color: #fcd34d; /* 更深的浅黄色，类似 Tailwind 的 yellow-300 */
}

nav .register-btn {
  background-color: #d9480f; /* 橙色，类似 Tailwind 的 orange-600 */
  color: white;
}

nav .register-btn:hover {
  background-color: #993300; /* 更深的橙色，类似 Tailwind 的 orange-800 */
}
</style>