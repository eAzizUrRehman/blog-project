<template>
  <div
    class="fixed inset-0 bg-opacity-5 backdrop-blur-md flex items-center justify-center z-50"
  >
    <div class="relative">
      <img
        src="@/assets/images/cross-icon.svg"
        alt=""
        width="16"
        height="16"
        class="absolute top-4 right-4 cursor-pointer"
        @click="$emit('handleDeleteCancelled')"
      />

      <div
        class="px-20 py-10 flex-center flex-col gap-10 rounded-2xl gradient border-all dim-white-border"
      >
        <p class="text-xl font-semibold">
          {{ text }}
        </p>
        <div class="flex gap-4">
          <Button
            text="No"
            :isSuccess="true"
            @handleClick="$emit('handleDeleteCancelled')"
          />
          <Button
            text="Yes"
            :isDanger="true"
            @handleClick="$emit('handleDeleteConfirmed')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  mounted() {
    document.body.classList.add('overflow-hidden')
    this.$store.commit('openModal')
  },
  beforeDestroy() {
    document.body.classList.remove('overflow-hidden')
    this.$store.commit('closeModal')
    this.$store.dispatch('animateTitle')
  },
}
</script>
