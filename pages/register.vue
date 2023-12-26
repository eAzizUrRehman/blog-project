<template>
  <div
    class="container-8x gradient border-all dim-white-border flex-center flex-col gap-4 rounded-2xl bg-red-400 px-5 py-10"
  >
    <h1 class="text-2xl font-semibold">Register</h1>
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
      <Button text="Login" :isSuccess="true" @handleClick="registerUser" />
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
  methods: {
    async registerUser() {
      try {
        console.log('Attempting to register with:', {
          username: this.username,
          password: this.password,
        })

        const response = await this.$axios.$post('/register', {
          username: this.username,
          password: this.password,
        })

        console.log('Registration response:', response)

        alert('Registration successful')
      } catch (err) {
        console.error('Registration error:', err)
        alert('Registration failed')
      }
    },
  },
}
</script>
