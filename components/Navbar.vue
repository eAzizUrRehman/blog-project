<template>
  <header class="xxs:py-5 xs:py-6 w-full py-4 sm:py-8 md:py-10">
    <div class="gradient dim-white-border w-full border-y py-4 shadow-xl">
      <div
        class="container-10x mx-auto flex w-full items-center justify-between"
      >
        <NuxtLink to="/">
          <div class="flex gap-1">
            <img
              loading="lazy"
              src="/logo.svg"
              alt="logo"
              class="w-10 shadow-md hover:opacity-70"
            />
            <h3 class="my-auto w-16 overflow-auto px-1 font-semibold">
              HiTech Blog
            </h3>
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
  components: {
    Button,
    AddOrUpdateModal,
  },
  data() {
    return {
      openAddOrUpdateModal: false,
    }
  },
}
</script>
