<template>
  <nav class="navbar bg-dark">
    <h1>
      <router-link :to="isAuthenticated ? '/dashboard' : '/'">
        <i class="fas fa-code"></i> DevConnector
      </router-link>
    </h1>

    <ul>
      <template v-if="!isAuthenticated">
        <li>
          <router-link to="/register">Register</router-link>
        </li>
        <li>
          <router-link to="/Login">Login</router-link>
        </li>
      </template>
      <template v-else>
        <li>
          <router-link to="/profiles">Developers</router-link>
        </li>
        <li><router-link to="/post">Posts</router-link></li>
        <li>
          |
          <router-link to="/dashboard">
            <i class="fas fa-user"></i>
            <span class="hide-sm">Dashboard</span>
          </router-link>
        </li>
        <li>
          <button @click="onLogout">
            <i class="fas fa-sign-out-alt"></i>
            <span class="hide-sm">Logout</span>
          </button>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Navbar",

  computed: {
    ...mapGetters("auth", ["isAuthenticated"])
  },

  methods: {
    ...mapMutations("auth", ["setLogout"]),

    onLogout() {
      this.setLogout();
      this.$router.push({ name: "Landing" });
    }
  }
};
</script>

<style lang="scss" scoped></style>
