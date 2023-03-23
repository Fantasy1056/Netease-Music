<template>
  <div class="item-music-top">
    <img :src="playList.coverImgUrl" alt="" class="background" />
    <div class="mask">
      <div class="item-music-top-header">
        <div class="left">
          <van-icon name="arrow-left" @click="goBack"></van-icon>
          <span>歌单</span>
        </div>
        <div class="right">
          <van-icon name="search" class="search"></van-icon>
          <van-icon name="wap-nav"></van-icon>
        </div>
      </div>
      <div class="item-music-top-center">
        <div class="center-left">
          <img :src="playList.coverImgUrl" alt="" />
        </div>
        <div class="center-right">
          <p class="title">{{ playList.name }}</p>
          <div class="user">
            <img
              :src="playList.creator.avatarUrl"
              alt=""
              class="avatar"
              v-if="playList.creator"
            />
            <router-link to="" class="userLink" v-if="playList.creator"
              >{{ playList.creator.nickname }} <van-icon name="arrow"></van-icon
            ></router-link>
          </div>
          <p class="signature van-multi-ellipsis--l2" v-if="playList.creator">
            {{ playList.description }}
          </p>
        </div>
      </div>
      <div class="item-music-top-bottom">
        <router-link to="" class="button"
          ><van-icon name="chat-o" size="0.5rem"></van-icon>
          <span>{{ playList.commentCount }}</span>
        </router-link>
        <router-link to="" class="button"
          ><van-icon name="share" size="0.5rem"></van-icon>
          <span>{{ playList.shareCount }}</span></router-link
        >
        <router-link to="" class="button"
          ><van-icon name="down" size="0.5rem"></van-icon>
          <span>下载</span>
        </router-link>
        <router-link to="" class="button"
          ><van-icon name="certificate" size="0.5rem"></van-icon>
          <span>多选</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
defineProps(['playList'])

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<style lang="less" scoped>
.item-music-top {
  width: 100%;
  height: 6rem;
  overflow: hidden;
  position: relative;
  .background {
    width: 100%;
    height: 100%;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(31, 33, 41, 0.4);
    backdrop-filter: blur(15px);
    padding: 0rem 0.2rem;
    .item-music-top-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;

      .left {
        display: flex;
        align-items: center;
        font-size: 0.5rem;
        line-height: 1rem;
        color: #fff;
        span {
          margin-left: 0.2rem;
          font-size: 0.4rem;
        }
      }
      .right {
        font-size: 0.5rem;
        line-height: 1rem;
        color: #fff;
        .search {
          margin-right: 0.4rem;
        }
      }
    }
    .item-music-top-center {
      display: flex;
      align-items: center;
      width: 100%;
      height: 3rem;
      .center-left {
        img {
          width: 2.8rem;
          height: 2.8rem;
          border-radius: 0.2rem;
        }
      }
      .center-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        padding: 0.1rem 0 0.2rem 0.4rem;
        .title {
          color: #fff;
          font-size: 0.3rem;
          font-weight: 700;
        }
        .user {
          display: flex;
          align-items: center;
          .avatar {
            height: 0.6rem;
            width: 0.6rem;
            border-radius: 50%;
          }
          .userLink {
            margin-left: 0.2rem;
            color: #bbb;
          }
        }
        .signature {
          height: 0.6rem;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: 0.24rem;
          color: #bbb;
        }
      }
    }
    .item-music-top-bottom {
      display: flex;
      margin-top: 0.2rem;
      width: 100%;
      height: 1rem;
      .button {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 25%;
        height: 100%;
        color: #fff;
        font-size: 0.3rem;
        span {
          margin-top: 0.1rem;
        }
      }
    }
  }
}
</style>
