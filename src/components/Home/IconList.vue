<template>
  <div class="icon-container">
    <router-link to="">
      <van-icon name="like" size="1rem" color="#ef2000"></van-icon>
      <span class="icon-title">每日推荐</span>
    </router-link>
    <router-link to="">
      <van-icon name="audio" size="1rem" color="#4079fe"></van-icon>
      <span class="icon-title">私人FM</span>
    </router-link>
    <router-link to="">
      <van-icon name="music" size="1rem" color="#a06759"></van-icon>
      <span class="icon-title">歌单</span>
    </router-link>
    <router-link to="">
      <van-icon name="chart-trending-o" size="1rem" />
      <span class="icon-title">排行榜</span>
    </router-link>
  </div>
</template>

<script></script>

<style lang="less" scoped>
.icon-container {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0.2rem 0 0.2rem 0;
  .router-link-active {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: #000;
    width: 25%;
    .van-icon {
      height: 1rem;
    }
    .icon-title {
      margin-top: 0.2rem;
      font-weight: 400;
      font-size: 0.3rem;
    }
  }
}
</style>
