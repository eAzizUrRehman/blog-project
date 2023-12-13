<template>
  <div class="container gradient rounded-xl py-10 px-20">
    <div
      v-show="showUpdatePost"
      class="gradient rounded-3xl container dim-white-border px-4 py-10"
    >
      <PostDataCollector
        headerText="Update Post"
        titlePlaceholder="Enter Post Updated Title..."
        contentPlaceholder="Enter Post Updated Content..."
        :updatedPostId="post.id"
        :update="true"
        @postUpdated="showUpdatePost = false"
      />
    </div>

    <button
      @click.prevent="showUpdatePost = true"
      class="gradient w-fit mx-auto px-4 py-2 rounded dim-white-border"
    >
      Update Post
    </button>
    <button
      @click.prevent="deletePost"
      class="gradient w-fit mx-auto px-4 py-2 rounded dim-white-border"
    >
      Delete Post
    </button>

    <h1 class="text-center font-bold text-3xl mb-10">{{ post.title }}</h1>
    <p class="mb-10">
      {{ post.content }}
    </p>

    <div class="gradient p-10">
      <p class="mb-4 font-semibold">Comments</p>
      <AddComment :postId="this.post.id" />
      <div v-for="comment in post.comments" :key="comment.id">
        <div
          class="gradient px-4 py-0.5 flex justify-between items-center rounded mb-4"
        >
          <p v-if="editingCommentId !== comment.id" class="inline relative">
            {{ comment.text }}
          </p>

          <input
            v-else
            v-model.lazy="updatedCommentText"
            type="text"
            class="gradient h-10 rounded dim-white-border px-4 absolute focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
          />

          <button
            @click.prevent="editComment(comment.id, comment.text)"
            class="gradient w-fit mx-auto px-2 py-1 text-xs rounded dim-white-border"
          >
            Edit
          </button>
          <button
            v-if="editingCommentId === comment.id"
            @click.prevent="saveComment(comment.id)"
            class="gradient w-fit mx-auto px-2 py-1 text-xs rounded dim-white-border"
          >
            Save
          </button>
          <button
            @click.prevent="deleteComment(comment.id)"
            class="gradient w-fit mx-auto px-2 py-1 text-xs rounded dim-white-border"
          >
            delete
          </button>

          <span class="text-[10px] max-w-fit">
            <span class="block"> {{ showCommentDate(comment.date) }} </span>
            <span class="block"> {{ showCommentTime(comment.date) }} </span>
            <span class="block"> ({{ commentAge(comment.date) }}) </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { format, formatDistanceToNow } from 'date-fns'
import AddComment from '@/components/AddComment.vue'

export default {
  asyncData({ params }) {
    return { id: params.id }
  },
  data() {
    return {
      post: null,
      showUpdatePost: false,
      updatedCommentText: '',
      isInputDisabled: true,
      editingCommentId: null,
    }
  },
  methods: {
    bringPostData() {
      this.post = this.$store.state.blog.posts.find(
        (post) => post.id === parseInt(this.id),
      )
    },
    deletePost() {
      this.$store.commit('deletePost', this.post.id)
      this.$router.push('/')
    },
    showCommentDate(date) {
      return format(new Date(date), 'MMM dd, yyyy')
    },
    showCommentTime(date) {
      return format(new Date(date), 'hh:mm a')
    },
    commentAge(date) {
      return formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    },
    editComment(commentId, commentText) {
      this.editingCommentId = commentId
      this.updatedCommentText = commentText
    },
    deleteComment(commentId) {
      this.$store.commit('deleteComment', {
        postId: this.post.id,
        commentId: commentId,
        updatedCommentText: this.updatedCommentText,
      })
    },
    displayText() {
      return this.comment.text ? this.comment.text : this.comment.initialText
    },
    getCommentText(comment) {
      return this.editingCommentId === comment.id
        ? this.updatedCommentText
        : comment.text
    },

    saveComment(commentId) {
      this.$store.commit('editComment', {
        postId: this.post.id,
        commentId: commentId,
        updatedComment: {
          text: this.updatedCommentText,
          date: new Date(),
        },
      })
      this.editingCommentId = null
    },
  },

  watch: {
    post: {
      handler(newPost, oldPost) {
        if (newPost !== oldPost) {
          this.bringPostData()
        }
        this.bringPostData()
      },
      immediate: true,
      deep: true,
    },
  },
  components: { AddComment },
}
</script>
