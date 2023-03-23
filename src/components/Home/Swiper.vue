<template>
  <div class="swiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="img in bannerList" :key="img.targetId">
        <img :src="img.pic" alt="" class="banner-item" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts" setup>
import { reqGetBannerList } from '@/api'
import { ref } from 'vue'

const bannerList = ref([])

const getBannerList = async () => {
  const { data: res } = await reqGetBannerList()

  bannerList.value = res.banners
}
getBannerList()
</script>

<style lang="less" scoped>
.van-swipe {
  width: 100%;
  padding-top: 0.2rem;
  overflow: hidden;
  .van-swipe__track {
    overflow: hidden;
    .van-swipe-item {
      overflow: hidden;
      .banner-item {
        height: 3rem;
        border-radius: 0.2rem;
      }
    }
  }
  /deep/ .van-swipe__indicators {
    bottom: 0.4rem;
    /deep/ .van-swipe__indicator--active {
      background-color: #ef2000 !important;
    }
  }
}
</style>
