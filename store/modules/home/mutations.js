export default {
  openModal(state) {
    state.isAnyModalOpen = true
  },
  closeModal(state) {
    state.isAnyModalOpen = false
  },
  setAnimatedTitle(state, title) {
    state.animatedTitle = title
  },
  // addPost(state, post) {
  //   post.id = Date.now()
  //   const titleExists = state.blog.posts.some(
  //     (existingPost) => existingPost.title === post.title,
  //   )
  //   if (titleExists) {
  //     this.$emit('titleExists')
  //     this.$toast.error('A post with this title already exists')
  //     return
  //   } else {
  //     state.blog.posts.push(post)
  //     this.$toast.success('Post added successfully')
  //   }
  // },
  addPost(state, post) {
    state.blog.posts.push(post)
  },
  updatePost(state, payload) {
    const post = state.blog.posts.find(
      (post) => post.id === payload.updatedPostId,
    )
    Object.assign(post, payload.updatedPost)
  },
  deletePost(state, postId) {
    const postIndex = state.blog.posts.findIndex((post) => post.id === postId)
    if (postIndex !== -1) {
      state.blog.posts.splice(postIndex, 1)
      this.$toast.success('Post deleted successfully')
    } else {
      throw new Error(`Post with ID ${postId} not found`)
    }
  },
  addComment(state, { postId, comment }) {
    const post = state.blog.posts.find((post) => post.id === postId)
    if (!post) {
      throw new Error(`Post with ID ${postId} not found`)
    }
    comment.id = Date.now()
    post.comments.push(comment)
    this.$toast.success('Commment added successfully')
  },
  deleteComment(state, { postId, commentId }) {
    if (!postId || !commentId) {
      return
    }
    const post = state.blog.posts.find((post) => post.id === postId)
    if (!post) {
      throw new Error(`Post with ID ${postId} not found`)
    }
    const commentIndex = post.comments.findIndex(
      (comment) => comment.id === commentId,
    )
    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1)
      this.$toast.success('Comment deleted successfully')
    } else {
      throw new Error(`Comment with ID ${commentId} not found`)
    }
  },
  updateComment(state, payload) {
    const post = state.blog.posts.find((post) => post.id === payload.postId)
    if (post) {
      const comment = post.comments.find(
        (comment) => comment.id === payload.commentId,
      )
      if (comment) {
        Object.assign(comment, payload.updatedComment)
      }
    }
  },
}
