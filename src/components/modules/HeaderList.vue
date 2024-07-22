<template>
    <div class="header-list">
        <div class="navbar">
            <div class="left-components">
                <router-link to="/" tag="button" id="home_btn">Stock Trade</router-link>
                <router-link to="/portfolio" tag="button" id="portfolio_btn">Portfolio</router-link>
                <router-link to="/trade" tag="button" id="trade_btn">Trade</router-link>
            </div>
            <div class="right-components">
                <SaveModal></SaveModal>
                <LoadModal></LoadModal>
                <DayCount></DayCount>
                <Funds :funds="this.funds"></Funds>
                <HelpModal></HelpModal>
            </div>
        </div>
    </div>
</template>

<script>
import Funds from '../header/Funds.vue'
import DayCount from '../header/DayCount.vue';
import HelpModal from '../header/HelpModal.vue';
import SaveModal from '../header/SaveModal.vue';
import LoadModal from '../header/LoadModal.vue';

export default {
    components: {
        DayCount,
        Funds,
        HelpModal,
        SaveModal,
        LoadModal,
    },
    data() {
        return {
            funds: 0,
        }
    },
    computed: {
        animated_funds() {
            return this.funds.toFixed(0);
        },
        fundsChange() {
            return this.$store.state.funds;
        }
        //conputed从Vuex中获取需要监听的对象，赋值给函数；
        //watch监听Obj的变化；
        //直接监听'$store.state.funds'
    },
    watch: {
        fundsChange(new_val, old_val) {
            this.funds = new_val;
        }
    },
    mounted() {
        this.funds = this.$store.state.funds;
    },
    methods: {

    }


};
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";



.header-list {
    background-color: $bg_color_dark;
    min-width: $page_window_min_size;
    height: $header_height_size;
    color: #FFFFFF;
    //position: fixed;
    top: 0;
    position: sticky;
}

.navbar {
    margin: auto;
    white-space: nowrap;
    display: flex;
    min-width: $page_window_min_size;
    max-width: $page_window_max_size;
    height: 100%;
}

.left-components {
    display: flex;
    padding-left: 5%;
}

button {
    background-color: $bg_color_dark;
    border: none;
    cursor: pointer;
    text-align: center;
    color: #FFFFFF;
    padding-right: $header_pandding_size;
    padding-left: $header_pandding_size;

    &:hover {
        background-color: $bg_color_dark2;
    }
}

#home_btn {
    font-size: $font_size3;
    font-weight: 800;
}

#portfolio_btn {
    font-size: $font_size2;
}

#trade_btn {
    font-size: $font_size2;
}

.right-components {
    display: flex;
    align-items: center;
    margin-left: auto;
    padding-right: 5%;
}
</style>