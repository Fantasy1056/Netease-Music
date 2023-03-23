<template>
  <div class="music-list">
    <div class="music-top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="music-bottom">
      <van-swipe :loop="false" :width="130" :show-indicators="false">
        <van-swipe-item v-for="m in musicList" :key="m.id">
          <router-link :to="'/itemmusic/' + m.id" class="router-link-active">
            <img :src="m.picUrl" alt="" />
            <span>{{ m.name }}</span>
            <span class="playNum"
              ><van-icon name="play" />{{ m.playCount }}</span
            >
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { reqGetGoodMusicList } from '@/api'

interface MusicList {
  alg: string
  canDislike: boolean
  copywriter: string
  highQuality: boolean
  id: number
  name: string
  picUrl: string
  playCount: string | number
  trackCount: number
  trackNumberUpdateTime: number
  type: number
}

const musicList = ref<MusicList[]>([])

const getGoodMusicList = async () => {
  // 获取发现好歌单数据
  const { data: res } = await reqGetGoodMusicList()

  res.result.forEach((item: MusicList) => {
    item.playCount = playNums(item.playCount as number)
  })
  musicList.value = res.result
}
getGoodMusicList()
// 修饰当前歌单播放的数量
const playNums = (value: number) => {
  return (value / 100000).toFixed(1) + '万'
}
</script>

<style lang="less" scoped>
.music-list {
  width: 100%;
  height: 5rem;
  padding: 0.2rem 0;
  .music-top {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.8em;
    }
  }
  .music-bottom {
    width: 100%;
    height: 4rem;
    .van-swipe {
      width: 100%;
      height: 100%;
      .van-swipe__track {
        display: flex;
        justify-content: space-between;
        .van-swipe-item {
          position: relative;
          padding-right: 0.2rem;
          .router-link-active {
            img {
              width: 120px;
              height: 120px;
              border-radius: 0.2rem;
            }
            span {
              color: #000;
              word-break: break-all;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .playNum {
              position: absolute;
              right: 0.3rem;
              top: 0.04rem;
              color: #fff;
              font-size: 0.24rem;
            }
          }
        }
      }
    }
  }
}
</style>
