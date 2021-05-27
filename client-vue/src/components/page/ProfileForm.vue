<template>
  <section class="container">
    <h1 class="large text-primary">
      {{ $route.name === 'ProfileCreate' ? 'Create Your Profile' : 'Edit Your Profile' }}
    </h1>
    <p class="lead">
      <i class="fas fa-user" /> Let's get some information to make your
      profile stand out
    </p>
    <small>* = required field</small>
    <form
      class="form"
      @submit.prevent="onSubmit"
    >
      <div class="form-group">
        <select
          v-model="formData.status"
          name="status"
          required
        >
          <option value="">
            * Select Professional Status
          </option>
          <option value="Developer">
            Developer
          </option>
          <option value="Junior Developer">
            Junior Developer
          </option>
          <option value="Senior Developer">
            Senior Developer
          </option>
          <option value="Manager">
            Manager
          </option>
          <option value="Student or Learning">
            Student or Learning
          </option>
          <option value="Instructor">
            Instructor or Teacher
          </option>
          <option value="Intern">
            Intern
          </option>
          <option value="Other">
            Other
          </option>
        </select>
        <small
          class="form-text"
        >Give us an idea of where you are at in your career</small>
      </div>
      <div class="form-group">
        <input
          v-model="formData.company"
          type="text"
          placeholder="Company"
          name="company"
        >
        <small
          class="form-text"
        >Could be your own company or one you work for</small>
      </div>
      <div class="form-group">
        <input
          v-model="formData.website"
          type="text"
          placeholder="Website"
          name="website"
        >
        <small class="form-text">Could be your own or a company website</small>
      </div>
      <div class="form-group">
        <input
          v-model="formData.location"
          type="text"
          placeholder="Location"
          name="location"
        >
        <small class="form-text">City & state suggested (eg. Boston, MA)</small>
      </div>
      <div class="form-group">
        <input
          v-model="formData.skills"
          type="text"
          placeholder="* Skills"
          name="skills"
          required
        >
        <small
          class="form-text"
        >Please use comma separated values (eg.
          HTML,CSS,JavaScript,PHP)</small>
      </div>
      <div class="form-group">
        <input
          v-model="formData.githubUsername"
          type="text"
          placeholder="Github Username"
          name="githubusername"
        >
        <small
          class="form-text"
        >If you want your latest repos and a Github link, include your
          username</small>
      </div>
      <div class="form-group">
        <textarea
          v-model="formData.bio"
          placeholder="A short bio of yourself"
          name="bio"
        />
        <small class="form-text">Tell us a little about yourself</small>
      </div>

      <div class="my-2">
        <button
          type="button"
          class="btn btn-light"
          @click="onAddSocial"
        >
          Add Social Network Links
        </button>
        <span>Optional</span>
      </div>

      <div v-show="showSocial">
        <div class="form-group social-input">
          <i class="fab fa-twitter fa-2x" />
          <input
            v-model="formData.twitter"
            type="text"
            placeholder="Twitter URL"
            name="twitter"
          >
        </div>

        <div class="form-group social-input">
          <i class="fab fa-facebook fa-2x" />
          <input
            v-model="formData.facebook"
            type="text"
            placeholder="Facebook URL"
            name="facebook"
          >
        </div>

        <div class="form-group social-input">
          <i class="fab fa-youtube fa-2x" />
          <input
            v-model="formData.youtube"
            type="text"
            placeholder="YouTube URL"
            name="youtube"
          >
        </div>

        <div class="form-group social-input">
          <i class="fab fa-linkedin fa-2x" />
          <input
            v-model="formData.linkedin"
            type="text"
            placeholder="Linkedin URL"
            name="linkedin"
          >
        </div>

        <div class="form-group social-input">
          <i class="fab fa-instagram fa-2x" />
          <input
            v-model="formData.instagram"
            type="text"
            placeholder="Instagram URL"
            name="instagram"
          >
        </div>
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
import store from '@/store'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'ProfileForm',

  async beforeRouteEnter (to, from, next) {
    try {
      if (to.name === 'ProfileEdit') {
        await store.dispatch('profile/getCurrentProfile')
      }
    } catch (e) {
      await store.dispatch('showAlert', {
        isShow: true,
        status: 'danger',
        data: e.response.data.error
      })
    }
    next()
  },

  computed: {
    ...mapGetters('profile', ['profile'])
  },

  data () {
    return {
      formData: {
        status: '',
        company: '',
        website: '',
        location: '',
        skills: '',
        githubUsername: '',
        bio: '',
        twitter: '',
        facebook: '',
        youtube: '',
        linkedin: '',
        instagram: ''
      },
      showSocial: false
    }
  },

  created () {
    if (this.$route.name === 'ProfileEdit') {
      this.formData.status = this.profile.status ? this.profile.status : ''
      this.formData.company = this.profile.company ? this.profile.company : ''
      this.formData.website = this.profile.website ? this.profile.website : ''
      this.formData.location = this.profile.location ? this.profile.location : ''
      this.formData.skills = this.profile.skills ? this.profile.skills.join() : ''
      this.formData.githubUsername = this.profile.githubUsername ? this.profile.githubUsername : ''
      this.formData.bio = this.profile.bio ? this.profile.bio : ''
      this.formData.twitter = this.profile.social.twitter ? this.profile.social.twitter : ''
      this.formData.facebook = this.profile.social.facebook ? this.profile.social.facebook : ''
      this.formData.youtube = this.profile.social.youtube ? this.profile.social.youtube : ''
      this.formData.linkedin = this.profile.social.linkedin ? this.profile.social.linkedin : ''
      this.formData.instagram = this.profile.social.instagram ? this.profile.social.instagram : ''
    }

    if (this.profile.social) {
      this.showSocial = true
    }
  },

  methods: {
    ...mapActions('profile', ['addProfile', 'getCurrentProfile']),
    ...mapActions(['showAlert']),

    onAddSocial () {
      this.showSocial = !this.showSocial
    },

    async onSubmit () {
      try {
        await this.addProfile(this.formData)
        this.showAlert({
          status: 'success',
          data: [{msg: this.$route.name === 'ProfileCreate' ? 'Successfully create profile' : 'Successfully update profile'}],
          isShow: true
        })
      } catch (err) {
        this.showAlert({
          status: 'danger',
          data: err.response.data.error || [{ msg: err.response.statusText }],
          isShow: true
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
