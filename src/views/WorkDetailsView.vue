<template>
  <div class="work-detail-container">
    <!-- 返回按钮 -->
    <button class="back-button" @click="$router.go(-1)">
      <i class="fas fa-arrow-left"></i> 返回
    </button>

    <!-- 作品内容区域 -->
    <div class="work-content">
      <!-- 作者信息 -->
      <div class="author-info">
        <div class="author-avatar">
          <img :src="work.author.avatar" :alt="work.author.name">
        </div>
        <div class="author-meta">
          <div class="author-name">{{ work.author.name }}</div>
          <div class="publish-time">
            <i class="far fa-clock"></i> {{ formatDate(work.createdAt) }}
          </div>
        </div>
        <button class="follow-btn" v-if="!isAuthor" @click="toggleFollow">
          {{ isFollowing ? '已关注' : '+ 关注' }}
        </button>
      </div>

      <!-- 作品标题和内容 -->
      <h1 class="work-title">{{ work.title }}</h1>

      <div class="work-image">
        <img :src="work.imageUrl" :alt="work.title">
      </div>

      <div class="work-description" v-html="compiledMarkdown"></div>

      <!-- 标签 -->
      <div class="work-tags">
        <span class="work-category">
          <i :class="categoryIcon"></i> {{ categoryName }}
        </span>
        <span v-for="(tag, index) in work.tags" :key="index" class="tag">
          #{{ tag }}
        </span>
      </div>

      <!-- 互动统计 -->
      <div class="work-stats">
        <button class="stat-btn" @click="toggleLike" :class="{ liked: isLiked }">
          <i class="far fa-heart"></i> {{ work.likesCount }}
        </button>
        <div class="stat-btn">
          <i class="far fa-eye"></i> {{ work.viewsCount }}
        </div>
        <div class="stat-btn">
          <i class="far fa-comment"></i> {{ work.commentsCount }}
        </div>
        <button class="stat-btn">
          <i class="fas fa-share"></i> 分享
        </button>
      </div>
    </div>

    <!-- 评论区 -->
    <div class="comments-section">
      <h3 class="comments-title">
        <i class="far fa-comments"></i> 评论 ({{ comments.length }})
      </h3>

      <!-- 评论表单 -->
      <div class="comment-form">
        <textarea
            v-model="newComment"
            placeholder="写下你的评论..."
            rows="3"
            @keydown.enter.exact.prevent="submitComment"
        ></textarea>
        <button
            class="submit-comment-btn"
            @click="submitComment"
            :disabled="!newComment.trim()"
        >
          发表评论
        </button>
      </div>

      <!-- 评论列表 -->
      <div class="comments-list">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-header">
            <div class="comment-avatar">
              <img :src="comment.author.avatar" :alt="comment.author.name">
            </div>
            <div class="comment-meta">
              <div class="comment-author">{{ comment.author.name }}</div>
              <div class="comment-time">
                {{ formatDate(comment.createdAt) }}
              </div>
            </div>
          </div>
          <div class="comment-content">{{ comment.content }}</div>

          <!-- 评论操作 -->
          <div class="comment-actions">
            <button class="action-btn" @click="toggleLikeComment(comment.id)">
              <i class="far fa-heart"></i> {{ comment.likesCount }}
            </button>
            <button class="action-btn" @click="toggleReply(comment.id)">
              回复
            </button>
          </div>

          <!-- 回复表单 (当点击回复时显示) -->
          <div v-if="activeReply === comment.id" class="reply-form">
            <textarea
                v-model="replyContents[comment.id]"
                :placeholder="`回复 @${comment.author.name}`"
                rows="2"
            ></textarea>
            <div class="reply-actions">
              <button class="cancel-btn" @click="cancelReply">
                取消
              </button>
              <button
                  class="submit-btn"
                  @click="submitReply(comment.id)"
                  :disabled="!replyContents[comment.id]"
              >
                回复
              </button>
            </div>
          </div>

          <!-- 回复列表 -->
          <div v-if="comment.replies && comment.replies.length" class="replies-list">
            <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
              <div class="reply-header">
                <div class="reply-avatar">
                  <img :src="reply.author.avatar" :alt="reply.author.name">
                </div>
                <div class="reply-meta">
                  <div class="reply-author">{{ reply.author.name }}</div>
                  <span class="reply-to">回复</span>
                  <div class="original-author">@{{ comment.author.name }}</div>
                  <div class="reply-time">
                    {{ formatDate(reply.createdAt) }}
                  </div>
                </div>
              </div>
              <div class="reply-content">{{ reply.content }}</div>
              <div class="reply-actions">
                <button class="action-btn" @click="toggleLikeReply(comment.id, reply.id)">
                  <i class="far fa-heart"></i> {{ reply.likesCount }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import dayjs from 'dayjs'

export default {
  name: 'WorkDetail',
  data() {
    return {
      currentUser: {  // 本地用户数据
        id: 'current-user-123',
        name: '当前用户',
        avatar: 'https://example.com/current-user-avatar.jpg'
      },
      work: {
        id: '1',
        title: '落日余晖下的城市剪影',
        imageUrl: 'https://example.com/sunset-city.jpg',
        description: '## 创作背景\n\n这是我在上海外滩拍摄的日落时分...\n\n## 技术参数\n\n- 相机: Sony A7R4\n- 镜头: FE 24-70mm f/2.8 GM\n- 参数: ISO 100, f/8, 1/250s',
        category: 'landscape',
        tags: ['城市风光', '日落', '上海'],
        likesCount: 1245,
        viewsCount: 5678,
        commentsCount: 23,
        createdAt: '2023-05-15T14:30:00Z',
        author: {
          id: 'user1',
          name: '风光摄影师小李',
          avatar: 'https://example.com/avatar1.jpg'
        }
      },
      comments: [
        {
          id: 'c1',
          content: '这张照片的光影处理得太棒了！能分享一下后期思路吗？',
          likesCount: 12,
          createdAt: '2023-05-16T09:15:00Z',
          author: {
            id: 'user2',
            name: '摄影爱好者小王',
            avatar: 'https://example.com/avatar2.jpg'
          },
          replies: [
            {
              id: 'r1',
              content: '主要用了Lightroom的渐变滤镜调整天空部分',
              likesCount: 3,
              createdAt: '2023-05-16T10:30:00Z',
              author: {
                id: 'user1',
                name: '风光摄影师小李',
                avatar: 'https://example.com/avatar1.jpg'
              }
            }
          ]
        }
      ],
      newComment: '',
      activeReply: null,
      replyContents: {},
      isLiked: false,
      isFollowing: false
    }
  },
  computed: {
    compiledMarkdown() {
      return DOMPurify.sanitize(marked(this.work.description || ''))
    },
    isAuthor() {
      return this.currentUser.id === this.work.author.id
    },
    categoryName() {
      const categories = {
        portrait: '人像',
        landscape: '风光',
        animal: '动物',
        'still-life': '静物',
        street: '街拍',
        event: '活动'
      }
      return categories[this.work.category] || '其他'
    },
    categoryIcon() {
      const icons = {
        portrait: 'fas fa-user',
        landscape: 'fas fa-mountain',
        animal: 'fas fa-paw',
        'still-life': 'fas fa-apple-alt',
        street: 'fas fa-city',
        event: 'fas fa-calendar-alt'
      }
      return icons[this.work.category] || 'fas fa-camera'
    }
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    toggleLike() {
      this.isLiked = !this.isLiked
      if (this.isLiked) {
        this.work.likesCount++
      } else {
        this.work.likesCount--
      }
    },
    toggleFollow() {
      this.isFollowing = !this.isFollowing
    },
    submitComment() {
      if (!this.newComment.trim()) return

      const newComment = {
        id: `c${Date.now()}`,
        content: this.newComment,
        likesCount: 0,
        createdAt: new Date().toISOString(),
        author: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          avatar: this.currentUser.avatar
        },
        replies: []
      }

      this.comments.unshift(newComment)
      this.work.commentsCount++
      this.newComment = ''
    },
    toggleReply(commentId) {
      this.activeReply = this.activeReply === commentId ? null : commentId
      if (this.activeReply && !this.replyContents[commentId]) {
        this.$set(this.replyContents, commentId, '')
      }
    },
    cancelReply() {
      this.activeReply = null
    },
    submitReply(commentId) {
      const replyContent = this.replyContents[commentId]
      if (!replyContent) return

      const comment = this.comments.find(c => c.id === commentId)
      if (comment) {
        const newReply = {
          id: `r${Date.now()}`,
          content: replyContent,
          likesCount: 0,
          createdAt: new Date().toISOString(),
          author: {
            id: this.currentUser.id,
            name: this.currentUser.name,
            avatar: this.currentUser.avatar
          }
        }

        if (!comment.replies) {
          comment.replies = []
        }
        comment.replies.push(newReply)
        this.$delete(this.replyContents, commentId)
        this.activeReply = null
      }
    },
    toggleLikeComment(commentId) {
      const comment = this.comments.find(c => c.id === commentId)
      if (comment) {
        comment.likesCount += comment.isLiked ? -1 : 1
        comment.isLiked = !comment.isLiked
      }
    },
    toggleLikeReply(commentId, replyId) {
      const comment = this.comments.find(c => c.id === commentId)
      if (comment && comment.replies) {
        const reply = comment.replies.find(r => r.id === replyId)
        if (reply) {
          reply.likesCount += reply.isLiked ? -1 : 1
          reply.isLiked = !reply.isLiked
        }
      }
    }
  }
}
</script>

<style scoped>
/* 样式部分与之前完全相同，保持不变 */
.work-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.back-button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.back-button:hover {
  color: #ff7e33;
}

.work-content {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.author-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-meta {
  flex: 1;
}

.author-name {
  font-weight: 600;
  color: #333;
  text-decoration: none;
  display: block;
  margin-bottom: 4px;
}

.author-name:hover {
  color: #ff7e33;
}

.publish-time {
  font-size: 0.8rem;
  color: #999;
  display: flex;
  align-items: center;
  gap: 4px;
}

.follow-btn {
  padding: 6px 12px;
  border-radius: 16px;
  border: 1px solid #ff7e33;
  color: #ff7e33;
  background: white;
  cursor: pointer;
  font-size: 0.8rem;
}

.follow-btn:hover {
  background: #fff4e6;
}

.work-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
}

.work-image {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.work-image img {
  width: 100%;
  max-height: 600px;
  object-fit: contain;
}

.work-description {
  line-height: 1.8;
  margin-bottom: 20px;
}

.work-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.work-category {
  background: #fff4e6;
  color: #ff7e33;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tag {
  background: #f0f0f0;
  color: #666;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
}

.work-stats {
  display: flex;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.stat-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
}

.stat-btn.liked {
  color: #ff4d4f;
}

.stat-btn:hover {
  color: #ff7e33;
}

.comments-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.comments-title {
  font-size: 1.2rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.comment-form {
  margin-bottom: 30px;
}

.comment-form textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  min-height: 80px;
  margin-bottom: 10px;
}

.comment-form textarea:focus {
  outline: none;
  border-color: #ff7e33;
}

.submit-comment-btn {
  background: #ff7e33;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  float: right;
}

.submit-comment-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.comments-list {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.comment-item {
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;
}

.comment-header {
  display: flex;
  margin-bottom: 10px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
}

.comment-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comment-meta {
  flex: 1;
}

.comment-author {
  font-weight: 500;
  color: #333;
  text-decoration: none;
  display: block;
  margin-bottom: 2px;
}

.comment-author:hover {
  color: #ff7e33;
}

.comment-time {
  font-size: 0.8rem;
  color: #999;
}

.comment-content {
  margin-bottom: 10px;
  line-height: 1.6;
}

.comment-actions {
  display: flex;
  gap: 15px;
}

.action-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-btn:hover {
  color: #ff7e33;
}

.reply-form {
  margin: 10px 0 15px 52px;
}

.reply-form textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: vertical;
  min-height: 60px;
  margin-bottom: 8px;
}

.reply-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.reply-actions button {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.cancel-btn {
  background: #f5f5f5;
  border: 1px solid #ddd;
  color: #666;
}

.submit-btn {
  background: #ff7e33;
  color: white;
  border: none;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.replies-list {
  margin-left: 52px;
  margin-top: 15px;
}

.reply-item {
  padding: 12px 0;
  border-top: 1px dashed #eee;
}

.reply-header {
  display: flex;
  margin-bottom: 6px;
}

.reply-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.reply-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reply-meta {
  flex: 1;
  font-size: 0.9rem;
}

.reply-author {
  font-weight: 500;
  color: #333;
  text-decoration: none;
}

.reply-author:hover {
  color: #ff7e33;
}

.reply-to {
  color: #999;
  margin: 0 4px;
}

.original-author {
  color: #666;
  text-decoration: none;
}

.original-author:hover {
  color: #ff7e33;
  text-decoration: underline;
}

.reply-time {
  font-size: 0.8rem;
  color: #999;
  margin-top: 2px;
}

.reply-content {
  margin-left: 42px;
  line-height: 1.6;
  font-size: 0.9rem;
}

/* Markdown内容样式 */
.work-description >>> h1,
.work-description >>> h2,
.work-description >>> h3 {
  margin-top: 1.5em;
  margin-bottom: 0.8em;
}

.work-description >>> p {
  margin-bottom: 1em;
  line-height: 1.8;
}

.work-description >>> ul,
.work-description >>> ol {
  padding-left: 2em;
  margin-bottom: 1em;
}

.work-description >>> li {
  margin-bottom: 0.5em;
}

.work-description >>> code {
  background: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.work-description >>> pre {
  background: #f8f9fa;
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 1.5em;
}

.work-description >>> blockquote {
  border-left: 3px solid #ddd;
  padding-left: 1em;
  color: #666;
  margin-bottom: 1.5em;
}

.work-description >>> a {
  color: #ff7e33;
  text-decoration: none;
}

.work-description >>> a:hover {
  text-decoration: underline;
}

.work-description >>> img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 1em 0;
}
</style>