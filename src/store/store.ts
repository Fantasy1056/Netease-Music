import { defineStore } from 'pinia'
import pic from '@/assets/logo.png'
import { reqGetMusicUrl, reqGetLryicById } from '@/api'
interface Music {
  id: number
  al: {
    picUrl: string
  }
  name: string
  ar: []
}
export const useStore = defineStore('store', {
  state() {
    return {
      // 播放列表
      playList: <Music[]>[
        {
          al: {
            picUrl: pic
          },
          name: '发现好音乐',
          id: 1111,
          ar: []
        }
      ],
      // 当前播放得音乐下标
      playListIndex: 0,
      // 播放按钮状态
      musicState: true,
      // 音乐链接
      musicUrl: '',
      // 弹出音乐列表状态
      popupMusicList: false,
      // 当前播放音乐歌词位置
      currentMusicLyricPosition: 0,
      // 当前播放音乐歌词
      currentMusicLyric: '',
      // 当前播放音乐时长
      currentMusicTime: 0,
      // 音乐详情页状态
      musicDetailPage: false
    }
  },
  actions: {
    setPlayList(list: any) {
      this.playList = list
    },
    playListIndexChange(index?: number) {
      if (index === undefined) return (this.playListIndex = this.playList.length - 1)
      this.playListIndex = index
    },
    async getMusicUrl(id: number) {
      const { data: res } = await reqGetMusicUrl(id)
      this.musicUrl = res.data[0].url
    },
    async getLyric(id: number) {
      const { data: res } = await reqGetLryicById(id)
      if (res.lrc.lyric) {
        this.currentMusicLyric = res.lrc.lyric
      }
    },
    beforeSwitchMusic(num: number) {
      if (this.playListIndex + num < 0) {
        this.playListIndex = this.playList.length - 1
      } else if (this.playListIndex + num === this.playList.length) {
        this.playListIndex = 0
      } else {
        this.playListIndex += num
      }
    },
    setcurrentMusicLyricPosition() {
      this.currentMusicLyricPosition = 0
    },
    pushNewMusicToList(music: any) {
      this.playList.push(music)
    }

  }
})
