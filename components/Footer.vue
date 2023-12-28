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
    return {}
  },
}
</script>
