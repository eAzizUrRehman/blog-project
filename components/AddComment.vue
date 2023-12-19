<template>
  <div class="flex gap-2">
    <input
      type="text"
      v-model="comment.text"
      @keyup.enter="addComment"
      class="gradient border-all dim-white-border border-all h-10 w-96 rounded px-4 shadow-md outline-none focus:border-white focus:border-opacity-50"
      required
    />
    <Button
      :icon="require('@/assets/images/add-icon.svg')"
      :isSuccess="true"
      @handleClick="addComment"
    />
  </div>
</template>
<script>
import Button from '@/components/Button.vue'
export default {
  components: {
    Button,
  },
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      comment: {
        text: '',
      },
      submitted: false,
    }
  },
  methods: {
    addComment() {
      if (!this.comment.text.trim()) {
        this.$toast.error('Comment cannot be empty')
        return
      }
      const tempComment = {
        text: this.comment.text.trim(),
        date: new Date().toISOString(),
      }
      this.$store.commit('addComment', {
        postId: this.postId,
        comment: tempComment,
      })
      this.comment.text = ''
    },
  },
}
</script>
