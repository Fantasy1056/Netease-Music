<template>
  <div class="footer-music">
    <div class="footer-left" @click="showMusicDetailPage">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div class="info">
        <div class="name">{{ playList[playListIndex].name }}</div>
        <span class="slide_to_switch">横滑以切换歌曲</span>
      </div>
    </div>
    <div class="footer-right">
      <van-icon
        name="play-circle-o"
        style="margin-right: 0.2rem"
        @click="playMusic"
        v-if="musicState"
      />
      <van-icon
        name="pause-circle"
        style="margin-right: 0.2rem"
        v-else
        @click="playMusic"
      />
      <van-icon name="bars" @click="showPopupList" />
    </div>
    <audio ref="mediaPlay" :src="musicUrl" @canplay="addDuration"></audio>
    <MusicDetailPage
      :current-music="playList[playListIndex]"
      :playMusic="playMusic"
    ></MusicDetailPage>
    <PopMusicList :playList="playList"></PopMusicList>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  ref,
  watch,
  onUpdated,
  getCurrentInstance,
  onMounted
} from 'vue'
import { useStore } from '@/store/store'
import PopMusicList from './PopMusicList.vue'
import MusicDetailPage from './MusicDetailPage.vue'
const store = useStore()

const _this = getCurrentInstance()

const bus = _this?.appContext.config.globalProperties.$bus

const mediaPlay = ref()
// 获取当前播放的音乐渲染底部音乐栏内容
const playList = computed(() => store.playList)

const playListIndex = computed(() => store.playListIndex)
// 获取音乐播放的状态
const musicState = computed(() => store.musicState)
// 播放按钮点击事件
const playMusic = () => {
  if (mediaPlay.value.paused) {
    mediaPlay.value.play()
    store.musicState = false
    setcurrentMusicLyricPosition()
  } else {
    mediaPlay.value.pause()
    store.musicState = true
    clearInterval(musicLyricInterval) // 歌曲暂停清除定时器，停止发送歌词对应时间
  }
}
// 点击展示歌曲详情页面
const showMusicDetailPage = () => {
  store.musicDetailPage = true
}
// 播放开始不停向pinia发送当前歌词对应的时间
const musicLyricInterval = ref<any | null>(null)
const setcurrentMusicLyricPosition = () => {
  musicLyricInterval.value = setInterval(() => {
    if (mediaPlay.value) {
      store.currentMusicLyricPosition = mediaPlay.value.currentTime
    }
  }, 1000)
}
// 点击显示底部音乐栏 / 音乐详情，歌单
const showPopupList = () => {
  store.popupMusicList = true
}
// 在audio标签canplay事件触发后，向pinia发送歌曲的总时长的方法
const addDuration = () => {
  store.currentMusicTime = mediaPlay.value.duration
}
// 获取音乐的url地址
const musicUrl = computed(() => store.musicUrl)
// 监听歌单变化和歌单下标变化获取歌曲url以切换歌曲
watch([playList, playListIndex], () => {
  // audio标签自动播放切换后的歌曲
  mediaPlay.value.autoplay = true
  // 播放按钮先暂停再播放
  store.musicState = true
  store.musicState = false
  // 获取切换后的歌曲的url地址
  store.getMusicUrl(playList.value[playListIndex.value].id)
})
onMounted(() => {
  // 监听来自音乐详情页的拖动事件，重新赋值给audio组件
  bus.on('changePosition', (value: number) => {
    mediaPlay.value.currentTime = value
  })
})
onUpdated(() => {
  // 切换歌曲导致底部栏数据更新，从新查找歌词，发送歌词对应时间
  setcurrentMusicLyricPosition()
  store.getLyric(playList.value[playListIndex.value].id)
})
</script>

<style lang="less" scoped>
.footer-music {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  left: 0;
  padding: 0.2rem 0.2rem;
  width: 100%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  .footer-left {
    flex: 1;
    display: flex;
    align-items: center;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    .info {
      margin-left: 0.2rem;
      .name {
        font-size: 0.28rem;
        font-weight: 700;
      }
      .slide_to_switch {
        font-size: 0.24rem;
        color: #bbb;
      }
    }
  }
  .footer-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.6rem;
  }
}
</style>
