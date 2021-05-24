<template>
  <div class="container">
    <div class="alert alert-danger">Invalid credentials</div>
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
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    onSubmit() {
      console.log(this.formData);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>