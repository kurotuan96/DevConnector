<template>
  <section class="container">
    <h1 class="large text-primary">
      Dashboard
    </h1>
    <template v-if="Object.keys(profile).length">
      <p class="lead">
        <i class="fas fa-user"></i> Welcome {{ profile.user.name }}
      </p>
      <div class="dash-buttons">
        <router-link to="/profile/create" class="btn btn-light"
          ><i class="fas fa-user-circle text-primary"></i> Edit
          Profile</router-link
        >
        <router-link to="/profile/experience" class="btn btn-light"
          ><i class="fab fa-black-tie text-primary"></i> Add
          Experience</router-link
        >
        <router-link to="/profile/education" class="btn btn-light"
          ><i class="fas fa-graduation-cap text-primary"></i> Add
          Education</router-link
        >
      </div>

      <h2 class="my-2">Experience Credentials</h2>
      <table v-if="profile.experience.length" class="table">
        <thead>
          <tr>
            <th>Company</th>
            <th class="hide-sm">Title</th>
            <th class="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exp in profile.experience" :key="exp._id">
            <td>{{ exp.company }}</td>
            <td>{{ exp.title }}</td>
            <td>{{ exp.from }} - {{ exp.current ? "now" : exp.to }}</td>
            <td>
              <button class="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>No Experience</p>

      <h2 class="my-2">Education Credentials</h2>
      <table v-if="profile.education.length" class="table">
        <thead>
          <tr>
            <th>School</th>
            <th class="hide-sm">Degree</th>
            <th class="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="edu in profile.education" :key="edu._id">
            <td>{{ edu.school }}</td>
            <td>{{ edu.degree }}</td>
            <td>{{ edu.from }} - {{ edu.current ? "now" : edu.to }}</td>
            <td>
              <button class="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>No Education</p>

      <div class="my-2">
        <button class="btn btn-danger">
          <i class="fas fa-user-minus"></i>

          Delete My Account
        </button>
      </div>
    </template>
    <template v-else>
      <div class="dash-buttons">
        <router-link to="/profile/create" class="btn btn-light"
          ><i class="fas fa-user-circle text-primary"></i> Create Profile
        </router-link>
      </div>
    </template>
  </section>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",

  computed: {
    ...mapGetters("profile", ["profile"])
  },

  async beforeRouteEnter(to, from, next) {
    try {
      await store.dispatch("profile/getCurrentProfile");
    } catch (err) {
      store.dispatch("showAlert", {
        isShow: true,
        data: [err.response.data],
        status: "danger"
      });
    }
    next();
  }
};
</script>

<style lang="scss" scoped></style>
