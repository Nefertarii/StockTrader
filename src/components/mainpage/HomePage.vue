<template>
    <div class="container">
        <h2> Home </h2>
        <h3> Introduction </h3>
        <div> Welcome to the Stock Trader! Here you can play around on the stock market and get a little bit of
            knowledge about what brokers are doing every day! </div>
        <h3> How to play </h3>
        <div>
            This is really easy. Just buy some stocks on the
            <router-link to="./trade">market </router-link>
            (of course if they're priced well), then end the day, check the prices again
            and decide if you would be profitable Portfolio
            <router-link to="./portfolio">to sell them right now! </router-link>
            So it all ends up in few simple steps:
        </div>
        <ol>
            <li>Buy/sell stocks</li>
            <li>End the day</li>
            <li>Check the prices</li>
            <li>Profit & Repeat</li>
        </ol>
    </div>
</template>

<script>

export default {
    components: {

    }
}
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";

h2 {
    font-size: $font_size3;
    font-weight: 800;
}

h3 {
    font-weight: 600;
}

a {
    cursor: pointer;
    color: $button_color1;
    text-decoration: none;

    &:hover {
        color: $font_color_dark;
    }
}

li {
    padding: 5px;
}

.container {
    padding-left: 7%;
    padding-right: 7%;
}
</style>
