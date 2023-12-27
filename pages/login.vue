<template>
  <div
    class="container-8x gradient border-all dim-white-border flex-center flex-col gap-4 rounded-2xl bg-red-400 px-5 py-10 relative"
  >
  <Button
        :icon="require('@/assets/images/cross-icon.svg')"
        @handleClick="$router.push('/')"
        class="absolute right-4 top-4"
      />

    <h1 class="text-2xl font-semibold">{{$t('buttons.login')}}</h1>
    <form @submit.prevent="" class="flex-center flex-col gap-4">
      <input
        type="email"
        v-model="username"
        placeholder="Username"
        class="gradient border-all dim-white-border rounded px-4 py-2 outline-none"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        class="gradient border-all dim-white-border rounded px-4 py-2 outline-none"
      />
      <Button :text="$t('buttons.login')" :isSuccess="true" @handleClick="loginUser" />
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
      loginInfo: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    // loginUser(loginInfo) {
    // },
  },
  mounted() {
    this.$toast.warning(
      "Login is disabled due to a missing JSON server.",
      {
        position: 'top-center',
        timeout: 5000,
      },
    )
  },
}
</script>
