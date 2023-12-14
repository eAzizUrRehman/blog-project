<template>
  <div class="pb-20 container-10x">
    <div
      v-show="!submitted"
      class="gradient rounded-3xl container-10x border-all dim-white-border px-4 py-10"
    >
      <PostDataCollector />
    </div>
  </div>
</template>
<script>
import PostDataCollector from '@/components/PostDataCollector.vue'
export default {
  components: {
    PostDataCollector,
  },
  methods: {},
}
</script>
