// import VuexPersistence from 'vuex-persist'
import * as stateContent from './modules/home/state.js'

export default {
  state() {
    return stateContent
  },
  mutations: {
    addPost(state, post) {
      post.id = Date.now()
      state.blog.posts.push(post)
    },
    updatePost(state, payload) {
      const post = state.blog.posts.find(
        (post) => post.id === payload.updatedPostId,
      )
      if (post) {
        Object.assign(post, payload.updatedPost)
      } else {
        throw new Error(`Post with ID ${payload.updatedPostId} not found`)
      }
    },
    deletePost(state, postId) {
      const postIndex = state.blog.posts.findIndex((post) => post.id === postId)
      if (postIndex !== -1) {
        state.blog.posts.splice(postIndex, 1)
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
    },
    deleteComment(state, { postId, commentId }) {
      const post = state.blog.posts.find((post) => post.id === postId)
      if (!post) {
        throw new Error(`Post with ID ${postId} not found`)
      }
      const commentIndex = post.comments.findIndex(
        (comment) => comment.id === commentId,
      )
      if (commentIndex !== -1) {
        post.comments.splice(commentIndex, 1)
      } else {
        throw new Error(`Comment with ID ${commentId} not found`)
      }
    },

    editComment(state, payload) {
      const post = state.blog.posts.find((post) => post.id === payload.postId)
      if (post) {
        const comment = post.comments.find(
          (comment) => comment.id === payload.commentId,
        )
        if (comment) {
          Object.assign(comment, payload.updatedComment)
        } else {
          throw new Error(`Comment with ID ${payload.commentId} not found`)
        }
      } else {
        throw new Error(`Post with ID ${payload.postId} not found`)
      }
    },
  },
  // plugins: [vuexPersist.plugin],
}
