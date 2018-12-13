<template>
  <div id="tabbar">
    <ul v-if="navList.length>0">
      <li v-for="(item,index) in objIndex==1?navListOne:navList" :key='index' @click="selectNavItem(index,item.pagePath)">
        <div :class="{active:item.active}"><img :src="activeIndex == index?item.selectedIconPath:item.iconPath" alt="" class="active"></div>
        <div>{{item.text}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['activeIndex', 'objIndex'],
  data() {
    return {
      navList: [
        {
          pagePath: '/pages/pages_one/index/main',
          iconPath:
            'http://img.mseenet.com/iOS_CutDiagram/tab/tab_school_nor@3x.png',
          selectedIconPath:
            'http://img.mseenet.com/iOS_CutDiagram/tab/tab_school_sel@3x.png',
          text: '校园'
        },
        {
          pagePath: '/pages/business/index/main',
          iconPath:
            'http://test.admin.school.mseenet.com/html/img/iOS切图/tab_activity_nor@3x.png',
          selectedIconPath:
            'http://test.admin.school.mseenet.com/html/img/iOS切图/tab_activity_sel@3x.png',
          text: '活动'
        },

        {
          pagePath: '/pages/pages_one/my/main',
          iconPath:
            'http://img.mseenet.com/iOS_CutDiagram/tab/tab_me_nor@3x.png',
          selectedIconPath:
            'http://img.mseenet.com/iOS_CutDiagram/tab/tab_me_sel@3x.png',
          text: '我的'
        }
      ],
      navListOne: [
        {
          pagePath: '/pages/pages_two/index/main',
          iconPath:
            'http://img.mseenet.com/iOS_CutDiagram/tab/tab_school_nor@3x.png',
          selectedIconPath:
            'http://img.mseenet.com/iOS_CutDiagram/tab/tab_school_sel@3x.png',
          text: '校园'
        },

        {
          pagePath: '/pages/pages_two/issue/main',
          iconPath:
            'http://img.mseenet.com/iOS_CutDiagram/tab/tab_issue_nor@2x.png',
          selectedIconPath:
            'http://img.mseenet.com/iOS_CutDiagram/tab/tab_issue_nor@2x.png',
          text: '发布',
          active: true
        },

        {
          pagePath: '/pages/pages_two/my/main',
          iconPath:
            'http://img.mseenet.com/iOS_CutDiagram/tab/tab_me_nor@3x.png',
          selectedIconPath:
            'http://img.mseenet.com/iOS_CutDiagram/tab/tab_me_sel@3x.png',
          text: '我的'
        }
      ]
    }
  },
  mounted() {
    wx.hideTabBar()
    
  },
  methods: {
    /**
     * 点击导航栏
     * @param index
     */
    selectNavItem(index, pagePath) {
      wx.redirectTo({ url: pagePath })
    }
  }
}
</script>

<style lang="scss" scoped>
#tabbar {
  width: 100%;
  height: 95rpx;
  background: #fafafa;
  position: fixed;
  bottom: 0;
  ul {
    padding: 0;
    padding-top: 10rpx;
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    li {
      font-size: 22rpx;
      text-align: center;
      flex: 1;
      .active {
        height: 44rpx;
        position: relative;
        // border: 1px solid red;
        > img {
          top: -50rpx;
          left: 80rpx;
          width: 92rpx;
          height: 92rpx;
          position: absolute;
        }

        // top: 0;
        // border: 1px solid red;
      }
    }
  }
  img {
    width: 48rpx;
    height: 44rpx;
  }
}
</style>
