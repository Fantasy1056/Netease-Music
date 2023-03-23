<template>
  <div class="music-detail-page">
    <van-popup
      position="bottom"
      :style="{ height: '100%' }"
      v-model:show="show"
      teleport="#app"
    >
      <img :src="currentMusic.al.picUrl" alt="" class="backdrop" />
      <div class="popup-header">
        <div class="header-left">
          <van-icon
            name="arrow-left"
            class="back"
            @click="closePopup"
          ></van-icon>
          <div class="song-info">
            <div class="name">{{ currentMusic.name }}</div>
            <div class="singers">
              <span
                class="singer"
                v-for="name in currentMusic.ar"
                :key="name.id"
                >{{ name.name }} <van-icon name="arrow"></van-icon>
              </span>
            </div>
          </div>
        </div>
        <div class="header-right">
          <van-icon name="share-o" />
        </div>
      </div>

      <div
        class="popup-center-disk"
        v-show="diskOrLyric"
        @click="diskOrLyric = false"
      >
        <!-- 根据音乐得状态，添加动画动画得类名 -->
        <div
          class="disk"
          ref="disk"
          :class="!musicState ? 'disk-active' : 'disk-paused'"
        >
          <img :src="currentMusic.al.picUrl" alt="" class="disk-inside" />
        </div>
        <div
          class="needle"
          ref="needle"
          :class="!musicState ? 'needle-active' : ''"
        >
          <img :src="needleAb" alt="" />
        </div>
      </div>

      <div
        class="popup-center-lyric"
        v-show="!diskOrLyric"
        @click="diskOrLyric = true"
        ref="musicLyric"
      >
        <p
          v-for="(l, index) in lyric"
          :key="index"
          :class="{
            active:
              currentMusicLyricPosition * 1000 >= l.time &&
              currentMusicLyricPosition * 1000 <= l.next
          }"
        >
          {{ l.lrc }}
        </p>
      </div>

      <div class="popup-bottom">
        <div class="bottom-icons">
          <van-icon name="like-o"></van-icon>
          <van-icon
            name="upgrade"
            style="transform: rotateZ(180deg)"
          ></van-icon>
          <van-icon name="music-o" />
          <van-icon name="chat-o" @click="showComments(currentMusic.id)" />
          <van-icon name="smile-o" />
        </div>
        <div class="progress">
          <input
            type="range"
            name="range"
            id="range"
            min="0"
            :max="musicTime"
            ref="range"
            v-model="currentMusicLyricPosition"
            step="0.05"
            @change="changePosition"
          />
        </div>
        <div class="options">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-caozuo-xunhuan1"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="switchMusic(-1)">
            <use xlink:href="#icon-shangyishoushangyige"></use>
          </svg>
          <svg
            class="icon"
            aria-hidden="true"
            style="font-size: 1rem"
            @click="playMusic"
            v-if="musicState"
          >
            <use xlink:href="#icon-bofang1"></use>
          </svg>
          <svg
            class="icon"
            aria-hidden="true"
            style="font-size: 1rem"
            @click="playMusic"
            v-else
          >
            <use xlink:href="#icon-zanting"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="switchMusic(1)">
            <use xlink:href="#icon-xiayigexiayishou"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="showPopupList">
            <use xlink:href="#icon-24gl-playlistHeart"></use>
          </svg>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, getCurrentInstance } from 'vue'
import { useStore } from '@/store/store'
import needleAb from '@/assets/needle-ab.png'
import router from '@/router'
interface Lyric {
  lrc: string
  min: string
  msec: string
  sec: string
  next: number
  time: number
}
defineProps(['currentMusic', 'playMusic'])
const store = useStore()
const diskOrLyric = ref(true)
// 获取歌词区域dom对象
const musicLyric = ref()
const range = ref()
const show = computed(() => store.musicDetailPage)

const _this = getCurrentInstance()

const bus = _this?.appContext.config.globalProperties.$bus

const musicState = computed(() => store.musicState)

// 处理歌词数据，分割分秒毫秒，歌词
const lyric = computed(() => {
  let lyricArr: Lyric[] = []
  lyricArr = store.currentMusicLyric.split(/[{\r\n}\r\n]+/).map((item) => {
    const min = item.slice(1, 3)
    const sec = item.slice(4, 6)
    const msec = item.slice(7, item.indexOf(']'))
    const lrc = item.slice(item.indexOf(']') + 1, item.length)
    const time =
      parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(msec)
    const next = 0
    return { min, sec, msec, lrc, time, next }
  })
  // 给歌词属性添加下一句歌词的时间
  lyricArr.forEach((item, i) => {
    if (i === lyricArr.length - 1) {
      item.next = 0
    } else {
      item.next = lyricArr[i + 1].time
    }
  })
  return lyricArr
})
// 当前歌词的对应时间
const currentMusicLyricPosition = computed({
  get() {
    return store.currentMusicLyricPosition
  },
  set() {
    store.currentMusicLyricPosition = parseInt(range.value.value)
  }
})

const showPopupList = () => {
  store.popupMusicList = true
}
// 拖动进度条改变当前歌曲的播放时间
const changePosition = () => {
  // 向底部音乐栏发送拖动后的时间
  bus.emit('changePosition', parseInt(range.value.value))
}
// 歌曲总时长
const musicTime = computed(() => store.currentMusicTime)

const closePopup = () => {
  store.musicDetailPage = false
}
// 切换上一首/下一首音乐
const switchMusic = (num: number) => {
  store.beforeSwitchMusic(num)
}
// 前往评论页面
const showComments = (id: number) => {
  router.push('/comments/' + id)
  closePopup()
}

// 监听当前播放歌曲的歌词位置，自动滚动页面
watch(currentMusicLyricPosition, (newVal) => {
  const activeLyric = document.querySelector('.active') as HTMLElement
  // 判断activeLyric是否存在，存在再操作歌词界面的滚动，否则报错
  if (activeLyric) {
    if (activeLyric.offsetTop >= 300) {
      musicLyric.value.scrollTop = activeLyric.offsetTop - 300
    }
  }
  // 如果播放时间等于歌曲总时长，切换到下一首
  if (newVal === musicTime.value) {
    store.beforeSwitchMusic(1)
  }
})
</script>

<style lang="less" scoped>
.van-popup {
  display: flex;
  flex-direction: column;
  .van-popup__close-icon {
    ::before {
      color: #fff !important;
    }
  }

  .backdrop {
    position: absolute;
    z-index: -1;
    height: 100%;
    width: 100%;
    filter: blur(1.6rem);
  }
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1rem;
    padding: 0.2rem 0.3rem 0 0.2rem;
    .header-left {
      display: flex;
      align-items: center;
      overflow: hidden;
      .back {
        font-size: 0.5rem;
        color: #fff;
        margin-right: 0.2rem;
      }
      .vue3-marquee {
        width: 3rem;
      }
      .name {
        display: inline-block;
        color: #fff;
      }
      .singers {
        .singer {
          color: #9f9993;
          font-size: 0.24rem;
        }
      }
    }
    .header-right {
      font-size: 0.5rem;
      color: #fff;
      text-align: center;
    }
  }
  .popup-center-disk {
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 9rem;
    overflow: hidden;
    transition: all 1s linear;
    .disk {
      display: flex;
      height: 6rem;
      width: 6rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: url('@/assets/disk.png') no-repeat;
      background-size: 250px 250px;
      background-position: center;
      overflow: hidden;
      animation: discScroll 10s linear infinite;
      .disk-inside {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
      }
    }
    .disk-active {
      animation-play-state: running;
    }
    .disk-paused {
      animation-play-state: paused;
    }
    .needle {
      position: absolute;
      top: -0.2rem;
      left: 46%;
      transform-origin: 0 0;
      transform: rotateZ(-6deg);
      transition: all 2s;
      img {
        width: 2rem;
        height: 3rem;
      }
    }
    .needle-active {
      transform: rotateZ(8deg);
    }
  }
  .popup-center-lyric {
    display: flex;
    height: 100%;
    flex-direction: column;
    width: 100%;
    height: 9rem;
    overflow: scroll;
    transition: all 1s linear;
    padding-top: 0.2rem;
    scroll-behavior: smooth;
    p {
      color: #bbb;
      margin-bottom: 0.4rem;
      text-align: center;
      padding: 0rem 0.2rem;
      transition: all 0.5s linear;
    }
    .active {
      color: #fff;
      font-size: 0.4rem;
    }
  }
  .popup-bottom {
    flex: 1;
    width: 100%;
    .bottom-icons {
      display: flex;
      justify-content: space-around;
      color: #fff;
      font-size: 0.5rem;
    }
    .progress {
      margin-top: 0.5rem;
      padding: 0.2rem;
      #range {
        width: 100%;
        color: #ef2000;
      }
    }
    .options {
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #fff;
      width: 100%;
      font-size: 0.5rem;
      padding-top: 0.3rem;
      svg {
        color: #fff;
      }
    }
  }
  @keyframes discScroll {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }
}
</style>
