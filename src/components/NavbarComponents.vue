<template>
  <nav class="flex items-center justify-between px-8 py-4 bg-white shadow-md border-b border-gray-200">
    <div class="logo">ai-photograph-platform标志</div>
    <ul class="flex items-center space-x-4">
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/ai">ai</router-link></li>
      <li><router-link to="/shoot">约拍</router-link></li>
      <li class="search-container">
        <input
            type="text"
            placeholder="搜索"
        />
        <button class="search-btn">搜索</button>
      </li>
      <li><button class="login-btn">登录</button></li>
      <li><button class="register-btn">注册</button></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponents'
}
</script>

<style scoped>
/* 可复用 styles.css 中的导航栏样式 */
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
  color: #007BFF;
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
  color: #007BFF;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #0056b3;
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
  border-color: #007BFF;
}

nav .search-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 0 8px 8px 0;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

nav .search-btn:hover {
  background-color: #0056b3;
}

nav button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

nav .login-btn {
  background-color: #F5F5F5;
  color: #000;
}

nav .login-btn:hover {
  background-color: #e0e0e0;
}

nav .register-btn {
  background-color: #007BFF;
  color: white;
}

nav .register-btn:hover {
  background-color: #0056b3;
}
</style>