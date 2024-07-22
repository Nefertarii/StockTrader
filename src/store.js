import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: { // 定义共享数据，变量
        save_date: "",
        save_name: "",
        days: 0,
        funds: 10000,
        target: 1000000,
        stocks: [
            {
                code: 10001,
                name: "stock1",
                price: 15,
                is_sell: false,
                quantity: 0,
                buy_avg: 0,
            },
            {
                code: 10002,
                name: "stock2",
                price: 15,
                is_sell: false,
                quantity: 0,
                buy_avg: 0,
            },
            {
                code: 10003,
                name: "stock3",
                price: 15,
                is_sell: false,
                quantity: 0,
                buy_avg: 0,
            },
            {
                code: 10004,
                name: "stock4",
                price: 15,
                is_sell: false,
                quantity: 0,
                buy_avg: 0,
            },
            {
                code: 10005,
                name: "stock5",
                price: 15,
                is_sell: false,
                quantity: 0,
                buy_avg: 0,
            },
            {
                code: 10006,
                name: "stock6",
                price: 15,
                is_sell: false,
                quantity: 0,
                buy_avg: 0,
            },
        ],
        holding_stocks: [], //save name
        refresh_key: 0,
    },
    mutations: {
        fundsAdd(state, val) {
            state.funds += val;

            state.refresh_key += 1;
        },
        quantityAdd(state, payload) {
            const stock = state.stocks.find(stock => stock.code === payload.code);
            if (stock) {
                stock.quantity = payload.quantity;
            }
        },
        buyAvgAdd(state, payload) {
            const stock = state.stocks.find(stock => stock.code === payload.code);
            if (stock) {
                stock.buy_avg = payload.buy_avg;
            }
        },
        holdingAdd(state, code) {
            const is_holding = state.holding_stocks.includes(code);
            const stock = state.stocks.find(stock => stock.code === code);
            if (!is_holding) {
                state.holding_stocks.push(stock.code);
            }
        },
        holdingRemove(state, code) {
            state.holding_stocks = state.holding_stocks.filter(function (holding) {
                return holding !== code
            });
        },
        stockNextDay(state) {
            for (const stock of state.stocks) {
                var random_num = Math.floor(Math.random() * 10);
                if (Math.floor(Math.random() * 2) === 0) {
                    stock.price -= random_num;
                    if (stock.price < 5) {
                        stock.price = 5;
                    }
                } else {
                    stock.price += random_num;
                    if (stock.price > 100) {
                        stock.price = 100;
                    }
                }
            }
            state.days += 1;
        },
        saveDate(state) {
            state.save_date = new Date(Date.now()).toLocaleDateString("en-US") + " " + new Date(Date.now()).toLocaleTimeString("en-US");
        },
        saveName(state, name) {
            state.save_name = name;
        },
        loadData(state, payload) {
            state.save_date = "";
            state.save_name = "";
            state.days = payload.days;
            state.funds = payload.funds;
            state.target = payload.target;
            state.stocks = payload.stocks;
            state.holding_stocks = payload.holding_stocks;

            state.refresh_key += 1;
        },
        componentRefresh(state) {
            state.refresh_key += 1;
        }

    }
})

export default store