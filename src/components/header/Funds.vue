<template>
    <div id="funds_text">
        <div id="funds_num"> Funds:${{ animated_funds }} </div>
    </div>
</template>

<script>
import { gsap } from 'gsap';


export default {
    props: {
        funds: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    data() {
        return {
            animated_funds: 0,
        }
    },
    watch: {
        funds(new_val) {
            this.updateFunds(new_val);
        },
    },
    mounted() {
        this.updateFunds(this.funds);
    },
    methods: {
        updateFunds(new_val) {
            const newFunds = parseFloat(new_val);
            this.animated_funds = this.animated_funds.toString().replace(/,/g, '');
            gsap.to(this.$data, {
                duration: .4,
                animated_funds: newFunds,
                onUpdate: () => {
                    this.animated_funds = Math.round(this.animated_funds);
                    this.animated_funds = this.animated_funds.toLocaleString();
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";

input {
    padding: $header_pandding_size;
}

#funds_text {
    width: 160px;
    overflow: hidden;
    font-size: $font_size2;
}
</style>