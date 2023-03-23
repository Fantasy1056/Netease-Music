<template>
  <div class="home-page">
    <Header></Header>
    <Swiper></Swiper>
    <IconList></IconList>
    <FindGoodMusic></FindGoodMusic>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Home/Header.vue'
import Swiper from '@/components/Home/Swiper.vue'
import IconList from '@/components/Home/IconList.vue'
import FindGoodMusic from '@/components/Home/FindGoodMusic.vue'
</script>

<style lang="less" scoped>
.home-page {
  padding: 0 0.2667rem;
}
</style>
