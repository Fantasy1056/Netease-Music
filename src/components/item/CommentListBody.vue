<template>
  <div class="body-items">
    <div class="item" v-for="item in commentList" :key="item.commentId">
      <div class="item-header">
        <div class="header-left">
          <img :src="item.user.avatarUrl" alt="" class="avatar" />
          <div class="username-time">
            <span class="name">{{ item.user.nickname }}</span>
            <span class="time">{{ item.timeStr }}</span>
          </div>
        </div>
        <div class="header-right">
          {{ item.likedCount }}
          <van-icon name="good-job-o" />
        </div>
      </div>
      <div class="item-context">{{ item.content }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps(['commentList'])
</script>

<style lang="less" scoped>
.body-items {
  width: 100%;
  overflow: hidden;
  overflow: scroll;
  .item {
    width: 100%;
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 0.8rem;
      .header-left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        .avatar {
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
        }
        .username-time {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          margin-left: 0.2rem;
          .name {
            font-size: 0.24rem;
            font-weight: 700;
            color: #6a6a6a;
            margin-bottom: 0.1rem;
          }
          .time {
            font-size: 0.2rem;
            color: #bbb;
            font-weight: 700;
          }
        }
      }
      .header-right {
        font-size: 0.26rem;
        color: #bbb;
        font-weight: 700;
      }
    }
    .item-context {
      font-size: 0.28rem;
      font-weight: 700;
      margin-left: 0.9rem;
      padding: 0rem 0rem 0.3rem 0rem;
      color: #333;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
