<template>
    <div id="app">
        <HeaderList></HeaderList>
        <Asset></Asset>
        <Routershow></Routershow>
    </div>
</template>

<script>

import HeaderList from './components/modules/HeaderList.vue';
import TargetBar from './components/targetbar/TargetBar.vue';
import HomePage from './components/mainpage/HomePage.vue';
import StockTrade from './components/mainpage/StockTrade.vue';
import Routershow from './components/mainpage/Routershow.vue';
import Asset from './components/modules/Asset.vue';

export default {
    components: {
        HomePage,
        StockTrade,
        Asset,

        HeaderList,
        TargetBar,
        Routershow,

    }
}
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    //margin-right: calc(100% - 100vw); 
    //overflow-x: hidden;
    overflow-y: auto;
    /* 滚动条不占位置 */
    font-family:
        BlinkMacSystemFont,
        -apple-system,
        "Segoe UI",
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        "Fira Sans",
        "Droid Sans",
        "Helvetica Neue",
        Helvetica,
        Arial,
        sans-serif;

}
</style>