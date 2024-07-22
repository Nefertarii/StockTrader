<template>
    <div>
        <FundsBar :progress="progress" />
        <button @click="increaseProgress">Increase Progress</button>
        <button @click="reduceProgress">Reduce Progress</button>
    </div>

</template>

<script>
import FundsBar from './FundsBar.vue';

export default {
    data() {
        return {
            progress: 0,
        }
    },
    components: {
        FundsBar
    },
    methods: {
        increaseProgress() {
            if (this.progress < 100) {
                this.progress += 10;
            }
        },
        reduceProgress() {
            if (this.progress >= 10) {
                this.progress -= 10;
            }
        }
    }
};

</script>

<style lang="scss" scoped></style>