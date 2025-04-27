<template>
  <div>
    <main className="px-8 py-6">
      <CarouselComponents :carouselItems="carouselItems"/>
      <ArtworkList :artworks="currentArtworks"/>
      <PaginationComponents :totalPages="totalPages" :currentPage="currentPage" @page-change="handlePageChange"/>
    </main>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import CarouselComponents from '@/components/CarouselComponents.vue';
import ArtworkList from '../components/work/ArtworkListComponents.vue';
import PaginationComponents from '../components/work/PaginationComponents.vue';

// 轮播图数据
const carouselItems = [
  {imageUrl: "https://picsum.photos/1200/600"},
  {imageUrl: "https://picsum.photos/1200/601"}
];

// 推荐作品数据
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

// 当前页码
const currentPage = ref(1);
// 每页显示的作品数量
const itemsPerPage = ref(12);

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(artworks.length / itemsPerPage.value);
});

// 计算当前页的作品
const currentArtworks = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return artworks.slice(startIndex, endIndex);
});

// 处理页码变化
const handlePageChange = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
/* 引入外部样式文件 */
@import url('../css/styles.css');
</style>