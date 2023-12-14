<template>
  <div>
    <form class="px-5 py-10">
      <h2 class="mx-auto w-fit mb-10 font-bold text-3xl">{{ headerText }}</h2>
      <div class="w-fit mx-auto flex flex-col gap-10">
        <div class="flex justify-between items-start gap-4">
          <input
            type="text"
            v-model.lazy="post.title"
            :placeholder="titlePlaceholder"
            class="gradient w-96 h-10 rounded border-all dim-white-border px-4"
            required
          />
        </div>
        <div class="flex justify-between items-start gap-4">
          <textarea
            v-model.lazy="post.content"
            :placeholder="contentPlaceholder"
            class="gradient w-96 h-40 rounded border-all dim-white-border p-4"
          ></textarea>
        </div>
        <Button
          :text="update ? 'Update' : 'Submit'"
          :icon="
            update
              ? require('@/assets/images/update-icon.svg')
              : require('@/assets/images/add-icon.svg')
          "
          :isSuccess="true"
          @handleClick="handleClick"
        />
      </div>
    </form>
  </div>
</template>
<script>
import Button from '@/components/Button.vue'
export default {
  props: {
    headerText: {
      type: String,
      default: 'Add a New Post',
    },
    titlePlaceholder: {
      type: String,
      default: 'Enter Post Title...',
    },
    contentPlaceholder: {
      type: String,
      default: 'Enter Post Content...',
    },
    update: {
      type: Boolean,
    },
    updatedPostId: {
      type: Number,
    },
  },
  components: {
    Button,
  },
  data() {
    return {
      post: {
        id: 1,
        title: '',
        content: '',
      },
    }
  },
  methods: {
    async handleClick() {
      if (!this.post.title.trim()) {
        this.$toast.error('Title cannot be empty')
        return
      }
      if (!this.post.content.trim()) {
        this.$toast.error('Content cannot be empty')
        return
      }
      const tempPost = {
        title: this.post.title.trim(),
        content: this.post.content.trim(),
        date: new Date().toISOString(),
        comments: [],
      }
      if (this.update) {
        const wasUpdated = await this.$store.dispatch('updatePost', {
          updatedPostId: this.updatedPostId,
          updatedPost: tempPost,
        })
        if (wasUpdated) {
          this.$emit('postUpdated')
        }
      } else {
        this.$store.commit('addPost', tempPost)
      }
    },
  },
}
</script>
