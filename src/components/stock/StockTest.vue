<template>
    <div>
        <StockList :stock_list="stocks">

        </StockList>
    </div>
</template>

<script>
import StockList from './StockList.vue';

export default {
    components: {
        StockList,
    },
    data() {
        return {
            stocks: [
                {
                    code: 10001,
                    name: "stock1",
                    price: 20,
                    is_sell: false,
                }, {
                    code: 10002,
                    name: "stock2",
                    price: 25,
                    is_sell: false,
                }, {
                    code: 10003,
                    name: "stock3",
                    price: 30,
                    is_sell: false,
                }, {
                    code: 10004,
                    name: "stock4",
                    price: 15,
                    is_sell: false,
                },
            ]
        }
    },

};
</script>

<style lang="scss" scoped></style>