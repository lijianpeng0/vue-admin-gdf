<template>
  <el-container class="home-container">
    <el-header>
      <span class="title" style="margin-left:20px">仓库后台管理系统</span>
      <el-button type="primary" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside>
        <!-- 侧边栏区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened
          :default-active="activeSubMenu" :collapse-transition="true" @select="toggleActive" router>
          <!-- 一级标题 -->
          <el-menu-item :index="item.id + ''" v-for="(item, i) in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconMenuList[i]"></i>
              <span>{{ item.title }}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
const ACTIVE_PATH = 'activePath'
export default {
  data () {
    return {
      name: 'home',
      // 菜单列表
      menuList: [
        { title: '仓库管理', id: 'whManage' },
        { title: '入库时间管理', id: 'whEntryTimeManage' },
        { title: '入库管理', id: 'whEntryManage' }
      ],
      // 当前激活项子菜单
      activeSubMenu: 'whManage',
      // 一级菜单图标列表
      iconMenuList: [
        'el-icon-s-home',
        'el-icon-time',
        'el-icon-s-order'
      ]
    }
  },
  created () {
    console.log(this.$router)
    this.activeSubMenu = window.sessionStorage.getItem(ACTIVE_PATH) || 'whManage'
  },
  methods: {
    // 退出
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleActive (index) {
      this.activeSubMenu = index
      window.sessionStorage.setItem(ACTIVE_PATH, index)
    }
  }
}
</script>

<style lang='less' scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 0;
  background-color: #fff;
  color: #333;
  border-bottom: 1px solid #ccc;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.3);
  position: relative;

  &::after {
    content: "";
    position: absolute;
  }

  .title {
    display: flex;
    align-items: center;
    font-size: 22px;

  }
}

.el-aside {
  font-size: 18px;
  margin-top: 20px;
  width: 200px !important;

  .el-menu {
    border-right: none;
    padding: 0px 10px;
    background-color: #fff !important;

    /deep/ .el-menu-item {
      background-color: #fff !important;
      color: #333 !important;

      &.is-active {
        color: #fff !important;
        background-color: #0052d9 !important;
        border-radius: 10px;
        overflow: hidden;
      }
    }

    .iconfont {
      margin-right: 10px;
    }
  }

  .toggle-btn {
    height: 30px;
    width: 100%;
    text-align: center;
    letter-spacing: 0.2em;
    line-height: 27px;
    background-color: #4a5064;
    color: #fff;
    cursor: pointer;
  }
}

.el-main {
  background-color: #eaedf1;
}

.home-container {
  height: 100%;
}
</style>
