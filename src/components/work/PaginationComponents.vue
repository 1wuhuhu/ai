<template>
  <div class="pagination">
    <button class="page-btn" :class="{ disabled: currentPage === 1 }" @click="prevPage">
      <i class="fas fa-chevron-left"></i>
    </button>
    <button
        v-for="page in totalPages"
        :key="page"
        class="page-btn"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
    >
      {{ page }}
    </button>
    <button class="page-btn" :class="{ disabled: currentPage === totalPages }" @click="nextPage">
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  totalPages: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    default: 1
  }
});

const emit = defineEmits(['page-change']);

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('page-change', props.currentPage + 1);
  }
};

const goToPage = (page) => {
  if (page!== props.currentPage) {
    emit('page-change', page);
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
}

.page-btn {
  width: 42px;
  height: 42px;
  border: none;
  background: white;
  color: #6c757d;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.page-btn:hover:not(.active):not(.disabled) {
  background: rgba(67, 97, 238, 0.1);
  color: #4361ee;
}

.page-btn.active {
  background: #4361ee;
  color: white;
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.2);
}

.page-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>