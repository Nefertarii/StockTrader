<template>
    <div>
        <div class="target-bar">
            <TargetBar :funds_now="funds" :target="target"></TargetBar>
        </div>

    </div>
</template>

<script>
import Portfolio from '../mainpage/Portfolio.vue';
import StockList from '../stock/StockList.vue';
import TargetBar from '../targetbar/TargetBar.vue';

export default {
    components: {
        TargetBar,
        StockList,
        Portfolio,
    },
    props: {

    },
    data() {
        return {
            funds: 0,
            target: 0,
            holding_stocks: [],
        }
    }, methods: {
        tFunc() {
            this.$store.commit('fundsReduce', 10000);
            console.log(this.$store.state.funds);
        },
        tFunc2() {
            this.$store.commit('fundsAdd', 10000);
            console.log(this.$store.state.funds);
        }
    },
    computed: {
        fundsChange() {
            return this.$store.state.funds;
        },
    },
    watch: {
        fundsChange(new_val, old_val) {
            this.funds = new_val;
            if(this.funds > this.target) {
                this.$router.push('end');
            }
        }
    }, mounted() {
        this.funds = this.$store.state.funds;
        this.target = this.$store.state.target;
        this.holding_stocks = this.$store.state.stocks.map(function (val) { return val });
        this.$store.commit('stockNextDay');
    }

};
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";

.target-bar {
    padding-top: $header_height_size;
}

</style>