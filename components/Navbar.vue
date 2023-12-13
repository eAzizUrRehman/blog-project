<template>
  <header class="w-full py-4 xxs:py-5 xs:py-6 sm:py-8 md:py-10">
    <div class="gradient w-full py-4">
      <div class="container mx-auto flex w-full items-center justify-between">
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
          <div
            v-for="link in navLinks"
            :key="link.id"
            class="transition-all ease-in-out duration-2000"
          >
            <div class="font-semibold hover:gradient px-3 py-1.5 rounded">
              <NuxtLink :to="link.path">{{ link.name }} </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    navLinks() {
      return this.$store.state.navLinks
    },
  },
}
</script>
