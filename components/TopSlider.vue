<template>
    <transition name="slide-down">
        <div v-if="show" class="top-slider">
            {{ message }}
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            message: '',
        };
    },
    methods: {
        showMessage(message) {
            this.message = message;
            this.show = true;
            setTimeout(() => {
                this.show = false;
            }, 3000); // Hide the message after 3 seconds
        },
    },
};
</script>

<style scoped>
.top-slider {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background-color: #f8d7da;
    color: #721c24;
    text-align: center;
    z-index: 1000;
}
.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s ease;
}
.slide-down-enter,
.slide-down-leave-to {
    transform: translateY(-100%);
}
</style>