<template>
  <div class="music-list" :class="paddingBottom ? 'paddingBottom' : ''">
    <!-- 循环itemList 渲染歌曲名，歌手-->
    <div class="item" v-for="(item, index) in playList" :key="index">
      <div class="item-left" @click="changeMusic(index)">
        <span class="index">{{ index + 1 }}</span>
        <div class="song">
          <span class="name">{{ item.name }}</span>
          <!-- 遍历歌手数组，渲染歌手 -->
          <div class="singers">
            <span class="singer" v-for="name in item.ar" :key="name.id"
              >{{ name.name }} &nbsp;
            </span>
          </div>
        </div>
      </div>
      <div class="item-right">
        <!-- 如果item.mv不为空，则展示mv播放按钮 -->
        <van-icon name="play-circle-o" class="mv" v-if="item.mv"></van-icon>
        <van-icon name="wap-nav"></van-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps(['playList', 'paddingBottom', 'changeMusic'])
</script>

<style lang="less" scoped>
.music-list {
  width: 100%;
  padding: 0 0.2rem;
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
.paddingBottom {
  padding-bottom: 1.2rem;
}
</style>
