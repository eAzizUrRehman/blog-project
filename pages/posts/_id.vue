<template>
  <div>
    <div
      class="container-9x gradient border-all dim-white-border relative rounded-xl py-10 shadow-xl"
    >
      <Button
        :icon="require('@/assets/images/cross-icon.svg')"
        :isDanger="true"
        @handleClick="$router.push('/')"
        class="absolute right-4 top-4"
      />
      <div class="container-8x" v-if="!showUpdatePost">
        <div class="flex">
          <Button
            :text="$t('posts.edit_post')"
            :icon="require('@/assets/images/edit-icon.svg')"
            :isSuccess="true"
            @handleClick="openAddOrUpdateModal = true"
          />
          <Button
            :text="$t('posts.delete_post')"
            :icon="require('@/assets/images/delete-icon.svg')"
            :isDanger="true"
            @handleClick="openDeleteModal = true"
          />
        </div>
        <h1
          class="gradient border-all dim-white-border my-10 w-full overflow-auto break-words rounded-xl p-2 text-3xl font-bold shadow-lg"
        >
          {{ post.title }}
        </h1>
        <p
          class="gradient border-all dim-white-border overflow-auto break-words rounded p-2 shadow-lg"
        >
          {{ post.content }}
        </p>
        <div
          class="gradient border-all dim-white-border mt-10 rounded-lg px-10 py-5 shadow-lg"
        >
          <p class="mx-auto mb-4 w-fit text-lg font-semibold">
            {{ $t('posts.comments') }}
          </p>
          <AddComment :postId="this.post.id" />
          <div v-for="comment in post.comments" :key="comment.id">
            <div
              class="gradient border-all dim-white-border mt-4 flex w-full items-center justify-between gap-2 rounded px-2 py-1 shadow-lg"
            >
              <div class="relative my-2" v-if="editingCommentId !== comment.id">
                <p class="text-[8px]">
                  <span> {{ showCommentDate(comment.date) }} </span>
                  <span> {{ showCommentTime(comment.date) }} </span>
                  <span> ({{ commentAge(comment.date) }}) </span>
                </p>
                <div>
                  <p class="max-w-2 overflow-auto break-words font-semibold">
                    {{ comment.text }}
                  </p>
                </div>
              </div>
              <input
                v-else
                type="text"
                v-model="updatedCommentText"
                :ref="`updateCommentInput-${comment.id}`"
                @keyup.enter="saveComment(comment.id)"
                class="gradient border-all dim-white-border z-50 rounded px-2 py-1 shadow-lg outline-none focus:border-white focus:border-opacity-50"
              />
              <div class="flex-center h-full gap-2">
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
                  class="z-50"
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
    </div>
    <AddOrUpdateModal
      v-if="openAddOrUpdateModal"
      :text="$t('posts.edit_post')"
      :titlePlaceholder="$t('placeholders.updated_title')"
      :contentPlaceholder="$t('placeholders.updated_content')"
      :updatingPostId="post.id"
      :update="true"
      :existingTitle="post.title"
      :existingContent="post.content"
      @handleAddOrUpdateCancelled="openAddOrUpdateModal = false"
      @postAdded="openAddOrUpdateModal = false"
      @postUpdated="openAddOrUpdateModal = false"
    />
    <DeleteModal
      v-if="openDeleteModal"
      :text="$t('posts.confirm_delete_post')"
      @handleDeleteConfirmed="deletePost(post.id)"
      @handleDeleteCancelled="openDeleteModal = false"
      class="fixed inset-0 flex items-center justify-center"
    />
  </div>
</template>
<script>
import Button from '@/components/Button.vue'
import AddComment from '@/components/AddComment.vue'
import AddOrUpdateModal from '@/components/AddOrUpdateModal.vue'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
export default {
  // middleware: 'auth',
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
