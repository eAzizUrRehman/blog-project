<template>
  <div
    class="fixed inset-0 bg-opacity-5 backdrop-blur-md flex items-center justify-center z-50"
    @click.self="$emit('handleAddOrUpdateCancelled')"
  >
    <div class="relative">
      <div
        class="p-1 rounded w-6 h-6 border-all dim-white-border hover:danger-gradient shadow-md drop-shadow-md absolute top-4 right-4 flex-center cursor-pointer"
      >
        <img
          src="@/assets/images/cross-icon.svg"
          alt=""
          width="20"
          height="20"
          @click="$emit('handleAddOrUpdateCancelled')"
        />
      </div>

      <div
        class="gradient rounded-lg overflow-auto border-all dim-white-border shadow-lg drop-shadow-lg"
      >
        <div class="p-8">
          <form class="px-5 py-10">
            <h2 class="mx-auto w-fit mb-10 font-bold text-3xl">
              {{ text }}
            </h2>
            <div class="w-fit mx-auto flex flex-col gap-10">
              <div class="flex justify-between items-start gap-4">
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
                  class="gradient w-96 h-10 rounded border-all dim-white-border px-4"
                  required
                />
              </div>
              <div class="flex justify-between items-start gap-4">
                <textarea
                  ref="contentTextarea"
                  v-model="post.content"
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
        title: this.existingTitle || '',
        content: this.existingContent || '',
      },
    }
  },

  methods: {
    async handleClicked() {
      console.log('handleClicked runs')
      if (!this.post.title.trim()) {
        this.$toast.error('Title cannot be empty')
        return
      }
      if (!this.post.content.trim()) {
        this.$toast.error('Kindly add content too')
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
        console.log('wasAdded', wasAdded)
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
  },
  beforeDestroy() {
    document.body.classList.remove('overflow-hidden')
  },
}
</script>
