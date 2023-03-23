<template>
  <div class="search-container">
    <div class="search-header">
      <van-icon name="arrow-left" @click="goToHome"></van-icon>
      <input
        type="text"
        placeholder="发现好音乐"
        v-model="keyWord"
        @keyup.enter="searchMusic"
      />
    </div>
    <div class="search-history">
      <span>历史</span>
      <div class="history-items">
        <span
          class="item"
          v-for="(item, index) in historyWords"
          :key="index"
          @click="getSearchRes(item)"
          >{{ item }}</span
        >
      </div>
      <van-icon name="delete-o" size=".5rem" @click="clearKeywords" />
    </div>
    <div class="search-result">
      <div class="result-header">
        <van-icon name="play-circle-o" size="0.5rem" />
        <span class="playAll"
          >播放全部<span class="total"> (共{{ musicData.count }}首)</span></span
        >
      </div>
      <!-- 给通用的播放列表组件传入歌单和切换歌曲的函数 -->
      <MusicList
        :playList="musicData.songs"
        :changeMusic="changeMusic"
        :paddingBottom="true"
      ></MusicList>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { ref, reactive } from 'vue'
import { reqSearchMusic } from '@/api/index'
import MusicList from '@/components/item/MusicList.vue'
import { useStore } from '@/store/store'
const keyWord = ref('')
const musicData = reactive({
  count: 0,
  songs: []
})
// 本地存储有数据则取数据，没有取空数组
const historyWords = ref(
  JSON.parse(localStorage.getItem('historyWords') as string) || []
)
const store = useStore()

const goToHome = () => {
  router.push('/home')
}
// 搜索关键字，储存在本地方法
const searchMusic = async () => {
  if (keyWord.value === '') return false

  if (filter(historyWords, keyWord.value)) {
    if (historyWords.value.length === 8) {
      historyWords.value.pop()
    }
    historyWords.value.unshift(keyWord.value)
    localStorage.setItem('historyWords', JSON.stringify(historyWords))
    getSearchRes()
    keyWord.value = ''
  } else {
    getSearchRes()
    keyWord.value = ''
  }
}
// 如果形参有值则代表点击了历史记录搜索
const getSearchRes = async (item?: string) => {
  if (item) {
    const {
      data: { result: res }
    } = await reqSearchMusic(item)
    musicData.count = res.songCount
    musicData.songs = res.songs
  } else {
    const {
      data: { result: res }
    } = await reqSearchMusic(keyWord.value)

    musicData.count = res.songCount
    musicData.songs = res.songs
  }
}
// 查询数组是否存在相同关键字方法
const filter = (arr: string[], str: string) => {
  if (arr.indexOf(str) !== -1) {
    return false
  }
  return true
}
// 清除搜索历史
const clearKeywords = () => {
  historyWords.value.length = 0
  localStorage.removeItem('historyWords')
}
// 点击切换歌曲，将当前歌曲添加到当前歌单，index设置为歌单长度减一，播放新添加的歌曲
const changeMusic = (index: number) => {
  store.pushNewMusicToList(musicData.songs[index])
  store.playListIndexChange()
  store.setcurrentMusicLyricPosition()
}
</script>

<style lang="less" scoped>
.search-container {
  padding: 0 0.2rem;
  overflow: hidden;

  .search-header {
    display: flex;
    font-size: 0.6rem;
    height: 1rem;
    justify-content: space-between;
    align-items: center;
    .van-icon {
      line-height: 1rem;
      color: #bbb;
    }
    input {
      border: none;
      outline: none;
      border-bottom: 2px solid #bbb;
      width: 85%;
      font-size: 0.36rem;
      color: #000;
      height: 0.6rem;
    }
  }
  .search-history {
    display: flex;
    justify-content: space-between;
    margin-top: 0.2rem;
    span {
      font-weight: 900;
      font-size: 0.36rem;
    }
    .history-items {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      padding: 0 0.2rem;
      .item {
        border-radius: 0.4rem;
        font-size: 0.28rem;
        font-weight: normal;
        padding: 0.1rem 0.2rem;
        margin-right: 0.2rem;
        margin-bottom: 0.1rem;
        background-color: #bbb;
        color: #fff;
      }
    }
  }
  .search-result {
    width: 100%;
    overflow: hidden;
    margin-top: 0.3rem;
    .result-header {
      display: flex;
      align-items: center;
      height: 1rem;
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
    .result-list {
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
}
</style>
