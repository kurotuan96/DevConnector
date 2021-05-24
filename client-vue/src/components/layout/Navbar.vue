<template>
  <nav class="navbar bg-dark">
    <h1>
      <router-link to="/">
        <i class="fas fa-code"></i> DevConnector
      </router-link>
    </h1>

    <ul>
      <li>
        <router-link to="/">Developers</router-link>
      </li>
      <li>
        <router-link to="/register">Register</router-link>
      </li>
      <li>
        <router-link to="/Login">Login</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style lang="scss" scoped>
</style>