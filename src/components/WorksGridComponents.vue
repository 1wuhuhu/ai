<template>
  <div class="works-grid">
    <div
        v-for="(work, index) in currentPageWorks"
        :key="index"
        class="work-card"
    >
      <div class="work-card-overlay">
        <img :src="work.imageUrl" alt="作品图片" />
        <button>查看详情</button>
      </div>
      <div class="work-card-content">
        <h3>{{ work.title }}</h3>
        <div class="work-card-meta">
          <i class="fa-solid fa-thumbs-up"></i>
          <span>{{ work.likes }}</span>
          <i class="fa-solid fa-comment"></i>
          <span>{{ work.comments }}</span>
        </div>
        <div class="work-card-publisher">
          <img :src="work.publisherAvatar" alt="发布者头像" />
          <span>{{ work.publisherName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorksGridComponents',
  props: {
    recommendedWorks: {
      type: Array,
      default: () => [
        {
          imageUrl: "https://picsum.photos/200/200",
          title: "作品标题 1",
          likes: 100,
          comments: 20,
          publisherName: "发布者昵称 1",
          publisherAvatar: "https://picsum.photos/50/50"
        },
        {
          imageUrl: "https://picsum.photos/201/200",
          title: "作品标题 2",
          likes: 120,
          comments: 30,
          publisherName: "发布者昵称 2",
          publisherAvatar: "https://picsum.photos/50/51"
        },
        {
          imageUrl: "https://picsum.photos/202/200",
          title: "作品标题 3",
          likes: 80,
          comments: 15,
          publisherName: "发布者昵称 3",
          publisherAvatar: "https://picsum.photos/50/52"
        },
        {
          imageUrl: "https://picsum.photos/203/200",
          title: "作品标题 4",
          likes: 150,
          comments: 40,
          publisherName: "发布者昵称 4",
          publisherAvatar: "https://picsum.photos/50/53"
        }
      ]
    },
    currentPage: {
      type: Number,
      default: 1
    },
    itemsPerPage: {
      type: Number,
      default: 24
    }
  },
  computed: {
    currentPageWorks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.recommendedWorks.slice(startIndex, endIndex);
    }
  }
};
</script>

<style scoped>
/* 可复用 styles.css 中的作品列表样式 */
.works-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 32px;
  margin-bottom: 32px;
}

.work-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.work-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.16), 0 4px 6px rgba(0, 0, 0, 0.24);
}

.work-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.work-card-content {
  padding: 16px;
}

.work-card h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: bold;
}

.work-card-meta {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.work-card-meta i {
  color: #007BFF;
  margin-right: 4px;
}

.work-card-publisher {
  display: flex;
  align-items: center;
}

.work-card-publisher img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

.work-card-overlay {
  position: relative;
  overflow: hidden;
}

.work-card-overlay::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  background-color: rgba(0, 0, 128, 0.7);
  transition: height 0.3s ease;
}

.work-card-overlay:hover::after {
  height: 100%;
}

.work-card-overlay button {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  padding: 8px 16px;
  background-color: white;
  color: #007BFF;
  border: none;
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.work-card-overlay:hover button {
  opacity: 1;
}
</style>