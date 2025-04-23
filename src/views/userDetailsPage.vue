<template>
  <div class="user-profile-container">
    <!-- 背景图 -->
    <div class="header-bg">
      <img
          src="https://picsum.photos/1200/200"
          alt="用户背景图"
          style="width: 100%; height: 100%; "
      />
    </div>
    <div class="header-section">
      <div class="statistic-item">
        <span class="statistic-label">粉丝</span>
        <span class="statistic-value">{{ 222 }}</span>
      </div>
      <div class="statistic-item">
        <span class="statistic-label">关注</span>
        <span class="statistic-value">{{ 111 }}</span>
      </div>
      <div class="avatar-container">
        <el-avatar :size="100" shape="circle" :src="avatarSrc" icon="el-icon-user"></el-avatar>
      </div>
      <div class="statistic-item">
        <span class="statistic-label">原创</span>
        <span class="statistic-value">{{ 333 }}</span>
      </div>
      <div class="statistic-item">
        <span class="statistic-label">积分</span>
        <span class="statistic-value">{{ 333 }}</span>
      </div>
    </div>
    <div class="user-info-section">
      <div class="username">{{ 'Windir' }}</div>
      <div class="user-desc">一枚热爱插画的视觉设计师</div>
      <div class="action-buttons">
        <el-button
            :type="isFollowed? 'info' : 'primary'"
            :icon="isFollowed? 'el-icon-check' : 'el-icon-plus'"
            @click="handleFollow"
        >
          {{ isFollowed? '已关注' : '关注' }}
        </el-button>
        <el-button type="text" icon="el-icon-message" @click="handleMessage">私信</el-button>
      </div>
    </div>
    <div class="tab-section">
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="首页" name="home"> </el-tab-pane>
        <el-tab-pane label="收藏" name="favorites"> </el-tab-pane>
        <el-tab-pane label="推荐" name="recommend"> </el-tab-pane>
        <el-tab-pane label="资料" name="profile"> </el-tab-pane>
        <el-tab-pane label="评论" name="comments"> </el-tab-pane>
      </el-tabs>
    </div>
    <div class="work-section">
      <div class="work-count">共上传100组作品</div>
      <div class="work-list">
        <div class="work-item" v-for="(index, i) in 4" :key="i">
          <el-image
              style="width: 100%; height: 200px"
              :src="`https://via.placeholder.com/300?text=Work+${i}`"
              :preview-src-list="['https://via.placeholder.com/300?text=Work+Preview+${i}']"
          />
          <div class="work-title">游戏UI设计实训营</div>
          <div class="work-desc">下一款爆款游戏会是你设计的吗</div>
          <div class="work-meta">
            <span>🖐️ 7777</span>
            <span>👍 7777</span>
            <span>📌 33333</span>
          </div>
          <div class="work-author">
            <el-avatar size="20" icon="el-icon-user"></el-avatar>
            <span>Windir</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElAvatar, ElButton, ElImage, ElTabs, ElTabPane } from 'element-plus';

// 模拟用户头像地址，实际使用中替换为真实地址
const avatarSrc = ref('https://picsum.photos/200');

// 模拟关注状态，实际使用中可以根据接口返回值调整
const isFollowed = ref(false);

const activeTab = ref('home');

const handleFollow = () => {
  isFollowed.value =!isFollowed.value;
  // 这里可以添加实际的关注/取消关注接口调用逻辑
};

const handleMessage = () => {
  // 这里可以添加实际的私信跳转或打开聊天窗口逻辑
  console.log('打开私信功能');
};
</script>

<style scoped>
.user-profile-container {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.header-bg {
  position: relative;
  height: 200px;
}

.header-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  color: white;
}

.statistic-item {
  text-align: center;
}

.statistic-label {
  display: block;
  font-size: 14px;
  color: #ccc;
  margin-bottom: 5px;
}

.statistic-value {
  font-size: 18px;
  font-weight: bold;
}

.avatar-container {
  text-align: center;
}

.user-info-section {
  text-align: center;
  padding: 20px;
  background-color: white;
}

.username {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.user-desc {
  color: #777;
  margin-bottom: 20px;
  font-size: 16px;
}

.action-buttons {
  display: flex;
  justify-content: center;
}

.action-buttons.el-button {
  margin: 0 10px;
}

.tab-section {
  background-color: white;
  padding: 10px;
}

.work-section {
  padding: 20px;
}

.work-count {
  color: #999;
  margin-bottom: 15px;
  font-size: 16px;
  text-align: center;
}

.work-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.work-item {
  width: calc(25% - 20px);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
  padding: 15px;
  transition: box-shadow 0.3s ease;
}

.work-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.work-title {
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
}

.work-desc {
  color: #777;
  font-size: 12px;
  margin-bottom: 10px;
}

.work-meta {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}

.work-author {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #999;
}
</style>