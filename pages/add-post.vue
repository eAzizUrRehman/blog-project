<template>
  <div class="pb-20 container">
    <div
      v-show="!submitted"
      class="gradient rounded-3xl container dim-white-border px-4 py-10"
    >
      <PostDataCollector
      
      />
    </div>

    <div
      v-show="submitted"
      class="absolut e gradient px-5 py-10 rounded-3xl container dim-white-border"
    >
      <div>
        <!-- Work here -->
      </div>
    </div>
  </div>
</template>

<script>
import PostDataCollector from '@/components/PostDataCollector.vue'
export default {
  components: {
    PostDataCollector,
  },
  methods: {
    
  },
}
</script>
