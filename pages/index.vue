<template>
  <div class="container-10x pb-20">
    <p
      class="container-10x mx-auto w-fit py-1 text-xs font-semibold transition-all duration-300 ease-in-out xxs:py-1.5 xxs:text-sm xs:py-2 xs:text-base sm:py-3 sm:text-lg md:py-4 md:text-xl lg:py-6 lg:text-2xl"
    >
      {{ animatedTitle || '&nbsp;' }}
    </p>
    <div class="gradient px-5 py-10 rounded-2xl border-all dim-white-border">
      <h2 class="mx-auto w-fit font-bold text-3xl">Posts</h2>
      <div v-if="posts.length > 0">
        <div v-for="post in posts" :key="post.id">
          <div
            class="gradient mt-10 border-all dim-white-border rounded-lg py-5 px-10"
          >
            <div class="flex justify-between items-center">
              <p class="text-xs font-semibold">
                {{ showPostDate(post.date) }}
                {{ showPostTime(post.date) }}
                ({{ postAge(post.date) }})
              </p>
              <div class="flex gap-2">
                <Button
                  :icon="require('@/assets/images/edit-icon.svg')"
                  :isSuccess="true"
                  @handleClick="
                    $router.push({
                      name: 'posts-id',
                      params: { id: post.id },
                      query: { showUpdatePost: 'true' },
                    })
                  "
                />
                <Button
                  :icon="require('@/assets/images/delete-icon.svg')"
                  :isDanger="true"
                  @handleClick="deletePost(post.id)"
                />
              </div>
            </div>
            <NuxtLink
              :to="`/posts/${post.id}`"
              class="cursor-pointer hover:opacity-80"
            >
              <h2 class="text-center mb-5 font-semibold text-lg">
                {{ post.title }}
              </h2>
              <p class=" ">{{ post.content }}</p>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div v-else class="flex-center flex-col gap-10">
        <p class="mt-10 text-xl font-semibold">
          No post to show. Kindly add one first.
        </p>
        <Button
          text="Add Post"
          :icon="require('@/assets/images/add-icon.svg')"
          :isSuccess="true"
          @handleClick="$router.push('/add-post')"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Button from '@/components/Button.vue'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
export default {
  components: {
    Button,
  },
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
      if (!date || isNaN(Date.parse(date))) {
        return ''
      }
      const parsedDate = parseISO(date)
      return format(parsedDate, 'MMM dd, yyyy')
    },
    showPostTime(date) {
      if (!date || isNaN(Date.parse(date))) {
        return ''
      }
      const parsedDate = parseISO(date)
      return format(parsedDate, 'hh:mm a')
    },
    postAge(date) {
      if (!date || isNaN(Date.parse(date))) {
        return ''
      }
      const parsedDate = parseISO(date)
      return formatDistanceToNow(parsedDate, { addSuffix: true })
    },
    deletePost(id) {
      this.$store.commit('deletePost', id)
    },
  },
  computed: {
    posts: function () {
      return this.$store.state.blog.posts
    },
  },
}
</script>
