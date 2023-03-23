<template>
  <div class="item-music">
    <ItemMusicTop :play-list="songDetails.playlist"></ItemMusicTop>
    <ItemMusicBody
      :itemList="songDetails.itemList"
      :subscribedCount="songDetails.playlist.subscribedCount"
    ></ItemMusicBody>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { reqGetMusicListDetail, reqGetMusicTrack } from '@/api'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicBody from '@/components/item/ItemMusicBody.vue'

const route = useRoute()

const songDetails = reactive({
  playlist: {
    subscribedCount: 0
  },
  itemList: []
})
const getItemMusic = async () => {
  // 获取歌单详情页数据
  const { data: res } = await reqGetMusicListDetail(route.params.id as string)

  songDetails.playlist = res.playlist
}
const getMusicTrack = async () => {
  // 获取歌单所有歌曲
  const { data: res } = await reqGetMusicTrack(route.params.id as string)

  songDetails.itemList = res.songs
}
getItemMusic()
getMusicTrack()
</script>

<style lang="less" scoped>
.item-music {
  position: relative;
}
</style>
