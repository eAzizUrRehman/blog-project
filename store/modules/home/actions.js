export default {
  async addPost({ commit, state }, post) {
    post.id = Date.now()
    const titleExists = state.blog.posts.some(
      (existingPost) => existingPost.title === post.title,
    )
    if (titleExists) {
      this.$toast.error('A post with this title already exists')
      return false
    } else {
      commit('addPost', post)
      this.$toast.success('Post added successfully')
      return true
    }
  },
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
  animateTitle({ commit, state }) {
    let i = 0
    let direction = 'forward'
    const text = 'HiTech Blog - Tech Unleashed...!'
    const animate = () => {
      if (state.isAnyModalOpen) {
        console.log('not animating')
        return
      }
      // console.log(' animating')
      let title = ''
      if (direction === 'forward') {
        if (i < text.length) {
          title = text.substring(0, i + 1)
          i++
        } else {
          direction = 'backward'
          i--
        }
      } else if (direction === 'backward') {
        if (i >= 0) {
          title = text.substring(0, i)
          i--
        } else {
          direction = 'forward'
          i++
        }
      }
      commit('setAnimatedTitle', title)
      const speed = direction === 'forward' ? 200 : 25
      setTimeout(animate, speed)
    }
    animate()
  },
}
