<template>
    <div id="DayCount" :key="refresh_key">
        <label id="day_text">
            <label id="day_nums">Day: {{ day_count }} </label>
        </label>
        <a-button class="nextday-btn" @click="nextDay">
            End Day
        </a-button>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            day_count: 1,
            refresh_key: 0,
        }
    },
    watch: {
        refreshKeyChange(new_val, old_val) {
            this.refresh_key = new_val;
            this.day_count = this.$store.state.days;
        }
    },
    computed: {
        refreshKeyChange() {
            return this.$store.state.refresh_key;
        }
    },
    methods: {
        nextDay() {
            this.day_count = this.day_count + 1;
            this.$store.commit('stockNextDay');
        },
    }
};
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";

#DayCount {
    padding: $header_pandding_size;
}

#day_text {
    color: #FFFFFF;
    font-weight: 400;
    font-size: $font_size2;
    padding-right: $header_pandding_size;
}

#day_nums {
    font-weight: 600;
    width: 10px;
}

.nextday-btn {
    background-color: $button_color1;
    color: #FFFFFF;
    border: none;
    text-align: center;
    font-size: $font_size2;
    margin-left: 4px;
    transition: background-color 0.2s;

    &:hover {
        background-color: $button_color1_dark;
        color: #d8d8d8;
    }
}

.nextday-btn-loading {

  
}

</style>
