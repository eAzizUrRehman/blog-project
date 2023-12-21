export default {
  async addPost({ commit, state }, post) {
    post.id = Date.now()
    const titleExists = state.blog.posts.some(
      (existingPost) => existingPost.title === post.title,
    )
    if (titleExists) {
      this._vm.$toast.error('A post with this title already exists')
      return false
    } else {
      commit('addPost', post)
      app.$toast.success(app.i18n.t('toasts.post.added'))
      return true
    }
  },
  async updatePost({ commit, state }, payload) {
    const post = state.blog.posts.find(
      (post) => post.id === payload.updatingPostId,
    )
    if (post) {
      if (
        post.title === payload.updatedPost.title &&
        post.content === payload.updatedPost.content
      ) {
        this._vm.$toast.error('Kindly make changes to the post first')
        return false
      } else {
        commit('updatePost', payload)
        this._vm.$toast.success('Post updated successfully')
        return true
      }
    } else {
      throw new Error(`Post with ID ${payload.updatingPostId} not found`)
    }
  },
  async updateComment({ commit, state }, payload) {
    if (!payload.postId || !payload.commentId || !payload.updatedComment) {
      this._vm.$toast.error('Something went wrong')
      return false
    }
    const post = state.blog.posts.find((post) => post.id === payload.postId)
    if (post) {
      const comment = post.comments.find(
        (comment) => comment.id === payload.commentId,
      )
      if (comment) {
        if (comment.text === payload.updatedComment.text) {
          this._vm.$toast.error('Kindly make changes to the comment first')
          return false
        } else {
          commit('updateComment', payload)
          this._vm.$toast.success('Comment updated successfully')
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
