<template>
  <div class="page-header">
    <van-icon name="wap-nav" size="2em"></van-icon>
    <div class="tab_bar">
      <div class="tab_link">我的</div>
      <div class="tab_link active">发现</div>
      <div class="tab_link">云村</div>
      <div class="tab_link">视频</div>
    </div>
    <van-icon name="search" size="2em" @click="goToSearch" />
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'

const goToSearch = () => {
  router.push('/search')
}
</script>

<style lang="less" scoped>
.page-header {
  display: flex;
  align-items: center;
  height: 3em;
  .tab_bar {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .tab_link {
      font-size: 1.3em;
      color: #333;
      margin: 0 0.2rem;
    }
    .active {
      font-weight: 900;
    }
  }
}
</style>
