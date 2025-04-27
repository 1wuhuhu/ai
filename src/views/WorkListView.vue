<template>
  <div class="gallery-container">
    <div class="gallery-header">
      <h1 class="gallery-title">摄影集</h1>
      <div class="filters">
        <button class="filter-btn active"><i class="fas fa-th-large"></i> 全部</button>
        <button class="filter-btn"><i class="fas fa-user"></i> 人像</button>
        <button class="filter-btn"><i class="fas fa-mountain"></i> 风光</button>
        <button class="filter-btn"><i class="fas fa-users"></i> 人文</button>
        <button class="filter-btn"><i class="fas fa-newspaper"></i> 新闻</button>
        <button class="filter-btn"><i class="fas fa-paw"></i> 动物</button>
      </div>
    </div>
    <ArtworkList :artworks="currentArtworks" />
    <Pagination :totalPages="totalPages" :currentPage="currentPage" @page-change="handlePageChange" />
    <div class="load-more">
      <button class="load-more-btn" @click="loadMore">
        <i class="fas fa-plus"></i> 加载更多作品
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ArtworkList from '../components/work/ArtworkListComponents.vue';
import Pagination from '../components/work/PaginationComponents.vue';

const artworks = [
  {
    id: 1,
    title: '城市街头肖像 - 光影交错的黑白人像',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    category: 'portrait',
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      name: '人像摄影师James'
    },
    views: 3200,
    likes: 856,
    comments: 92,
    liked: false
  },
  {
    id: 2,
    title: '落基山脉日出 - 长曝光风光摄影',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    category: 'landscape',
    user: {
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: '风光摄影师Sarah'
    },
    views: 5700,
    likes: 1400,
    comments: 128,
    liked: false
  },
  {
    id: 3,
    title: '市集生活 - 东南亚传统市场纪实',
    image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34',
    category: 'culture',
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
      name: '纪实摄影师Robert'
    },
    views: 2800,
    likes: 723,
    comments: 64,
    liked: false
  },
  {
    id: 4,
    title: '城市抗议现场 - 新闻纪实摄影',
    image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1',
    category: 'news',
    user: {
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      name: '新闻记者Emily'
    },
    views: 4500,
    likes: 1100,
    comments: 156,
    liked: false
  },
  {
    id: 5,
    title: '草原之王 - 非洲狮子特写',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5',
    category: 'animal',
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
      name: '野生动物摄影师Tom'
    },
    views: 6300,
    likes: 2100,
    comments: 187,
    liked: false
  },
  {
    id: 6,
    title: '芭蕾舞者 - 舞台人像摄影',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    category: 'portrait',
    user: {
      avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
      name: '艺术摄影师Anna'
    },
    views: 3900,
    likes: 1300,
    comments: 98,
    liked: false
  },
  {
    id: 7,
    title: '挪威峡湾 - 极光与星空长曝光',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    category: 'landscape',
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/88.jpg',
      name: '风光摄影师Lars'
    },
    views: 7200,
    likes: 2500,
    comments: 214,
    liked: false
  },
  {
    id: 8,
    title: '街头艺人 - 城市文化纪实',
    image: 'https://images.unsplash.com/photo-1522206024047-9c925421675b',
    category: 'culture',
    user: {
      avatar: 'https://randomuser.me/api/portraits/women/66.jpg',
      name: '街头摄影师Mia'
    },
    views: 2100,
    likes: 543,
    comments: 47,
    liked: false
  },
  {
    id: 9,
    title: '消防员救援 - 突发事件现场',
    image: 'https://images.unsplash.com/photo-1495563381401-ecfbcaaa60f2',
    category: 'news',
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
      name: '新闻摄影师David'
    },
    views: 8600,
    likes: 3200,
    comments: 276,
    liked: false
  },
  {
    id: 10,
    title: '雪豹 - 喜马拉雅山脉珍稀动物',
    image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890',
    category: 'animal',
    user: {
      avatar: 'https://randomuser.me/api/portraits/women/77.jpg',
      name: '野生动物摄影师Lisa'
    },
    views: 9400,
    likes: 4100,
    comments: 342,
    liked: false
  },
  {
    id: 11,
    title: '孕妇写真 - 自然光人像摄影',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df',
    category: 'portrait',
    user: {
      avatar: 'https://randomuser.me/api/portraits/women/88.jpg',
      name: '人像摄影师Sophia'
    },
    views: 3500,
    likes: 987,
    comments: 112,
    liked: false
  },
  {
    id: 12,
    title: '迷雾森林 - 清晨自然风光',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    category: 'landscape',
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      name: '自然摄影师Carl'
    },
    views: 4800,
    likes: 1700,
    comments: 143,
    liked: false
  },
  {
    id: 13,
    title: '沙漠驼队 - 西部人文摄影',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    category: 'culture',
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
      name: '人文摄影师Jack'
    },
    views: 2600,
    likes: 650,
    comments: 78,
    liked: false
  },
  {
    id: 14,
    title: '海边日落 - 浪漫风光摄影',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    category: 'landscape',
    user: {
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      name: '风光摄影师Luna'
    },
    views: 5200,
    likes: 1200,
    comments: 105,
    liked: false
  },
  {
    id: 15,
    title: '音乐会现场 - 音乐新闻摄影',
    image: 'https://images.unsplash.com/photo-1517148121675-ba34cd207d6b',
    category: 'news',
    user: {
      avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
      name: '新闻摄影师Mike'
    },
    views: 3800,
    likes: 920,
    comments: 89,
    liked: false
  },
  {
    id: 16,
    title: '猴子家族 - 灵长类动物摄影',
    image: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759',
    category: 'animal',
    user: {
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      name: '动物摄影师Eve'
    },
    views: 4100,
    likes: 1050,
    comments: 118,
    liked: false
  }
];

const itemsPerPage = ref(12);
const currentPage = ref(1);
const totalPages = ref(Math.ceil(artworks.length / itemsPerPage.value));

const getCurrentArtworks = () => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return artworks.slice(startIndex, endIndex);
};

const currentArtworks = ref(getCurrentArtworks());

const handlePageChange = (page) => {
  currentPage.value = page;
  currentArtworks.value = getCurrentArtworks();
};

const loadMore = () => {
  // 模拟加载
  const loadMoreBtn = document.querySelector('.load-more-btn');
  loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 加载中...';
  setTimeout(() => {
    loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> 加载更多作品';
    alert('已加载更多作品');
  }, 1500);
};
</script>

<style scoped>
:root {
  --primary: #4361ee;
  --primary-light: #4895ef;
  --secondary: #f72585;
  --dark: #2b2d42;
  --light: #f8f9fa;
  --gray: #6c757d;
  --success: #4cc9f0;
  --border-radius: 12px;
  --shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

body {
  background-color: var(--light);
  padding: 2rem;
  color: var(--dark);
}

.gallery-container {
  max-width: 1400px;
  margin: 0 auto;
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.gallery-title {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  padding-left: 1.5rem;
}

.gallery-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 80%;
  background: var(--primary);
  border-radius: 20px;
}

.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.6rem 1.2rem;
  border-radius: var(--border-radius);
  border: none;
  background: white;
  color: var(--gray);
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.2);
}

.filter-btn i {
  font-size: 0.9rem;
}

.load-more {
  text-align: center;
  margin-top: 2rem;
}

.load-more-btn {
  padding: 0.8rem 2rem;
  background: white;
  border: none;
  border-radius: var(--border-radius);
  color: var(--primary);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.load-more-btn:hover {
  background: var(--primary);
  color: white;
  box-shadow: 0 8px 20px rgba(67, 97, 238, 0.3);
}

@media (max-width: 768px) {
  body {
    padding: 1rem;
  }

  .artwork-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.2rem;
  }

  .artwork-image-container {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .gallery-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .filters {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }

  .filter-btn {
    flex-shrink: 0;
  }
}
</style>