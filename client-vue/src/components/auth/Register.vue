<template>
  <section class="container">
    <h1 class="large text-primary">Sign Up</h1>
    <p class="lead"><i class="fas fa-user"></i> Create Your Account</p>
    <form class="form" @submit.prevent="onSubmit">
      <div class="form-group">
        <input
          type="text"
          placeholder="Name"
          name="name"
          v-model="formData.name"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          v-model="formData.email"
        />
        <small class="form-text">
          This site uses Gravatar so if you want a profile image, use a Gravatar
          email
        </small>
      </div>
      <div class="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          minLength="6"
          v-model="formData.password"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          placeholder="Confirm Password"
          name="passwordConfirm"
          minLength="6"
          v-model="formData.passwordConfirm"
        />
      </div>
      <input type="submit" class="btn btn-primary" value="Register" />
    </form>
    <p class="my-1">
      Already have an account? <router-link to="/login">Sign In</router-link>
    </p>
  </section>
</template>

<script>
import { AuthService } from "@/api";
import { mapActions } from "vuex";

export default {
  name: "Register",

  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
      }
    };
  },

  methods: {
    ...mapActions(["showAlert"]),

    async onSubmit() {
      if (
        this.formData.password &&
        this.formData.password === this.formData.passwordConfirm
      ) {
        try {
          const body = {
            name: this.formData.name,
            email: this.formData.email,
            password: this.formData.password
          };
          await AuthService.registUser(body);

          this.showAlert({
            isShow: true,
            text: "Your registration has been successfully completed",
            status: "success"
          });
        } catch (err) {
          this.showAlert({
            isShow: true,
            text: err.response.data.errors[0].msg,
            status: "danger"
          });
        }
      } else {
        console.log("Password not match");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
