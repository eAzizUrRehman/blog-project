<template>
  <button
    @click.prevent="$emit('handleClick')"
    class="w-fit mx-auto p-2 rounded border-all dim-white-border flex-center gap-2 font-semibold transition-all ease-in-out duration-2000 shadow-md drop-shadow-md hover:shadow-lg"
    :class="{
      'success-gradient-hover': isSuccess,
      'danger-gradient-hover': isDanger,
      'gradient-hover': !isSuccess && !isDanger,
    }"
    :style="`transform: scale(${scale / 100})`"
  >
    <!-- DEBUG: Fix the width and height of image -->
    <img v-if="icon" loading="lazy" :src="icon" alt="" width="16" height="16" />
    <span v-if="text">
      {{ text }}
    </span>
  </button>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
    },
    icon: {
      type: String,
    },
    scale: {
      type: Number,
      default: 100,
    },
    isSuccess: {
      type: Boolean,
      default: false,
    },
    isDanger: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
