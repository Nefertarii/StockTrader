<template>
    <div>
        <h2> Stocks </h2>
        <div>
            <StockList :stock_list="$store.state.stocks"></StockList>
        </div>
    </div>
</template>

<script>
import StockList from '../stock/StockList.vue';

export default {
    components: {
        StockList,
    },
    mounted() {
        for (var stock of this.$store.state.stocks) {
            stock.is_sell = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";

h2 {
    font-size: $font_size3;
    font-weight: 800;
    padding-left: 7%;
}
</style>