<template>
  <div class="pb-20 container">
    <input
      type="text"
      v-model.lazy="comment.text"
      class="gradient w-96 h-10 rounded dim-white-border px-4"
      required
    />
    <button
      @click.prevent="addComment"
      class="gradient w-fit mx-auto px-4 py-2 rounded dim-white-border"
    >
      Add Comment
    </button>
  </div>
</template>

<script>
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
        id: 1,
        text: '',
      },
      submitted: false,
    }
  },

  methods: {
    addComment: function () {
      const tempComment = {
        text: this.comment.text,
        date: new Date(),
      }
      this.$store.commit('addComment', {
        postId: this.postId,
        comment: tempComment,
      })
    },
    
  },
}
</script>
