<template>
  <nav class="navbar bg-dark">
    <h1>
      <router-link :to="isAuthenticated ? '/dashboard' : '/'">
        <i class="fas fa-code" /> DevConnector
      </router-link>
    </h1>

    <ul>
      <template v-if="!isAuthenticated">
        <li>
          <router-link to="/register">
            Register
          </router-link>
        </li>
        <li>
          <router-link to="/Login">
            Login
          </router-link>
        </li>
      </template>
      <template v-else>
        <li>
          <router-link to="/profiles">
            Developers
          </router-link>
        </li>
        <li>
          <router-link to="/posts">
            Posts
          </router-link>
        </li>
        <li>
          |
          <router-link to="/dashboard">
            <i class="fas fa-user" />
            <span class="hide-sm">Dashboard</span>
          </router-link>
        </li>
        <li>
          <button @click="onLogout">
            <i class="fas fa-sign-out-alt" />
            <span class="hide-sm">Logout</span>
          </button>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Navbar',

  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },

  methods: {
    ...mapMutations('auth', ['setLogout']),
    ...mapMutations('profile', ['setProfile']),

    onLogout () {
      this.setLogout()
      this.setProfile({})
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss" scoped></style>
