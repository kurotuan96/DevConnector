<template>
  <div id="app">
    <Navbar />
    <router-view />
    <transition name="fade">
      <Alert v-if="alertState.isShow" />
    </transition>
    <vue-progress-bar />
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import Alert from '@/components/layout/Alert'
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  components: {
    Navbar,
    Alert
  },

  computed: {
    ...mapGetters(['alertState'])
  }
}
</script>

<style>
@import "./App.css";
</style>
