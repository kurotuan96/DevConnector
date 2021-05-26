<template>
  <section class="container">
    <h1 class="large text-primary">
      Add An Experience
    </h1>
    <p class="lead">
      <i class="fas fa-code-branch"></i> Add any developer/programming positions
      that you have had in the past
    </p>
    <small>* = required field</small>
    <form class="form" @submit.prevent="onSubmit">
      <div class="form-group">
        <input
          type="text"
          placeholder="* Job Title"
          name="title"
          v-model="formData.title"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          placeholder="* Company"
          name="company"
          v-model="formData.company"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          placeholder="Location"
          name="location"
          v-model="formData.location"
        />
      </div>
      <div class="form-group">
        <h4>From Date</h4>
        <input type="date" name="from" v-model="formData.from" />
      </div>
      <div class="form-group">
        <p>
          <input type="checkbox" name="current" v-model="formData.current" />
          Current Job
        </p>
      </div>
      <div v-show="!formData.current" class="form-group">
        <h4>To Date</h4>
        <input type="date" name="to" v-model="formData.to" />
      </div>
      <div class="form-group">
        <textarea
          name="description"
          cols="30"
          rows="5"
          placeholder="Job Description"
          v-model="formData.description"
        ></textarea>
      </div>
      <input type="submit" class="btn btn-primary my-1" />
      <router-link class="btn btn-light my-1" to="/dashboard"
        >Go Back</router-link
      >
    </form>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Experience",

  data() {
    return {
      formData: {
        title: "",
        company: "",
        location: "",
        from: "",
        current: false,
        to: ""
      }
    };
  },

  methods: {
    ...mapActions("profile", ["addExp"]),
    ...mapActions(["showAlert"]),

    async onSubmit() {
      try {
        let body = {
          title: this.formData.title,
          company: this.formData.company,
          location: this.formData.location,
          from: this.formData.from,
          current: this.formData.current
        };
        if (!this.formData.current) {
          body = {
            ...body,
            to: this.formData.to
          };
        }
        await this.addExp(body);
        this.showAlert({
          isShow: true,
          status: "success",
          data: [{ msg: "Successfully add experience" }]
        });
      } catch (err) {
        this.showAlert({
          isShow: true,
          status: "danger",
          data: err.response.data.console.error
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
