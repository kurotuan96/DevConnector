<template>
  <section class="container">
    <h1
      class="large text-primary"
      v-text="
        $route.name === 'Experience'
          ? 'Add and Experience'
          : 'Add Your Education'
      "
    />

    <p class="lead">
      <i
        class="fas"
        :class="{
          'fa-code-branch': $route.name === 'Experience',
          'fa-graduation-cap': $route.name === 'Education'
        }"
      />
      {{
        $route.name === "Experience"
          ? "Add any developer/programming positions that you have had in the past"
          : "Add any school, bootcamp, etc that you have attended"
      }}
    </p>
    <small>* = required field</small>
    <form
      class="form"
      @submit.prevent="onSubmit"
    >
      <template v-if="$route.name === 'Experience'">
        <div class="form-group">
          <input
            v-model="formData.title"
            type="text"
            placeholder="* Job Title"
            name="title"
            required
          >
        </div>
        <div class="form-group">
          <input
            v-model="formData.company"
            type="text"
            placeholder="* Company"
            name="company"
            required
          >
        </div>
        <div class="form-group">
          <input
            v-model="formData.location"
            type="text"
            placeholder="Location"
            name="location"
          >
        </div>
      </template>
      <template v-else>
        <div class="form-group">
          <input
            v-model="formData.school"
            type="text"
            placeholder="* School or Bootcamp"
            required
          >
        </div>
        <div class="form-group">
          <input
            v-model="formData.degree"
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
          >
        </div>
        <div class="form-group">
          <input
            v-model="formData.fieldOfStudy"
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
          >
        </div>
      </template>
      <div class="form-group">
        <h4>From Date</h4>
        <input
          v-model="formData.from"
          type="date"
          name="from"
        >
      </div>
      <div class="form-group">
        <p>
          <input
            v-model="formData.current"
            type="checkbox"
            name="current"
          >
          {{ $route.name === 'Experience' ? 'Current Job' : 'Current School or Bootcamp' }}
        </p>
      </div>
      <div
        v-show="!formData.current"
        class="form-group"
      >
        <h4>To Date</h4>
        <input
          v-model="formData.to"
          type="date"
          name="to"
        >
      </div>
      <div class="form-group">
        <textarea
          v-model="formData.description"
          name="description"
          cols="30"
          rows="5"
          placeholder="Job Description"
        />
      </div>
      <input
        type="submit"
        class="btn btn-primary my-1"
      >
      <router-link
        class="btn btn-light my-1"
        to="/dashboard"
      >
        Go Back
      </router-link>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SubProfileForm',

  data () {
    return {
      formData: {
        title: '',
        company: '',
        location: '',
        school: '',
        degree: '',
        fieldOfStudy: '',
        from: '',
        current: false,
        to: ''
      }
    }
  },

  methods: {
    ...mapActions('profile', ['addExp', 'addEdu']),
    ...mapActions(['showAlert']),

    async onSubmit () {
      try {
        let body = {
          from: this.formData.from,
          current: this.formData.current
        }
        if (!this.formData.current) {
          body = {
            ...body,
            to: this.formData.to
          }
        }
        if (this.$route.name === 'Experience') {
          body = {
            ...body,
            title: this.formData.title,
            company: this.formData.company,
            location: this.formData.location
          }
          await this.addExp(body)
          this.showAlert({
            isShow: true,
            status: 'success',
            data: [{ msg: 'Successfully add experience' }]
          })
        } else {
          body = {
            ...body,
            school: this.formData.school,
            degree: this.formData.degree,
            fieldOfStudy: this.formData.fieldOfStudy
          }
          await this.addEdu(body)
          this.showAlert({
            isShow: true,
            status: 'success',
            data: [{ msg: 'Successfully add education' }]
          })
        }
      } catch (err) {
        this.showAlert({
          isShow: true,
          status: 'danger',
          data: err.response.data.error
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
