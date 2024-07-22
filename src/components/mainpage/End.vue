<template>
    <div class="full-page">
        <div class="container">
            <h1>Woohoo</h1>
            <div>
                Congratulations!
                After<label> {{ this.$store.state.days }} days, </label>You have <label> ${{ (this.$store.state.funds).toLocaleString() }} </label>
            </div>
            <div>
                Refresh the page to start again.
            </div>
        </div>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";

.full-page {
    display: flex;
    //align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
}

h1 {
    font-size: $font_size3;
    font-weight: 800;
}

label {
    font-weight: 800;
}

div {
    padding-bottom: $header_pandding_size;
}

.container {
    margin: auto;
    text-align: center;
}
</style>