<template>
  <div class="container pb-20">
    <p
      class="container mx-auto w-fit py-1 text-xs font-semibold transition-all duration-300 ease-in-out xxs:py-1.5 xxs:text-sm xs:py-2 xs:text-base sm:py-3 sm:text-lg md:py-4 md:text-xl lg:py-6 lg:text-2xl"
    >
      {{ animatedTitle || '&nbsp;' }}
    </p>
    <div class="gradient px-5 py-10 rounded-2xl dim-white-border">
      <h2 class="mx-auto w-fit font-bold text-3xl">Posts</h2>
      <div v-if="posts.length > 0">
        <div v-for="post in posts" :key="post.id">
          <NuxtLink :to="`/posts/${post.id}`">
            <div
              class="gradient cursor-pointer hover:opacity-80 mt-10 dim-white-border rounded-lg py-5 px-10"
            >
              <p class="text-xs font-semibold">
                {{ showPostDate(post.date) }}
                {{ showPostTime(post.date) }}
                ({{ postAge(post.date) }})
              </p>
              <h2 class="text-center mb-5 font-semibold text-lg">
                {{ post.title }}
              </h2>
              <p class=" ">{{ post.content }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div v-else class="flex-center flex-col gap-10">
        <p class="mt-10 text-xl font-semibold">
          No post to show. Kindly add one first.
        </p>
        <button
          @click="$router.push('/add-post')"
          class="gradient w-fit px-4 py-2 rounded dim-white-border"
        >
          Add Post
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { format, formatDistanceToNow } from 'date-fns'

export default {
  data() {
    return {
      animatedTitle: '',
      intervalId: null,
    }
  },
  mounted() {
    this.animateTitle()
  },
  methods: {
    animateTitle() {
      let i = 0
      let direction = 'forward'
      const text = 'HiTech Blog - Tech Unleashed...!'
      const animate = () => {
        if (direction === 'forward') {
          if (i < text.length) {
            this.animatedTitle = text.substring(0, i + 1)
            i++
          } else {
            direction = 'backward'
            i--
          }
        } else if (direction === 'backward') {
          if (i >= 0) {
            this.animatedTitle = text.substring(0, i)
            i--
          } else {
            direction = 'forward'
            i++
          }
        }
        const speed = direction === 'forward' ? 200 : 25
        setTimeout(animate, speed)
      }
      animate()
    },
    showPostDate(date) {
      return date ? format(date, 'MMM dd, yyyy') : ''
    },
    showPostTime(date) {
      return date ? format(date, 'hh:mm a') : ''
    },
    postAge(date) {
      return date ? formatDistanceToNow(date, { addSuffix: true }) : ''
    },
  },
  computed: {
    posts: function () {
      return this.$store.state.blog.posts
    },
  },
}
</script>
