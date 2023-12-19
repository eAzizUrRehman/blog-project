<template>
  <div class="gradient text-shadow-default min-h-screen w-full text-white">
    <Navbar />
    <main class="py-10">
      <nuxt />
    </main>
    <Footer />
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>
