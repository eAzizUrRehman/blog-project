<template>
  <div class="flex gap-2">
    <input
      ref="commentInput"
      type="text"
      v-model.lazy="comment.text"
      class="gradient w-96 h-10 rounded border-all dim-white-border px-4 border-all dim-white-border"
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
  components: {
    Button,
  },
  methods: {
    addComment: function () {
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
      this.$refs.commentInput.select()
    },
  },
}
</script>
