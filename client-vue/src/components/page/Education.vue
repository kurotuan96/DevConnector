<template>
  <section class="container">
    <h1 class="large text-primary">
      Add Your Education
    </h1>
    <p class="lead">
      <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
      you have attended
    </p>
    <small>* = required field</small>
    <form class="form" @submit.prevent="onSubmit">
      <div class="form-group">
        <input
          type="text"
          placeholder="* School or Bootcamp"
          name="school"
          v-model="formData.school"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          placeholder="* Degree or Certificate"
          name="degree"
          v-model="formData.degree"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          placeholder="Field Of Study"
          name="fieldofstudy"
          v-model="formData.fieldOfStudy"
        />
      </div>
      <div class="form-group">
        <h4>From Date</h4>
        <input type="date" name="from" v-model="formData.from" />
      </div>
      <div class="form-group">
        <p>
          <input
            type="checkbox"
            name="current"
            value=""
            v-model="formData.current"
          />
          Current School or Bootcamp
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
          placeholder="Program Description"
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
  name: "Education",

  data() {
    return {
      formData: {
        school: "",
        degree: "",
        fieldOfStudy: "",
        from: "",
        current: false,
        to: ""
      }
    };
  },

  methods: {
    ...mapActions("profile", ["addEdu"]),
    ...mapActions(["showAlert"]),

    async onSubmit() {
      try {
        let body = {
          school: this.formData.school,
          degree: this.formData.degree,
          fieldOfStudy: this.formData.fieldOfStudy,
          from: this.formData.from,
          current: this.formData.current
        };
        if (!this.formData.current) {
          body = {
            ...body,
            to: this.formData.to
          };
        }
        await this.addEdu(body);
        this.showAlert({
          isShow: true,
          status: "success",
          data: [{ msg: "Successfully add education" }]
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
