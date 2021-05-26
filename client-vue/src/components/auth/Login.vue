<template>
  <section class="container">
    <h1 class="large text-primary">Sign In</h1>
    <p class="lead"><i class="fas fa-user"></i> Sign into Your Account</p>
    <form class="form" @submit.prevent="onSubmit">
      <div class="form-group">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          required
          v-model="formData.email"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          v-model="formData.password"
        />
      </div>
      <input type="submit" class="btn btn-primary" value="Login" />
    </form>
    <p class="my-1">
      Don't have an account? <router-link to="/register">Sign Up</router-link>
    </p>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Login",

  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  },

  computed: {
    ...mapGetters("auth", ["isAuthenticated"])
  },

  methods: {
    ...mapActions("auth", ["login"]),
    ...mapActions(["showAlert"]),

    async onSubmit() {
      try {
        await this.login(this.formData);
        this.$router.push({ name: "Dashboard" });
      } catch (err) {
        this.showAlert({
          isShow: true,
          text: err.response.data.errors[0].msg,
          status: "danger"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
