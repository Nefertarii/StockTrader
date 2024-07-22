<template>
    <div class="stock-list">
        <div v-for="stock in stock_list">
            <Stock :stock_code="stock.code" :stock_name="stock.name" :now_unit_price="stock.price"
                :is_sell="stock.is_sell" :quantity="stock.quantity" :buy_avg_price="stock.buy_avg"></Stock>
        </div>
    </div>
</template>

<script>
import Stock from './Stock.vue';

export default {
    components: {
        Stock,
    },
    props: {
        stock_list: {
            type: Array,
            required: true,
        }
    }
};
/*
code: 10004,
name: "stock4",
price: 15,
is_sell: false,
quantity: 0,
buy_avg: 0,
*/
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";

.stock-list {
    min-width: $page_window_min_size;
    max-width: $page_window_max_size;
}
</style>