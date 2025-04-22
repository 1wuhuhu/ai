<template>
  <div class="carousel">
    <div class="carousel-inner">
      <div
          v-for="(item, index) in carouselItems"
          :key="index"
          :class="{ 'carousel-item': true, active: index === currentSlide }"
      >
        <img :src="item.imageUrl" alt="..." />
      </div>
    </div>
    <div class="carousel-indicators">
      <button
          v-for="(item, index) in carouselItems"
          :key="index"
          :class="{ active: index === currentSlide }"
          @click="goToSlide(index)"
      ></button>
    </div>
    <button class="carousel-control prev" @click="prevSlide">
      <i class="fa fa-angle-left"></i>
    </button>
    <button class="carousel-control next" @click="nextSlide">
      <i class="fa fa-angle-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CarouselComponents',
  data() {
    return {
      carouselItems: [
        { imageUrl: "https://picsum.photos/1200/600" },
        { imageUrl: "https://picsum.photos/1200/601" }
      ],
      currentSlide: 0
    };
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length;
    },
    prevSlide() {
      this.currentSlide =
          this.currentSlide === 0
              ? this.carouselItems.length - 1
              : this.currentSlide - 1;
    },
    goToSlide(index) {
      this.currentSlide = index;
    }
  },
  mounted() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
};
</script>

<style scoped>
/* 可复用 styles.css 中的轮播图样式 */
.carousel {
  position: relative;
  margin: 32px auto;
  border-radius: 8px;
  overflow: hidden;
  width: 80%;
}

.carousel-inner {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 40%;
}

.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.7s ease-in-out;
}

.carousel-item.active {
  opacity: 1;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.carousel-indicators button {
  width: 10px;
  height: 10px;
  border: none;
  border-radius: 50%;
  background-color: #ccc;
  opacity: 0.5;
  margin: 0 5px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.carousel-indicators button.active {
  opacity: 1;
  background-color: #007BFF;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.carousel-control:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.carousel-control.prev {
  left: 10px;
}

.carousel-control.next {
  right: 10px;
}

.carousel:hover .carousel-control {
  opacity: 1;
}
</style>