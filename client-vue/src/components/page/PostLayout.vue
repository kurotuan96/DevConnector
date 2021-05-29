<template>
  <section class="container">
    <template v-if="$route.name === 'Posts'">
      <h1 class="large text-primary">
        Posts
      </h1>
      <p class="lead">
        <i class="fas fa-user" /> Welcome to the community!
      </p>
    </template>

    <template v-else>
      <router-link
        to="/posts"
        class="btn"
      >
        Back To Posts
      </router-link>
      <div class="post bg-white p-1 my-1">
        <div>
          <router-link :to="`/profiles/${post.user}`">
            <img
              class="round-img"
              :src="post.avatar"
              alt="avatar"
            >
            <h4 v-text="post.name" />
          </router-link>
        </div>
        <div>
          <p
            class="my-1"
            v-text="post.text"
          />
        </div>
      </div>
    </template>

    <div class="post-form">
      <div class="bg-primary p">
        <h3 v-text="$route.name === 'Posts' ? 'Say Something...' : 'Leave A Comment'" />
      </div>
      <form
        class="form my-1"
        @submit.prevent="onSubmit"
      >
        <textarea
          v-model="content.text"
          name="text"
          cols="30"
          rows="5"
          :placeholder="$route.name === 'Posts' ? 'Create a post' : 'Comment on this post'"
          required
        />
        <input
          type="submit"
          class="btn btn-dark my-1"
          value="Submit"
        >
      </form>
    </div>

    <div
      v-if="$route.name === 'Posts'"
      class="posts"
    >
      <div
        v-for="post in posts"
        :key="post._id"
        class="post bg-white p-1 my-1"
      >
        <div>
          <router-link :to="`profiles/${post.user}`">
            <img
              class="round-img"
              :src="post.avatar"
              alt="avatar"
            >
            <h4 v-text="post.name" />
          </router-link>
        </div>
        <div>
          <p
            class="my-1"
            v-text="post.text"
          />

          <p
            class="post-date"
            v-text="`Posted on ${moment(post.date).format('DD/MM/YYYY')}`"
          />
          <button
            type="button"
            class="btn btn-light"
            @click="onLike(post._id)"
          >
            <i class="fas fa-thumbs-up" />
            <span v-text="post.likes.length" />
          </button>
          <button
            type="button"
            class="btn btn-light"
            @click="onDislike(post._id)"
          >
            <i class="fas fa-thumbs-down" />
          </button>
          <router-link
            :to="`posts/${post._id}`"
            class="btn btn-primary"
          >
            Discussion <span
              class="comment-count"
              v-text="post.comments.length"
            />
          </router-link>
          <button
            v-if="post.user === currentUserId"
            type="button"
            class="btn btn-danger"
            @click="onDeletePost(post._id)"
          >
            <i class="fas fa-times" />
          </button>
        </div>
      </div>
    </div>

    <div
      v-else
      class="comments"
    >
      <div
        v-for="comment in post.comments"
        :key="comment._id"
        class="post bg-white p-1 my-1"
      >
        <div>
          <router-link :to="`/profiles/${comment.user}`">
            <img
              class="round-img"
              :src="comment.avatar"
              alt="avatar"
            >
            <h4 v-text="comment.name" />
          </router-link>
        </div>
        <div>
          <p
            class="my-1"
            v-text="comment.text"
          />
          <p
            class="post-date"
            v-text="`Posted on ${moment(comment.date).format('DD/MM/YYYY')}`"
          />

          <button
            v-if="comment.user === currentUserId"
            type="button"
            class="btn btn-danger"
            @click="onDeleteComment(comment._id)"
          >
            <i class="fas fa-times" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from '@/store'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'PostLayout',

  async beforeRouteEnter (to, from, next) {
    try {
      if (to.name === 'Posts') {
        await store.dispatch('post/getPosts')
      } else {
        await store.dispatch('post/getPost', to.params.postId)
      }
    } catch (e) {
      await store.dispatch('showAlert', {
        isShow: true,
        status: 'danger',
        data: e.response.data.errors
      })
    }
    next()
  },

  computed: {
    ...mapGetters('post', ['post', 'posts']),
    ...mapGetters('auth', ['currentUserId'])
  },

  data () {
    return {
      content: {
        text: ''
      }
    }
  },

  created () {
    this.content.text = ''
  },

  methods: {
    ...mapActions('post', ['addPost', 'addComment', 'deletePost', 'deleteComment', 'getPosts', 'getPost', 'likePost', 'dislikePost', 'deleteComment']),
    ...mapActions(['showAlert']),

    async onSubmit () {
      try {
        if (this.$route.name === 'Posts') {
          await this.addPost(this.content)
          await this.showAlert({
            isShow: true,
            status: 'success',
            data: [{msg: 'Successfully add a post'}]
          })
          await this.getPosts()
        } else {
          await this.addComment({
            postId: this.$route.params.postId,
            body: this.content
          })
          await this.showAlert({
            isShow: true,
            status: 'success',
            data: [{msg: 'Successfully add a comment'}]
          })
          await this.getPost(this.$route.params.postId)
        }
        this.content.text = ''
      } catch (e) {
        this.showAlert({
          isShow: true,
          status: 'danger',
          data: e.response.data.errors
        })
      }
    },

    async onLike (postId) {
      try {
        await this.likePost(postId)
        await this.getPosts()
      } catch (e) {
        await this.showAlert({
          isShow: true,
          status: 'danger',
          data: [e.response.data]
        })
      }
    },

    async onDislike (postId) {
      try {
        await this.dislikePost(postId)
        await this.getPosts()
      } catch (e) {
        await this.showAlert({
          isShow: true,
          status: 'danger',
          data: [e.response.data]
        })
      }
    },

    async onDeletePost (postId) {
      try {
        await this.deletePost(postId)
        await this.getPosts()
      } catch (e) {
        await this.showAlert({
          isShow: true,
          status: 'danger',
          data: e.response.data.errors
        })
      }
    },

    async onDeleteComment (commentId) {
      try {
        await this.deleteComment({
          postId: this.$route.params.postId,
          commentId
        })
        await this.getPost(this.$route.params.postId)
      } catch (e) {
        await this.showAlert({
          isShow: true,
          status: 'danger',
          data: e.response.data.errors
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
