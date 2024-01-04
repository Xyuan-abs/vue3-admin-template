<!-- 
  名称：用户中心
 -->
<script setup>
import avatarImage from '@/assets/avatar.gif'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

const handleCommand = (command) => {
  if (command === 'logout') {
    userStore.logout()
  }
}
</script>

<template>
  <div class="user-center">
    <el-dropdown placement="bottom" class="user" @command="handleCommand">
      <div class="user-box">
        <img class="avatar" :src="avatarImage" alt="" />
        <span class="el-dropdown-link"> {{ userStore.username }} </span>
        <el-icon class="arrow"><ArrowDown /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="user-dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.user-center {
  .user {
    :deep(.el-tooltip__trigger[aria-expanded='true']) {
      .arrow {
        transform: rotate(180deg);
      }
    }

    &-box {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      .arrow {
        transition: transform 0.2s ease-in-out;
        margin-left: 5px;
        font-size: 8rpx;
      }

      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius: 50%;
      }
    }
  }
}
</style>
