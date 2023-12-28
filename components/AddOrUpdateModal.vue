<template>
  <div
    class="fixed inset-0 z-40 flex items-center justify-center bg-opacity-5 backdrop-blur-md"
    @click.self="$emit('handleAddOrUpdateCancelled')"
  >
    <div class="relative">
      {{ existingTitle }}
      <Button
        :icon="require('@/assets/images/cross-icon.svg')"
        :isDanger="true"
        class="absolute right-4 top-4 z-50"
        @handleClick="$emit('handleAddOrUpdateCancelled')"
      />
      <div
        class="gradient border-all dim-white-border overflow-auto rounded-lg shadow-lg"
      >
        <div class="p-8">
          <form class="px-5 py-10">
            <h2 class="mx-auto mb-10 w-fit text-3xl font-bold">
              {{ text }}
            </h2>
            <div class="mx-auto flex w-fit flex-col gap-10">
              <div class="flex items-start justify-between gap-4">
                <!-- DEBUG: check why at enter, handleClick is called -->
                <input
                  ref="titleInput"
                  type="text"
                  v-model="post.title"
                  :placeholder="titlePlaceholder"
                  @keyup.enter="
                    if (post.title.trim() && existingTitle !== post.title) {
                      $refs.contentTextarea.focus()
                    }
                  "
                  class="gradient border-all dim-white-border h-10 w-96 rounded px-4 shadow-md outline-none focus:border-white focus:border-opacity-50"
                  required
                />
              </div>
              <div class="flex items-start justify-between gap-4">
                <textarea
                  ref="contentTextarea"
                  v-model="post.content"
                  :placeholder="contentPlaceholder"
                  class="gradient border-all dim-white-border h-40 w-96 rounded p-4 shadow-lg outline-none focus:border-white focus:border-opacity-50"
                ></textarea>
              </div>
              <Button
                :text="update ? $t('buttons.update') : $t('buttons.submit')"
                :icon="
                  update
                    ? require('@/assets/images/update-icon.svg')
                    : require('@/assets/images/add-icon.svg')
                "
                :isSuccess="true"
                @handleClick="handleClicked"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
export default {
  components: {
    Button,
  },
  props: {
    text: {
      type: String,
      default() {
        return this.$i18n.t('posts.add_new_post')
      },
    },
    titlePlaceholder: {
      type: String,
      default() {
        return this.$i18n.t('placeholders.title')
      },
    },
    contentPlaceholder: {
      type: String,
      default() {
        return this.$i18n.t('placeholders.content')
      },
    },
    update: {
      type: Boolean,
    },
    updatingPostId: {
      type: Number,
    },
    existingTitle: {
      type: String,
    },
    existingContent: {
      type: String,
    },
  },

  data() {
    return {
      post: {
        title: '',
        content: '',
      },
    }
  },
  computed: {
    updatingPost() {
      return this.$store.state.blog.posts.find(
        (post) => post.id === this.updatingPostId,
      )
    },
  },

  methods: {
    async handleClicked() {
      if (!this.post.title.trim()) {
        this.$toast.error(this.$t('toasts.post.title_empty'))
        return
      }
      if (!this.post.content.trim()) {
        this.$toast.error(this.$t('toasts.post.content_empty'))
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
          updatingPostId: this.updatingPostId,
          updatedPost: tempPost,
        })
        if (wasUpdated) {
          this.$emit('postUpdated')
        }
      } else {
        const wasAdded = await this.$store.dispatch('addPost', tempPost)
        if (wasAdded) {
          this.$emit('postAdded', wasAdded)
        }
      }
    },
  },
  mounted() {
    document.body.classList.add('overflow-hidden')
    this.$nextTick(() => {
      this.$refs.titleInput.focus()
      if (this.update) {
        this.$refs.titleInput.select()
      }
    })
    if (this.update) {
      // copy of updatingPost
      this.post = { ...this.updatingPost }
    }
  },
  beforeDestroy() {
    document.body.classList.remove('overflow-hidden')
  },
}
</script>
