<template>
  <div>
    <main class="px-8 py-6">
      <CarouselComponents :carouselItems="carouselItems" />
      <WorksGridComponents :recommendedWorks="recommendedWorks" :currentPage="currentPage" :itemsPerPage="itemsPerPage" />
      <PaginationComponents :currentPage="currentPage" :totalPages="totalPages" @prevPage="prevPage" @nextPage="nextPage" />
    </main>
  </div>
</template>

<script>
import CarouselComponents from '@/components/CarouselComponents.vue';
import WorksGridComponents from '@/components/WorksGridComponents.vue';
import PaginationComponents from '@/components/PaginationComponents.vue';

export default {
  name: 'homePage',
  components: {
    CarouselComponents,
    WorksGridComponents,
    PaginationComponents
  },
  data() {
    return {
      carouselItems: [
        { imageUrl: "https://picsum.photos/1200/600" },
        { imageUrl: "https://picsum.photos/1200/601" }
      ],
      recommendedWorks: [
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
      ],
      currentPage: 1,
      itemsPerPage: 24
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.recommendedWorks.length / this.itemsPerPage);
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>

<style scoped>
/* 引入外部样式文件 */
@import url('../css/styles.css');
</style>