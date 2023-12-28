<template>
  <header class="xxs:py-5 xs:py-6 w-full py-4 sm:py-8 md:py-10">
    <div class="gradient dim-white-border w-full border-y py-4 shadow-xl">
      <div
        class="container-10x mx-auto flex w-full items-center justify-between"
      >
        <NuxtLink to="/">
          <div class="flex gap-1">
            <img
              loading="lazy"
              src="/logo.svg"
              alt="logo"
              class="w-10 hover:opacity-70"
            />
            <h3 class="my-auto w-20 overflow-auto px-1 font-semibold">
              {{ $i18n.t('title') }}
            </h3>
          </div>
        </NuxtLink>
        <NuxtLink
          v-for="locale in availableLocales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          @click.native="changeLocale(locale.code)"
        >
          {{ locale.name }}
        </NuxtLink>
        <div class="flex gap-4">
          <Button
            :text="$t('posts.show_posts')"
            :icon="require('@/assets/images/posts-icon.svg')"
            @handleClick="$router.push('/')"
          />
          <Button
            :text="$t('posts.add_post')"
            :icon="require('@/assets/images/add-icon.svg')"
            :isSuccess="true"
            @handleClick="openAddOrUpdateModal = true"
          />
          <AddOrUpdateModal
            v-if="openAddOrUpdateModal"
            @handleAddOrUpdateCancelled="openAddOrUpdateModal = false"
            @postAdded="openAddOrUpdateModal = false"
          />
          <Button
            :text="$t('buttons.login')"
            @handleClick="$router.push('/login')"
          />
          <Button
            :text="$t('buttons.register')"
            @handleClick="$router.push('/register')"
          />
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import Button from '@/components/Button.vue'
import AddOrUpdateModal from '@/components/AddOrUpdateModal.vue'

export default {
  components: {
    Button,
    AddOrUpdateModal,
  },
  data() {
    return {
      openAddOrUpdateModal: false,
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
    },
    locales() {
      return this.$i18n.locales
    },
    availableLocales() {
      if (this.locales && Array.isArray(this.locales)) {
        const availableLocales = this.locales.filter(
          (i) => i.code !== this.locale,
        )
        return availableLocales
      }
      return []
    },
  },
  methods: {
    changeLocale(locale) {
      this.$store.dispatch('setLocale', locale)
      this.$store.dispatch('setDir', locale === 'en' ? 'ltr' : 'rtl')
      this.$i18n.setLocale(locale)
    },
  },
}
</script>
