<template>
    <div :key="refresh_key">
        <h2> Portfolio </h2>
        <div class="empty-text" v-if="is_empty">
            You have no shares right now. Buy some on the
            <router-link to="./trade">market </router-link>
        </div>
        <div v-else>
            <StockList :stock_list="stocks"></StockList>
        </div>
    </div>
</template>

<script>
import StockList from '../stock/StockList.vue';

export default {
    components: {
        StockList,
    },
    data() {
        return {
            is_empty: true,
            copy_stocks: [],    //name
            stocks: [],         //true stock
            refresh_key: 0,
        }
    },
    methods: {
        assetAdd() {
            this.stocks.splice(0, this.stocks.length);
            if (this.$store.state.holding_stocks.length > 0) {
                //console.log(this.$store.state.holding_stocks)
                this.copy_stocks = this.$store.state.holding_stocks.slice(0);
                //console.log(this.copy_stocks);
                for (let i = 0; i < this.$store.state.holding_stocks.length; i++) {
                    var stock = this.$store.state.stocks.find(stock => stock.code === this.$store.state.holding_stocks[i]);
                    stock.is_sell = true;
                    this.stocks.push(stock);
                }
                this.is_empty = false;
            } else {
                this.is_empty = true;
            }
        }
    },
    watch: {
        refreshKeyChange(new_val, old_val) {
            this.refresh_key = new_val;
            this.assetAdd();
        }
    },
    computed: {
        refreshKeyChange() {
            return this.$store.state.refresh_key;
        }
    },
    mounted() {
        this.assetAdd();
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

a {
    cursor: pointer;
    color: $button_color1;
    text-decoration: none;

    &:hover {
        color: $font_color_dark;
    }
}

.empty-text {
    padding-left: 7%;
}
</style>