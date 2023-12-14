<template>
  <div class="gradient w-full text-white min-h-screen">
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
