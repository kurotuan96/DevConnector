<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/layout/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  },

  created() {
    console.log(process.env.API_ENDPOINT);
  }
};
</script>

<style>
@import "./App.css";
</style>
