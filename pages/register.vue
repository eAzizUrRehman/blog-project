<template>
  <div
    class="container-8x gradient border-all dim-white-border flex-center relative flex-col gap-4 rounded-2xl bg-red-400 px-5 py-10"
  >
    <Button
      :icon="require('@/assets/images/cross-icon.svg')"
      :isDanger="true"
      @handleClick="$router.push('/')"
      class="absolute right-4 top-4"
    />

    <h1 class="text-2xl font-semibold">{{ $t('buttons.register') }}</h1>
    <form @submit.prevent="login" class="flex-center flex-col gap-4">
      <input
        type="text"
        v-model="name"
        placeholder="Name..."
        class="gradient border-all dim-white-border rounded px-4 py-2 outline-none"
      />
      <input
        type="email"
        v-model="username"
        placeholder="Username..."
        class="gradient border-all dim-white-border rounded px-4 py-2 outline-none"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password..."
        class="gradient border-all dim-white-border rounded px-4 py-2 outline-none"
      />
      <Button
        :text="$t('buttons.register')"
        :isSuccess="true"
        @handleClick="registerUser"
      />
    </form>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
export default {
  components: {
    Button,
  },
  data() {
    return {
      name: 'aziz',
      username: 'aziz',
      password: 'aziz',
    }
  },
  mounted() {
    this.$toast.warning(this.$t('registeration_disabled'), {
      position: 'top-center',
      timeout: 5000,
    })
  },
}
</script>
