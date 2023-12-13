<template>
  <div class="gradient w-full text-white min-h-screen">
    <Navbar />

    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
}
</script>
