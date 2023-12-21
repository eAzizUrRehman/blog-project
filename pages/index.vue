<template>
  <div class="container-10x pb-20">
    <p
      class="container-10x xxs:py-1.5 xxs:text-sm xs:py-2 xs:text-base mx-auto w-fit py-1 text-xs font-semibold transition-all duration-300 ease-in-out sm:py-3 sm:text-lg md:py-4 md:text-xl lg:py-6 lg:text-2xl"
    >
      {{ animatedTitle || '&nbsp;' }}
    </p>
    <div
      class="gradient border-all dim-white-border rounded-2xl px-5 py-10 shadow-xl"
    >
      <h2 class="mx-auto w-fit text-3xl font-bold" v-t="'posts.title'"></h2>
      <div v-if="posts.length > 0">
        <div v-for="post in posts" :key="post.id">
          <div
            class="gradient border-all dim-white-border mt-10 rounded-lg px-10 py-5 shadow-lg"
          >
            <div class="flex items-center justify-between">
              <p class="text-xs font-semibold">
                {{ showPostDate(post.date) }}
                {{ showPostTime(post.date) }}
                ({{ postAge(post.date) }})
              </p>
              <div class="flex gap-2">
                <Button
                  :icon="require('@/assets/images/edit-icon.svg')"
                  :isSuccess="true"
                  @handleClick="openUpdateModal = true"
                />
                <AddOrUpdateModal
                  v-if="openUpdateModal"
                  :text="$t('posts.edit_post')"
                  :titlePlaceholder="$t('placeholders.updated_title')"
                  :contentPlaceholder="$t('placeholders.updated_content')"
                  :updatingPostId="post.id"
                  :update="true"
                  :existingTitle="post.title"
                  :existingContent="post.content"
                  @handleAddOrUpdateCancelled="openUpdateModal = false"
                  @postUpdated="openUpdateModal = false"
                />
                <Button
                  :icon="require('@/assets/images/delete-icon.svg')"
                  :isDanger="true"
                  @handleClick="openDeleteModal = true"
                />
                <DeleteModal
                  v-if="openDeleteModal"
                  :text="$t('posts.confirm_delete_post')"
                  @handleDeleteConfirmed="
                    handleDeletePost(post.id)
                    animateTitle()
                  "
                  @handleDeleteCancelled="
                    openDeleteModal = false
                    animateTitle()
                  "
                />
              </div>
            </div>
            <NuxtLink
              :to="`/posts/${post.id}`"
              class="cursor-pointer hover:opacity-80"
            >
              <h2
                class="my-5 overflow-hidden text-ellipsis text-center text-lg font-semibold"
              >
                {{ post.title }}
              </h2>
              <p class="overflow-hidden text-ellipsis">{{ post.content }}</p>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div v-else class="flex-center flex-col gap-10">
        <p class="mt-10 text-xl font-semibold">
          {{ $t('posts.no_post') }}
        </p>
        <Button
          :text="$t('posts.add_post')"
          :icon="require('@/assets/images/add-icon.svg')"
          :isSuccess="true"
          @handleClick="openAddModal = true"
        />
        <AddOrUpdateModal
          v-if="openAddModal"
          @handleAddOrUpdateCancelled="openAddModal = false"
          @postAdded="openAddModal = false"
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
      openAddModal: false,
      openUpdateModal: false,
      animatedTitle: '',
      intervalId: null,
    }
  },
  computed: {
    posts() {
      return this.$store.state.blog.posts
    },
  },
  watch: {
    posts(newPosts) {
      if (newPosts.length === 0) {
        this.openAddModal = false
      }
    },
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
    animateTitle() {
      let i = 0
      let direction = 'forward'
      const text = this.$i18n.t('tagline')
      const animate = () => {
        if (this.openDeleteModal) {
          console.log('not animating')
          return
        }
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
      if (!this.openDeleteModal) {
        animate()
      }
    },
  },
  mounted() {
    this.animateTitle()
  },
}
</script>
