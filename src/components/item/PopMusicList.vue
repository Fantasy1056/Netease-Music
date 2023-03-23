<template>
  <div class="popup-music-list">
    <van-popup
      position="bottom"
      :style="{ height: '50%' }"
      v-model:show="show"
      teleport="#app"
      round
    >
      <!-- 给通用的播放列表组件传入歌单 -->
      <MusicList :playList="playList" :changeMusic="changeMusic"></MusicList>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import MusicList from './MusicList.vue'
import { computed } from '@vue/reactivity'
import { useStore } from '@/store/store'
// 获取当前播放列表
const props = defineProps(['playList'])
const store = useStore()

// 弹出层属性
const show = computed({
  get() {
    return store.popupMusicList
  },
  set() {
    store.popupMusicList = false
  }
})
// 点击切换歌曲后，将pinia播放列表修改为当前列表，播放的索引修改为当前所有，索引对应的歌曲id获取歌曲链接
const changeMusic = (index: number) => {
  store.setPlayList(props.playList)
  store.playListIndexChange(index)
  store.getMusicUrl(props.playList[index].id)
  store.setcurrentMusicLyricPosition()
}
</script>

<style lang="less" scoped></style>
