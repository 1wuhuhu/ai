<template>
  <div class="pagination">
    <button @click="$emit('prevPage')" :disabled="currentPage === 1">上一页</button>
    <span>第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
    <button @click="$emit('nextPage')" :disabled="currentPage === totalPages">下一页</button>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponents',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
/* 可复用 styles.css 中的分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
}

.pagination button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 8px;
}

.pagination button:hover {
  background-color: #0056b3;
}

.pagination span {
  margin: 0 16px;
}
</style>