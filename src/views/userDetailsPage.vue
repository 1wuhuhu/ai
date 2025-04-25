<template>
  <div>
    <!-- 头图 -->
    <div class="hero">
      <img class="avatar" src="https://picsum.photos/150/150" alt="头像">
      <h1>{{ userNickname }}个人作品集</h1>
    </div>
    <!-- 导航栏 -->
    <nav>
      <a href="#">品牌</a>
      <a href="#">海报</a>
      <a href="#">UI</a>
    </nav>
    <!-- 作品分类展示区 -->
    <div class="portfolio">
      <div class="portfolio-card" v-for="(image, index) in portfolioImages" :key="index">
        <img :src="image" :alt="'作品' + (index + 1)">
        <h3>作品{{ index + 1 }}</h3>
      </div>
    </div>
    <!-- 联系表单 -->
    <div class="contact-form">
      <h2>联系我们</h2>
      <form>
        <input type="text" placeholder="姓名">
        <input type="email" placeholder="邮箱">
        <textarea placeholder="需求描述"></textarea>
        <button type="submit">提交</button>
      </form>
    </div>
    <!-- 社交媒体链接 -->
    <div class="social-media">
      <a href="#">Facebook</a>
      <a href="#">Twitter</a>
      <a href="#">Instagram</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userNickname: '动态昵称', // 可根据实际情况修改此昵称
      portfolioImages: [
        'https://p3-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_generation/2988c3e31fe68b55e5c789859e778505_1741676608255000828.jpeg~tplv-a9rns2rl98-image.jpeg?rk3s=25bff839&x-expires=1773212608&x-signature=BGNQKzQHjCUWuP3358I1AuG8AgM%3D',
        'https://p3-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_generation/a3ffaf4dff67c7e58c4fc885643bc615_1741676772797022643.jpeg~tplv-a9rns2rl98-image.jpeg?rk3s=25bff839&x-expires=1773212772&x-signature=c6ffRcNU11wWMqNXsms%2F8KDqGBE%3D',
        'https://p9-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_generation/b5667ae1754a29f6e069cfd812244d33_1741676780503652328.jpeg~tplv-a9rns2rl98-image.jpeg?rk3s=25bff839&x-expires=1773212780&x-signature=fiTrHsN2qhuOaAzayGVAfUfWkhg%3D',
        'https://p3-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_generation/43e6290f18ee5bc4903d76f9717a52b6_1741676793075906318.jpeg~tplv-a9rns2rl98-image.jpeg?rk3s=25bff839&x-expires=1773212793&x-signature=VwCh7DJ6ZqoVBY1rtsp%2FDEpxoZM%3D',
        'https://p3-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_generation/2da7068d0eccfbd948b49573a898497a_1741676796261828122.jpeg~tplv-a9rns2rl98-image.jpeg?rk3s=25bff839&x-expires=1773212796&x-signature=uIIiTkeWo8GWGoUoK4Qy4qxBunU%3D',
        'https://p3-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_generation/6983a7f631da8bd703f55446e97fb67b_1741676814574567326.jpeg~tplv-a9rns2rl98-image.jpeg?rk3s=25bff839&x-expires=1773212814&x-signature=NAgTrIWKVBnWYFyzSO17BZZM3%2FY%3D',
        'https://p9-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_generation/29b4f83ce72c120a37ab9c761b0db6d2_1741676819325501108.jpeg~tplv-a9rns2rl98-image.jpeg?rk3s=25bff839&x-expires=1773212819&x-signature=EsIuTJFNCHlwr9DV80%2BwpxyuqhQ%3D',
        'https://p3-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_generation/ef992168f008e0c1a1438e57aeeffaa3_1741676842016969033.jpeg~tplv-a9rns2rl98-image.jpeg?rk3s=25bff839&x-expires=1773212842&x-signature=Mu%2BocIGzO62zBluIFGLH1n6yRmw%3D',
        'https://p9-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_generation/0a1d13c8aa3e40b71330cf360695d22f_1741676843812404689.jpeg~tplv-a9rns2rl98-image.jpeg?rk3s=25bff839&x-expires=1773212843&x-signature=%2BzjzO2%2FxNBSr2qX0Av2dX6nBD7E%3D',
        'https://p3-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_generation/b1f5de2f3e308e5b9d67ddbd194f510b_1741676845622130502.jpeg~tplv-a9rns2rl98-image.jpeg?rk3s=25bff839&x-expires=1773212845&x-signature=TyicEtBcta4LyPlrM8t%2Be1bZTso%3D'
      ]
    };
  }
};
</script>

<style scoped>
/* 全局样式 */
body {
  background: linear-gradient(to bottom, #121212, #000);
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro', 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Zen Hei', sans-serif;
  margin: 0;
  padding: 0;
}

/* 头图样式 */
.hero {
  background-image: url('https://p9-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_generation/eccdf8c573aadd06e328d8851ab0c00f_1741676810548865596.jpeg~tplv-a9rns2rl98-image.jpeg?rk3s=25bff839&x-expires=1773212810&x-signature=2IFyOmdqAXYpcj9n%2F8KfWze%2BW6c%3D');
  background-size: cover;
  background-position: center;
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding-left: 50px; /* 整体左移 */
}

.hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.hero h1 {
  font-family: 'SF Pro', sans-serif;
  font-size: 3rem;
  z-index: 1;
}

.avatar {
  width: 150px; /* 放大头像 */
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  z-index: 1;
}

/* 导航栏样式 */
nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 15px;
}

nav a {
  text-decoration: none;
  color: hsl(210, 100%, 50%); /* 修改按钮文字颜色 */
  padding: 10px 20px;
  border: 2px solid hsl(210, 100%, 50%); /* 修改按钮边框颜色 */
  border-radius: 20px;
  transition: all 0.3s ease;
}

nav a:hover {
  border-color: hsl(210, 100%, 70%);
  color: hsl(210, 100%, 70%);
  background-color: rgba(255, 255, 255, 0.1);
}

nav a:active {
  background-color: hsl(210, 100%, 20%);
}

/* 作品分类展示区样式 */
.portfolio {
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
}

.portfolio-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease;
}

.portfolio-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.portfolio-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.portfolio-card h3 {
  padding: 15px;
  margin: 0;
  font-family: 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Zen Hei', sans-serif;
}

/* 联系表单样式 */
.contact-form {
  padding: 15px;
  max-width: 600px;
  margin: 0 auto;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  outline: none;
  transition: box-shadow 0.3s ease;
}

.contact-form input:focus,
.contact-form textarea:focus {
  box-shadow: 0 0 0 3px hsl(210, 100%, 50%), 0 0 10px hsl(210, 100%, 50%);
  animation: breathing 1.5s infinite;
}

@keyframes breathing {
  0% {
    box-shadow: 0 0 0 3px hsl(210, 100%, 50%), 0 0 10px hsl(210, 100%, 50%);
  }
  50% {
    box-shadow: 0 0 0 6px hsl(210, 100%, 50%), 0 0 20px hsl(210, 100%, 50%);
  }
  100% {
    box-shadow: 0 0 0 3px hsl(210, 100%, 50%), 0 0 10px hsl(210, 100%, 50%);
  }
}

.contact-form button {
  width: 100%;
  padding: 10px;
  background-color: hsl(210, 100%, 50%);
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

/* 社交媒体链接样式 */
.social-media {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 15px;
}

.social-media a {
  color: #fff;
  font-size: 24px;
  transition: transform 0.3s ease;
}

.social-media a:hover {
  transform: rotate(15deg);
}
</style>