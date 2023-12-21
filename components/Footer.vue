<template>
  <div class="pb-20 pt-10">
    <div class="h-[0.1px] w-full bg-white bg-opacity-20"></div>
    <p class="mx-auto mt-5 text-center text-xs">
      {{ $t('copyright') }}
    </p>
    <div class="mx-auto mt-5 text-center text-xs">
      <!-- <button v-for="lang in languages" :key="lang" @click="changeLanguage(lang)" class="mr-10">
        {{ lang }}
      </button> -->
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      // languages: ['en', 'ur']
    }
  },
  // computed: {
  //   lang: {
  //     get() {
  //       console.log('Getting lang:', this.$store.state.lang)
  //       return this.$store.state.lang
  //     },
  //     set(value) {
  //       console.log('Setting lang:', value)
  //       this.$store.commit('SET_LANG', value)
  //     }
  //   }
  // },
  // methods: {
  //   changeLanguage(lang) {
  //     console.log('Changing language to:', lang)
  //     this.lang = lang
  //   }
  // },
  // watch: {
  //   lang(value) {
  //     console.log('Lang changed to:', value)
  //     this.$i18n.locale = value
  //   }
  // },
  // mounted() {
  //   console.log('Mounted, setting locale to:', this.lang)
  //   this.$i18n.locale = this.lang
  // }
}
</script>
