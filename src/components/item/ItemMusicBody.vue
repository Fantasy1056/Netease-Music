<template>
  <div class="item-music-body">
    <div class="item-header">
      <div class="item-header-left">
        <van-icon name="play-circle-o" size="0.5rem" />
        <span class="playAll"
          >播放全部<span class="total"> (共{{ itemList.length }}首)</span></span
        >
      </div>
      <div class="item-header-right">
        <van-icon name="plus" />
        收藏 ({{ subsCount }})
      </div>
    </div>
    <!-- 给通用的播放列表组件传入歌单-->
    <MusicList
      :playList="itemList"
      :paddingBottom="true"
      :changeMusic="changeMusic"
    ></MusicList>
  </div>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import MusicList from './MusicList.vue'
import { useStore } from '@/store/store'
const store = useStore()
const props = defineProps(['itemList', 'subscribedCount'])
// 返回收藏数量得简写形式
const subsCount = computed(() => {
  if (props.subscribedCount >= 10000) {
    return (props.subscribedCount / 10000).toFixed(0) + 'w+'
  } else {
    return props.subscribedCount
  }
})
// 点击切换歌曲后，将pinia播放列表修改为当前列表，播放的索引修改为当前所有，索引对应的歌曲id获取歌曲链接
const changeMusic = (index: number) => {
  store.setPlayList(props.itemList)
  store.playListIndexChange(index)
  store.getMusicUrl(props.itemList[index].id)
  store.setcurrentMusicLyricPosition()
}
</script>

<style lang="less" scoped>
.item-music-body {
  width: 100%;
  background-color: #fff;
  transform: translateY(-0.3rem);
  height: 10rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  padding: 0 0.2rem;
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1rem;
    .item-header-left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .playAll {
        font-size: 0.3rem;
        font-weight: 700;
        margin-left: 0.4rem;
        .total {
          font-size: 0.24rem;
          color: #ccc;
        }
      }
    }
    .item-header-right {
      padding: 0.3em 0.2rem;
      height: 0.7rem;
      background-color: #ef2000;
      border-radius: 0.4rem;
      color: #fff;
      text-align: center;
      line-height: 0.5rem;
      font-size: 0.28rem;
    }
  }
  .item-body {
    width: 100%;
    padding-bottom: 1.2rem;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 1.5rem;
      padding: 0.2rem 0rem;
      .item-left {
        flex: 1;
        display: flex;
        align-items: center;
        .index {
          font-size: 0.3rem;
        }
        .song {
          display: flex;
          flex-direction: column;
          margin-left: 0.4rem;
          .name {
            font-weight: 600;
            margin-bottom: 0.1rem;
          }
          .singers {
            .singer {
              color: #bbb;
              font-size: 0.24rem;
            }
          }
        }
      }
      .item-right {
        display: flex;
        justify-content: flex-end;
        width: 1.2rem;
        font-size: 0.5rem;
        color: #bbb;
        .mv {
          margin-right: 0.2rem;
        }
      }
    }
  }
}
</style>
