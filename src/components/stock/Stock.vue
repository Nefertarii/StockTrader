<template>
    <div class="stock-unit">
        <div class="stock-top">
            <div class="stock-name-text">{{ stock_name }}</div>
            <div class="stock-unit-holding" v-show="is_sell"> Hold: {{ quantity_local }}</div>
            <div :class="['stock-unit-buy-avg', avg_price_class]" v-show="is_sell"> BuyAvg: ${{ buy_avg_price }}</div>
            <div v-if="is_sell">
                <div class="stock-unit-price" id="now_price"> Now: ${{ now_unit_price }}</div>
            </div>
            <div v-else>
                <div class="stock-unit-price" id="now_price"> Now: ${{ now_unit_price }}</div>
            </div>
        </div>
        <div class="stock-bottom">
            <div class="stock-buy-input">
                <input :class="stock_num_choose_class" type="number" v-model.trim="choose_num" placeholder="Quantity" />
            </div>
            <div class="stock-total-price">
                <label :class="stock_total_number_class">${{ total_price_animation }}</label>
            </div>
            <div class="stock-buy-btn">
                <button class="sell-max-btn" v-if="is_sell" @click="maxQuantitySell">max</button>
                <button class="buy-max-btn" v-else @click="maxQuantityBuy">max</button>

                <!--  
                <button :class="[condition ? sell-btn : sell-btn-dis]" v-if="is_sell" @click="sellStock">sell</button>
                <button :class="[condition ? buy-btn : buy-btn-dis]" v-else @click="buyStock">buy</button>
                -->
                <button :disabled="sell_is_disabled" class="sell-btn" v-if="is_sell" @click="sellStock">sell</button>
                <button :disabled="buy_is_disabled" class="buy-btn" v-else @click="buyStock">buy</button>
            </div>
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
    props: {
        stock_code: {
            type: Number,
            required: true,
        },
        stock_name: {
            type: String,
            required: true,
        },
        now_unit_price: {
            type: Number,
            required: true,
        },
        is_sell: {
            type: Boolean,
            required: true,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        buy_avg_price: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            funds_local: 0,
            quantity_local: 0,
            buy_avg_price_local: 0,
            choose_num: 0,
            total_price: 0,
            total_price_animation: 0,
            sell_is_disabled: false,
            buy_is_disabled: false,
            stock_total_number_class: "",
            avg_price_class: "",
            stock_num_choose_class: "",
        }
    },

    methods: {
        updateFunds() {
            this.funds_local = this.$store.state.funds;
        },
        uploadFunds(val) {
            this.updateFunds();
            this.$store.commit('fundsAdd', val);
        },
        uploadQuantity(code, quantity) {
            this.$store.commit('quantityAdd', { code, quantity });
        },
        uploadHoldingAdd(code) {
            this.$store.commit('holdingAdd', code);
        },
        uploadHoldingRemove(code) {
            this.$store.commit('holdingRemove', code);
        },
        uploadBuyAvgPrice(code, buy_avg) {
            this.$store.commit('buyAvgAdd', { code, buy_avg });
        },
        maxQuantityBuy() {
            this.updateFunds();
            var buy_num = this.funds_local / this.now_unit_price;
            this.choose_num = Math.floor(buy_num);
        },
        maxQuantitySell() {
            this.choose_num = this.quantity_local;
        },
        buyStock() {
            this.updateFunds();
            const nums = parseInt(this.choose_num);

            if (nums > 0) {
                var buy_val = nums * this.now_unit_price;
                if (buy_val <= this.funds_local) {
                    this.quantity_local += nums;
                    this.choose_num = null;
                    if (this.buy_avg_price_local > 0) {
                        var buy_avg = (this.buy_avg_price_local * this.quantity_local + this.now_unit_price * nums) / (this.quantity_local + nums);
                        buy_avg = buy_avg.toFixed(2)
                        this.buy_avg_price_local = parseFloat(buy_avg);
                    } else {
                        this.buy_avg_price_local = this.now_unit_price;
                    }

                    this.uploadFunds(-buy_val);
                    this.uploadQuantity(this.stock_code, this.quantity_local);
                    this.uploadHoldingAdd(this.stock_code);
                    this.uploadBuyAvgPrice(this.stock_code, this.buy_avg_price_local);
                }
            }
        },
        sellStock() {
            if (this.choose_num <= this.quantity_local) {
                var sell_val = this.choose_num * this.now_unit_price;
                this.quantity_local -= this.choose_num;
                if (this.quantity_local == 0) {
                    this.buy_avg_price_local = 0;
                }
                this.choose_num = null;
                this.uploadFunds(sell_val);
                this.uploadBuyAvgPrice(this.stock_code, this.buy_avg_price_local);
                this.uploadQuantity(this.stock_code, this.quantity_local);
                this.uploadHoldingRemove(this.stock_code);

            }
        },
        totalPriceAnimation() {
            this.total_price_animation = this.total_price_animation.toString().replace(/,/g, '');
            gsap.to(this.$data, {
                duration: .3,
                ease: 'circ.out',
                total_price_animation: this.total_price,
                onUpdate: () => {
                    this.total_price_animation = parseInt(this.total_price_animation);
                    this.total_price_animation = this.total_price_animation.toLocaleString();
                }
            });
        },
        changeClass() {
            if (this.is_sell == false) {

                if (this.total_price > this.funds_local) {
                    this.stock_total_number_class = "stock-total-price-danger";
                    this.stock_num_choose_class = "stock-num-choose-danger";
                    this.buy_is_disabled = true;
                } else {
                    this.stock_total_number_class = "";
                    this.stock_num_choose_class = "";
                    this.buy_is_disabled = false;
                }
            } else {
                if (this.buy_avg_price_local > this.now_unit_price) {
                    this.avg_price_class = "stock-avg-price-danger";
                    this.stock_num_choose_class = "stock-num-choose-danger";
                } else {
                    this.avg_price_class = "";
                    this.stock_num_choose_class = "";
                }
                if (this.choose_num > this.quantity_local) {
                    this.sell_is_disabled = true;
                } else {
                    this.sell_is_disabled = false;
                }
            }
        },
        updata() {
            this.funds_local = this.$store.state.funds;
            const stock1 = this.$store.state.stocks.find(stock1 => stock1.code === this.stock_code);
            if (stock1) {
                this.quantity_local = stock1.quantity;
            }
            const stock2 = this.$store.state.stocks.find(stock2 => stock2.code === this.stock_code);
            if (stock2) {
                this.buy_avg_price_local = stock2.buy_avg;
            }
        }
    },
    computed: {
        fundsChange() {
            return this.$store.state.funds;
        }
    },
    watch: {
        choose_num() {
            this.changeClass();
            this.total_price = this.choose_num * this.now_unit_price;
        },
        now_unit_price() {
            this.total_price = this.choose_num * this.now_unit_price;
            this.changeClass();
        },
        total_price() {
            this.totalPriceAnimation();
            this.changeClass();
        },
        fundsChange(new_val, old_val) {
            this.funds_local = new_val;
            this.changeClass();
        }
    },
    mounted() {
        this.updata();
        this.changeClass();
    }
};
</script>

<style lang="scss" scoped>
@import "../css/variable.scss";

.stock-unit {
    margin-left: 30%;
    height: $stock_height;
    width: $stock_width;
    display: flex;
    flex-direction: column;
    border: 1px solid $border_color_gray;
    margin-bottom: 10px;
}

.stock-top {
    flex: 1;
    display: flex;
    border: 1px solid $border_color_gray;
    align-items: center;
}

.stock-bottom {
    flex: 1;
    display: flex;
    justify-content: space-between;

}

.stock-name {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: $btn_padding_size1;
}

.stock-name-text {
    margin-left: $btn_padding_size2;
    font-size: $font_size3;
    font-weight: 800;
}

.stock-unit-holding,
.stock-unit-buy-avg,
.stock-unit-price {
    margin-left: $btn_padding_size2;
    color: #FFFFFF;
    padding: $btn_padding_size2;
    border-radius: $border_radius;
    background-color: $button_color1;
}

.stock-unit-buy-avg {
    background-color: $success_color;
}

.stock-unit-price {
    background-color: $success_color;
}

label {
    padding-left: 15px;
}

.stock-buy-input {
    flex: 1;
    display: flex;
}

input {
    margin-left: 10%;
    margin-top: 5%;
    width: 80%;
    height: 50%;
    border: 1px solid $border_color_gray;
    border-radius: $border_radius;
    text-align: center;

    &:focus {
        outline: none; //有才生效
        border: 1px solid $button_color1;
        box-shadow: 0 0 3px $button_color1;
    }

}

.stock-num-choose-danger {
    border: 1px solid $danger_color;
    &:focus {
        border: 1px solid $danger_color;
        box-shadow: 0 0 3px $danger_color;
    }
}

.stock-total-price {
    flex: 1;
    display: flex;
    align-items: center;
    border: 1px solid $border_color_gray;
    overflow: hidden;
}

.stock-total-price-danger {
    color: $danger_color;
}

.stock-avg-price-danger {
    background-color: $danger_color;
}

.stock-total-price-success {
    color: $success_color;
}

.stock-buy-btn {
    flex: 1;
    display: flex;
    border: 1px solid $border_color_gray;
    justify-content: space-around;
    align-items: center;
}

button {
    border: 1px solid $border_color_gray;
    border-radius: $border_radius;
    padding: $btn_padding_size1 $btn_padding_size2;
    background-color: $bg_color_gray;
    font-weight: 600;
    font-size: $font_size1;
    cursor: pointer;

    &:hover {
        background-color: $bg_color_gray2;
    }
}

button:disabled,
button[disabled] {
    background-color: $button_color1_light;
    cursor: not-allowed;

    &:hover {
        background-color: $button_color1_light;
    }
}

.buy-btn,
.sell-btn {
    background-color: $button_color1;
    color: $font_color_light;

    &:hover {
        background-color: $button_color1_dark;
    }
}
</style>
