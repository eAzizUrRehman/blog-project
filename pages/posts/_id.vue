<template>
  <div
    class="container-9x gradient py-10 rounded-xl border-all dim-white-border relative"
  >
    <div
      class="p-1 rounded w-8 h-8 border-all dim-white-border hover:danger-gradient absolute top-4 right-4 flex-center cursor-pointer"
    >
      <img
        src="@/assets/images/cross-icon.svg"
        alt=""
        width="20"
        height="20"
        @click="$router.push('/')"
      />
    </div>
    <div class="container-8x" v-if="!showUpdatePost">
      <div class="flex">
        <Button
          text="Edit Post"
          :icon="require('@/assets/images/edit-icon.svg')"
          :isSuccess="true"
          @handleClick="openAddOrUpdateModal = true"
        />
        <Button
          text="Delete Post"
          :icon="require('@/assets/images/delete-icon.svg')"
          :isDanger="true"
          @handleClick="openDeleteModal = true"
        />
        <DeleteModal
          v-if="openDeleteModal"
          text="Are you sure you want to delete this post?"
          @handleDeleteConfirmed="deletePost(post.id)"
          @handleDeleteCancelled="openDeleteModal = false"
        />
      </div>
      <h1
        class="flex-center font-bold text-3xl my-10 p-2 gradient w-full border-all dim-white-border rounded-xl"
      >
        {{ post.title }}
      </h1>
      <p
        class="gradient rounded p-2 flex justify-center items-start border-all dim-white-border"
      >
        {{ post.content }}
      </p>
      <div
        class="gradient mt-10 px-20 py-10 rounded-lg border-all dim-white-border"
      >
        <p class="mb-4 font-semibold mx-auto w-fit text-lg">Comments</p>
        <AddComment :postId="this.post.id" />
        <div v-for="comment in post.comments" :key="comment.id">
          <div
            class="gradient rounded mt-4 px-4 flex justify-between items-center gap-2 border-all dim-white-border"
          >
            <div class="relative my-2">
              <p class="text-[8px]">
                <span> {{ showCommentDate(comment.date) }} </span>
                <span> {{ showCommentTime(comment.date) }} </span>
                <span> ({{ commentAge(comment.date) }}) </span>
              </p>
              <div>
                <p class="max-w-2 font-semibold">
                  {{ comment.text }}
                </p>
                <input
                  type="text"
                  v-if="editingCommentId === comment.id"
                  v-model="updatedCommentText"
                  :ref="`updateCommentInput-${comment.id}`"
                  @keyup.enter="saveComment(comment.id)"
                  class="gradient rounded border-all dim-white-border px-2 py-1 absolute top-0 left-0 w-full h-full"
                />
              </div>
            </div>
            <div class="flex-center gap-2 h-full">
              <Button
                v-if="editingCommentId !== comment.id"
                :icon="require('@/assets/images/edit-icon.svg')"
                :isSuccess="true"
                @handleClick="editComment(comment.id, comment.text)"
              />
              <Button
                v-else
                :icon="require('@/assets/images/update-icon.svg')"
                :isSuccess="true"
                @handleClick="saveComment(comment.id)"
              />
              <Button
                :icon="require('@/assets/images/delete-icon.svg')"
                :isDanger="true"
                @handleClick="deleteComment(comment.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddOrUpdateModal
      v-if="openAddOrUpdateModal"
      text="Edit Post"
      titlePlaceholder="Enter Post Updated Title..."
      contentPlaceholder="Enter Post Updated Content..."
      :updatingPostId="post.id"
      :update="true"
      :existingTitle="post.title"
      :existingContent="post.content"
      @handleAddOrUpdateCancelled="openAddOrUpdateModal = false"
      @postAdded="openAddOrUpdateModal = false"
      @postUpdated="openAddOrUpdateModal = false"
    />
  </div>
</template>
<script>
import Button from '@/components/Button.vue'
import AddComment from '@/components/AddComment.vue'
import AddOrUpdateModal from '@/components/AddOrUpdateModal.vue'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
export default {
  components: {
    Button,
    AddComment,
    AddOrUpdateModal,
  },
  name: 'Post',
  asyncData({ params }) {
    return { id: params.id }
  },
  data() {
    return {
      post: null,
      openDeleteModal: false,
      showUpdatePost: false,
      updatedCommentText: '',
      isInputDisabled: true,
      editingCommentId: null,
      openAddOrUpdateModal: false,
    }
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
  methods: {
    bringPostData() {
      this.post = this.$store.state.blog.posts.find(
        (post) => post.id === parseInt(this.id),
      )
    },
    deletePost() {
      this.$store.commit('deletePost', this.post.id)
      this.openDeleteModal = false
      this.$router.push('/')
    },
    showCommentDate(date) {
      const parsedDate = parseISO(date)
      return format(parsedDate, 'MMM dd, yyyy')
    },
    showCommentTime(date) {
      const parsedDate = parseISO(date)
      return format(parsedDate, 'hh:mm a')
    },
    commentAge(date) {
      const parsedDate = parseISO(date)
      return formatDistanceToNow(parsedDate, {
        addSuffix: true,
      })
    },
    editComment(commentId, commentText) {
      this.editingCommentId = commentId
      this.updatedCommentText = commentText
      this.$nextTick(() => {
        this.$refs[`updateCommentInput-${commentId}`][0].focus()
        this.$refs[`updateCommentInput-${commentId}`][0].select()
      })
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
    async saveComment(commentId) {
      if (!this.updatedCommentText.trim()) {
        this.$toast.error('Comment cannot be empty')
        return
      }
      const wasUpdated = await this.$store.dispatch('updateComment', {
        postId: this.post.id,
        commentId: commentId,
        updatedComment: {
          text: this.updatedCommentText,
          date: new Date().toISOString(),
        },
      })
      if (wasUpdated) {
        this.editingCommentId = null
      }
    },
  },
}
</script>
