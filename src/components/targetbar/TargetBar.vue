<template>
    <div class="target-total">
        <div class="target-body">
            <div class="target-text">Goal: ${{ 1000000 }}</div>
            <FundsBar :progress="progress"></FundsBar>
        </div>
    </div>
</template>

<script>
import FundsBar from './FundsBar.vue';
import FundsBarTest from './FundsBarTest.vue';

export default {
    components: {
        FundsBar,
        FundsBarTest
    }, props: {
        funds_now: {
            type: Number,
            required: true,
        },
        target: {
            type: Number,
            required: true
        }
    }, data() {
        return {
            progress: 0
        }
    }, watch: {
        funds_now() {
            var temp_val = parseInt((this.funds_now * 100) / this.target);
            if (temp_val > 100) {
                this.progress = 100;
            } else if (temp_val < 0) {
                this.progress = 0;
            } else {
                this.progress = temp_val;
            }
        }
    }, mounted() {
        this.progress = parseInt((this.funds_now * 100) / this.target);
    }

};
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";

.target-total {
    display: flex;
    height: 150px;
    min-width: $page_window_min_size;
    background-color: $bg_color_gray;
}

.target-body {
    min-width: $page_window_min_size;
    max-width: $page_window_max_size;
    margin: auto;
}

.target-text {
    text-align: center;
    font-size: $font_size3;
    font-weight: 600;
    line-height: 1.5em;
}
</style>