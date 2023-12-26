<template>
  <div
    class="container-8x gradient border-all dim-white-border flex-center flex-col gap-4 rounded-2xl bg-red-400 px-5 py-10"
  >
    <h1 class="text-2xl font-semibold">Login</h1>
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
      <Button text="Login" :isSuccess="true" @handleClick="loginUser" />
    </form>
    {{ $auth.loggedIn }}
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
      username: 'aziz',
      password: 'aziz',
    }
  },
  methods: {
    async loginUser() {
      try {
        console.log('Attempting to log in with:', {
          username: this.username,
          password: this.password,
        })

        const response = await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        })

        console.log('Login response:', response)

        if (this.$auth.loggedIn) {
          console.log('Login successful')
        } else {
          console.log('Login failed: $auth.loggedIn is still false')
        }
      } catch (err) {
        console.error('Login error:', err)
      }
    },
  },
}
</script>
