<script setup>
import HeaderPanel from './components/HeaderPanel.vue'
import NavigationListVue from './components/NavigationList.vue'
import MainContent from './components/MainContent.vue'

const styles = 'mx-auto start:w-full lg:w-2/3 xl:w-1/2 2xl:w-2/5 3xl:w-1/3'
</script>

<template>
      <header-panel :class="styles"/>
      <main-content :class="styles"/>
      <navigation-list-vue :class="styles"/>
</template>

<style></style>
