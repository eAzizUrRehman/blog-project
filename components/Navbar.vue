<template>
  <header class="w-full py-4 xxs:py-5 xs:py-6 sm:py-8 md:py-10">
    <div class="gradient w-full py-4 dim-white-border border-y">
      <div
        class="container-10x mx-auto flex w-full items-center justify-between"
      >
        <NuxtLink to="/">
          <div class="flex gap-2">
            <img
              loading="lazy"
              src="/logo.svg"
              alt="logo"
              class="hover:opacity-70 w-10 shadow-md"
            />
            <h3 class="min-h-full my-auto font-semibold">HiTech Blog</h3>
          </div>
        </NuxtLink>
        <div class="flex gap-4">
          <Button
            text="Show Posts"
            :icon="require('@/assets/images/posts-icon.svg')"
            @handleClick="$router.push('/')"
          />
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
  </header>
</template>
<script>
import Button from '@/components/Button.vue'
import AddOrUpdateModal from '@/components/AddOrUpdateModal.vue'
export default {
  data() {
    return {
      openAddOrUpdateModal: false,
    }
  },
  computed: {
    isAnyModalOpen() {
      return this.$store.state.isAnyModalOpen
    },
    animatedTitle() {
      return this.$store.state.animatedTitle
    },
  },
  components: {
    Button,
    AddOrUpdateModal,
  },
  methods: {},
}
</script>
