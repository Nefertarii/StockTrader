<template>
    <div>
        <Funds :funds="this.funds"></Funds>
        <button @click="increaseProgress">Increase Progress</button>
        <button @click="reduceProgress">Increase Progress</button>
    </div>
</template>

<script>
import Funds from './Funds.vue';

export default {
    data() {
        return {
            funds: 10000,
        }
    },
    components: {
        Funds,
    },
    methods: {
        increaseProgress() {
            this.funds += 1000;
        },
        reduceProgress() {
            this.funds -= 1000;
        }
    }
};
</script>

<style lang="scss" scoped></style>