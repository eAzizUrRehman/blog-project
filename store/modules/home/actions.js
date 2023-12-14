export default {
  async updatePost({ commit, state }, payload) {
    const post = state.blog.posts.find(
      (post) => post.id === payload.updatedPostId,
    )
    if (post) {
      if (
        post.title === payload.updatedPost.title &&
        post.content === payload.updatedPost.content
      ) {
        this.$toast.error('Kindly make changes to the post first')
        return false
      } else {
        commit('updatePost', payload)
        this.$toast.success('Post updated successfully', {
          className: 'success-gradient',
        })
        return true
      }
    } else {
      throw new Error(`Post with ID ${payload.updatedPostId} not found`)
    }
  },
  async updateComment({ commit, state }, payload) {
    if (!payload.postId || !payload.commentId || !payload.updatedComment) {
      this.$toast.error('Something went wrong')
      return false
    }
    const post = state.blog.posts.find((post) => post.id === payload.postId)
    if (post) {
      const comment = post.comments.find(
        (comment) => comment.id === payload.commentId,
      )
      if (comment) {
        if (comment.text === payload.updatedComment.text) {
          this.$toast.error('Kindly make changes to the comment first')
          return false
        } else {
          commit('updateComment', payload)
          this.$toast.success('Comment updated successfully')
          return true
        }
      } else {
        throw new Error(`Comment with ID ${payload.commentId} not found`)
      }
    } else {
      throw new Error(`Post with ID ${payload.postId} not found`)
    }
  },
}
