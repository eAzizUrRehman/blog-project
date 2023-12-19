<template>
  <button
    @click.prevent="$emit('handleClick')"
    class="border-all dim-white-border flex-center duration-2000 min-w-10 min-h-10 mx-auto w-fit gap-2 rounded p-2 font-semibold shadow-md outline-none transition-all ease-in-out hover:shadow-lg"
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
