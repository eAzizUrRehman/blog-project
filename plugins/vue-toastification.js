import Vue from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Vue.use(Toast, {
  toastDefaults: {
    success: {
      toastClassName: 'success-toast',
    },
    error: {
      toastClassName: 'danger-toast',
    },
  },
})
