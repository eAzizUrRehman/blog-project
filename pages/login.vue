<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <button @click="loginWithGoogle">Login with Google</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        })

        this.$router.push('/')
      } catch (err) {
        console.error(err)
      }
    },
    async loginWithGoogle() {
      try {
        await this.$auth.loginWith('google')
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
