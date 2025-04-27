<template>
  <div class="profile-container">
    <!-- Profile Header Section -->
    <div class="profile-header">
      <div class="profile-avatar-container">
        <img :src="user.avatar" :alt="user.name" class="profile-avatar">
        <button v-if="isCurrentUser" class="edit-avatar-btn" @click="editAvatar">
          <i class="fas fa-camera"></i>
        </button>
      </div>
      <div class="profile-info">
        <h1 class="profile-name">{{ user.name }}</h1>
        <p class="profile-bio">{{ user.bio || '这个用户还没有签名~' }}</p>
        <div class="profile-stats">
          <div class="stat-item">
            <span class="stat-number">{{ user.stats.followers }}</span>
            <span class="stat-label">粉丝</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ user.stats.following }}</span>
            <span class="stat-label">关注</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ user.stats.artworks }}</span>
            <span class="stat-label">作品</span>
          </div>
        </div>
        <div class="profile-actions">
          <button v-if="!isCurrentUser" class="follow-btn" @click="toggleFollow">
            {{ isFollowing ? '已关注' : '+ 关注' }}
          </button>
          <button v-if="isCurrentUser" class="edit-profile-btn" @click="editProfile">
            <i class="fas fa-edit"></i> 编辑资料
          </button>
        </div>
      </div>
    </div>

    <!-- Artwork Gallery Section -->
    <div class="artworks-section">
      <h2 class="section-title">
        <i class="fas fa-camera-retro"></i> 我的作品
        <span class="artwork-count">({{ pagination.total }})</span>
      </h2>

      <ArtworkList
          :artworks="artworks"
          @like="handleLike"
      />

      <Pagination
          v-if="pagination.totalPages > 1"
          :total-pages="pagination.totalPages"
          :current-page="pagination.currentPage"
          @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArtworkList from '@/components/work/ArtworkListComponents'
import Pagination from '@/components/work/PaginationComponents'

const route = useRoute()
const router = useRouter()
const userId = route.params.id

// Mock user data - replace with actual API call
const user = ref({
  id: userId,
  name: 'AI摄影大师',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  bio: '用AI捕捉世界的美丽瞬间 | 摄影爱好者 | 人工智能艺术探索者',
  stats: {
    followers: 1243,
    following: 56,
    artworks: 28
  }
})

// Mock artworks data - replace with actual API call
const artworks = ref([
  {
    id: 1,
    title: 'AI生成的梦幻森林',
    image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f',
    category: 'landscape',
    views: 3245,
    likes: 876,
    comments: 43,
    liked: false,
    user: {
      name: user.value.name,
      avatar: user.value.avatar
    }
  },
  // More artworks...
])

const pagination = ref({
  currentPage: 1,
  totalPages: 3,
  total: 28
})

const isCurrentUser = computed(() => {
  // Compare with logged in user's ID
  return userId === 'current-user-id' // Replace with actual check
})

const isFollowing = ref(false)

// Methods
const toggleFollow = () => {
  isFollowing.value = !isFollowing.value
  if (isFollowing.value) {
    user.value.stats.followers++
  } else {
    user.value.stats.followers--
  }
}

const editProfile = () => {
  // 跳转到编辑资料页面，并传递用户ID
  router.push({ path: '/edit-profile', query: { userId: userId } });
}

const editAvatar = () => {
  console.log('Edit avatar')
}

const handleLike = (artwork) => {
  console.log('Liked artwork:', artwork.id)
}

const handlePageChange = (page) => {
  pagination.value.currentPage = page
  // Fetch artworks for new page
  fetchArtworks(page)
}

const fetchArtworks = async (page = 1) => {
  console.log(`Fetching artworks for page ${page}`)
  // Replace with actual API call
  // const response = await api.getUserArtworks(userId, page)
  // artworks.value = response.data
  // pagination.value = response.pagination
}

onMounted(() => {
  fetchArtworks()
})
</script>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.profile-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.profile-avatar-container {
  position: relative;
  width: 150px;
  height: 150px;
  flex-shrink: 0;
}

.profile-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.edit-avatar-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #4361ee;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-avatar-btn:hover {
  background: #3a56d4;
  transform: scale(1.1);
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #2b2d42;
}

.profile-bio {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.profile-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2b2d42;
}

.stat-label {
  font-size: 0.9rem;
  color: #6c757d;
}

.profile-actions {
  display: flex;
  gap: 1rem;
}

.follow-btn, .edit-profile-btn {
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.follow-btn {
  background: #4361ee;
  color: white;
  border: none;
}

.follow-btn:hover {
  background: #3a56d4;
}

.edit-profile-btn {
  background: white;
  color: #4361ee;
  border: 1px solid #4361ee;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.edit-profile-btn:hover {
  background: rgba(67, 97, 238, 0.1);
}

.artworks-section {
  margin-top: 2rem;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2b2d42;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.artwork-count {
  font-size: 1rem;
  color: #6c757d;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-stats {
    justify-content: center;
  }

  .profile-actions {
    justify-content: center;
  }
}
</style>