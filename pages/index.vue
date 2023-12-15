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
                <!-- DEBUG: fix edit button not working -->
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
                <!-- DEBUG: check why on second time, animateTitle is dispatched 4 to 5 times when delete is clicked -->
                <Button
                  :icon="require('@/assets/images/delete-icon.svg')"
                  :isDanger="true"
                  @handleClick="openDeleteModal = true"
                />
                <DeleteModal
                  v-if="openDeleteModal"
                  text="Are you sure you want to delete this post?"
                  @handleDeleteConfirmed="handleDeletePost(post.id)"
                  @handleDeleteCancelled="openDeleteModal = false"
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
          @handleClick="openAddOrUpdateModal = true"
        />
        <AddOrUpdateModal
          v-if="openAddOrUpdateModal"
          @handleAddOrUpdateCancelled="openAddOrUpdateModal = false"
          @postAdded="openAddOrUpdateModal = false"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Button from '@/components/Button.vue'
import AddOrUpdateModal from '@/components/AddOrUpdateModal.vue'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
export default {
  components: {
    Button,
    AddOrUpdateModal,
  },
  data() {
    return {
      openDeleteModal: false,
      deleteConfirmed: false,
      openAddOrUpdateModal: false,
    }
  },
  computed: {
    posts() {
      return this.$store.state.blog.posts
    },
    animatedTitle() {
      return this.$store.state.animatedTitle
    },
  },
  mounted() {
    this.$store.commit('closeModal')
    this.$store.dispatch('animateTitle')
  },
  beforeDestroy() {
    this.$store.commit('openModal')
  },
  methods: {
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
    handleDeletePost(id) {
      this.$store.commit('deletePost', id)
      this.openDeleteModal = false
    },
  },
}
</script>
