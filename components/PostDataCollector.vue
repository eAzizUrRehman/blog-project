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
            class="gradient w-96 h-10 rounded dim-white-border px-4"
            required
          />
        </div>
        <div class="flex justify-between items-start gap-4">
          <textarea
            v-model.lazy="post.content"
            :placeholder="contentPlaceholder"
            class="gradient w-96 h-40 rounded dim-white-border p-4"
          ></textarea>
        </div>

        <button
          @click.prevent="handleClick"
          class="gradient w-fit mx-auto px-4 py-2 rounded dim-white-border"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
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
      required: true,
    },
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
    handleClick: function () {
      const tempPost = {
        title: this.post.title,
        content: this.post.content,
        date: new Date(),
        comments: [],
      }
      if (this.update) {
        this.$store.commit('updatePost', {
          updatedPostId: this.updatedPostId,
          updatedPost: tempPost,
        })
        this.$toast.success('Post updated successfully')
        this.$emit('postUpdated')
      } else {
        this.$store.commit('addPost', tempPost)
        this.$toast.success('Post added successfully')
      }
    },
  },
}
</script>

<style></style>
