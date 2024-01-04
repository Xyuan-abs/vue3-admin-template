<!-- 
  名称：AppMain主要视图
  版本：1.0.0 
  作者：Xyuan
  时间：2021年10月22日15:55:20
 -->
<script setup></script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style lang="scss" scoped></style>
