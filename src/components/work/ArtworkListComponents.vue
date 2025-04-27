<template>
  <div class="artwork-grid">
    <div v-for="artwork in artworks" :key="artwork.id" class="artwork-card">
      <div class="artwork-image-container">
        <img :src="artwork.image" :alt="artwork.title" class="artwork-image">
        <span :class="['artwork-badge', `badge-${artwork.category}`]">{{ artwork.category }}</span>
      </div>
      <div class="artwork-info">
        <h3 class="artwork-title">{{ artwork.title }}</h3>
        <div class="user-info">
          <img :src="artwork.user.avatar" :alt="artwork.user.name" class="user-avatar">
          <span class="username">{{ artwork.user.name }}</span>
        </div>
        <div class="artwork-stats">
          <div class="stat"><i class="fas fa-eye"></i> {{ artwork.views }}</div>
          <div class="stat" :class="{ liked: artwork.liked }" @click="toggleLike(artwork)">
            <i class="fas fa-heart"></i> {{ artwork.likes }}
          </div>
          <div class="stat"><i class="fas fa-comment"></i> {{ artwork.comments }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  artworks: {
    type: Array,
    required: true
  }
});

const toggleLike = (artwork) => {
  artwork.liked =!artwork.liked;
  if (artwork.liked) {
    artwork.likes++;
  } else {
    artwork.likes--;
  }
};
</script>

<style scoped>
.artwork-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.8rem;
  margin-bottom: 3rem;
}

.artwork-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
}

.artwork-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.artwork-image-container {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.artwork-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  border-radius: 12px 12px 0 0;
}

.artwork-card:hover.artwork-image {
  transform: scale(1.05);
}

.artwork-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #4361ee;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.badge-portrait {
  background: rgba(255, 105, 180, 0.9);
  color: white;
}

.badge-landscape {
  background: rgba(100, 200, 100, 0.9);
  color: white;
}

.badge-culture {
  background: rgba(255, 165, 0, 0.9);
  color: white;
}

.badge-news {
  background: rgba(70, 130, 180, 0.9);
  color: white;
}

.badge-animal {
  background: rgba(147, 112, 219, 0.9);
  color: white;
}

.artwork-info {
  padding: 1.5rem;
}

.artwork-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: #2b2d42;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 3em;
  line-height: 1.5em;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  gap: 0.8rem;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.artwork-card:hover.user-avatar {
  transform: scale(1.1);
}

.username {
  font-size: 0.9rem;
  font-weight: 500;
  color: #2b2d42;
}

.artwork-stats {
  display: flex;
  justify-content: space-between;
  color: #6c757d;
  font-size: 0.85rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 0.8rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
}

.stat:hover {
  background: rgba(67, 97, 238, 0.1);
  color: #4361ee;
}

.stat i {
  font-size: 0.9rem;
}

.stat.liked {
  color: #f72585;
}
</style>