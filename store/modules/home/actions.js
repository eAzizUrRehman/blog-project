export default {
  async addPost({ commit, state }, post) {
    post.id = Date.now()
    const titleExists = state.blog.posts.some(
      (existingPost) => existingPost.title === post.title,
    )
    if (titleExists) {
      this._vm.$toast.error(this.$i18n.t('toasts.post.title_exists'))
      return false
    } else {
      commit('addPost', post)
      this.$toast.success(this.$i18n.t('toasts.post.added'))
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
        this._vm.$toast.error(this.$i18n.t('toasts.post.no_changes'))
        return false
      } else {
        commit('updatePost', payload)
        this._vm.$toast.success(this.$i18n.t('toasts.post.updated'))
        return true
      }
    } else {
      throw new Error(`Post with ID ${payload.updatingPostId} not found`)
    }
  },
  async updateComment({ commit, state }, payload) {
    if (!payload.postId || !payload.commentId || !payload.updatedComment) {
      this._vm.$toast.error(this.$i18n.t('toasts.comment.something_wrong'))
      return false
    }
    const post = state.blog.posts.find((post) => post.id === payload.postId)
    if (post) {
      const comment = post.comments.find(
        (comment) => comment.id === payload.commentId,
      )
      if (comment) {
        if (comment.text === payload.updatedComment.text) {
          this._vm.$toast.error(this.$i18n.t('toasts.comment.no_changes'))
          return false
        } else {
          commit('updateComment', payload)
          this._vm.$toast.success(this.$i18n.t('toasts.comment.updated'))
          return true
        }
      } else {
        throw new Error(`Comment with ID ${payload.commentId} not found`)
      }
    } else {
      throw new Error(`Post with ID ${payload.postId} not found`)
    }
  },
  setLocale({ commit }, locale) {
    commit('SET_LOCALE', locale)
  },

  setDir({ commit }, dir) {
    commit('SET_DIR', dir)
  },
}
