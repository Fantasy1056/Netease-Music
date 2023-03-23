import { $http } from './axios'

const reqGetBannerList = () => $http.get('banner', { params: { type: 2 } })

const reqGetGoodMusicList = () => $http.get('personalized', { params: { limit: 10 } })

const reqGetMusicListDetail = (id: string) => $http.get('playlist/detail', {
  params: { id }
})

const reqGetMusicTrack = (id: string) => $http.get('playlist/track/all', {
  params: { id, limit: 10 }
})

const reqGetMusicUrl = (id: number) => $http.get('song/url?id=' + id)

const reqGetLryicById = (id: number) => $http.get('lyric?id=' + id)

const reqGetCommentsById = (id: number) => $http.get('/comment/music/?id=' + id)

const reqSearchMusic = (keyword: string) => $http.get('cloudsearch?keywords=' + keyword)

export {
  reqGetBannerList,
  reqGetGoodMusicList,
  reqGetMusicListDetail,
  reqGetMusicTrack,
  reqGetMusicUrl,
  reqGetLryicById,
  reqGetCommentsById,
  reqSearchMusic
}
