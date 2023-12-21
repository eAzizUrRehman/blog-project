<template>
  <div
    class="flex-center fixed inset-0 z-40 h-screen w-screen bg-opacity-5 backdrop-blur-md"
  >
    <div class="relative">
      <Button
        :icon="require('@/assets/images/cross-icon.svg')"
        :isDanger="true"
        :scale="75"
        @handleClick="$emit('handleDeleteCancelled')"
        class="absolute right-4 top-4"
      />
      <div
        class="flex-center gradient border-all dim-white-border z-50 flex-col rounded-2xl px-20 py-10 shadow-xl"
      >
        <p class="text-3xl">⚠️</p>
        <p class="mt-2 text-xl font-semibold">
          {{ $t('posts.confirm_delete_post') }}
        </p>
        <div class="mt-10 flex gap-4">
          <Button
            :text="$t('buttons.no')"
            :isSuccess="true"
            @handleClick="$emit('handleDeleteCancelled')"
          />
          <Button
            :text="$t('buttons.yes')"
            :isDanger="true"
            @handleClick="$emit('handleDeleteConfirmed')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from '~/components/Button.vue'
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  components: {
    Button,
  },
  mounted() {
    // document.body.classList.add('overflow-hidden')
  },
  beforeDestroy() {
    // document.body.classList.remove('overflow-hidden')
  },
}
</script>
