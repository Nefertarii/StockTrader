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
                name: "Stock Tycoon",
                price: 20,
                is_sell: false,
                quantity: 0,
                buy_avg: 0,
            },
            {
                code: 10002,
                name: "Wealth Storm",
                price: 20,
                is_sell: false,
                quantity: 0,
                buy_avg: 0,
            },
            {
                code: 10003,
                name: "Financial Empireney",
                price: 20,
                is_sell: false,
                quantity: 0,
                buy_avg: 0,
            },
            {
                code: 10004,
                name: "Wall Street King",
                price: 20,
                is_sell: false,
                quantity: 0,
                buy_avg: 0,
            },
            {
                code: 10005,
                name: "Trading Frenzy",
                price: 20,
                is_sell: false,
                quantity: 0,
                buy_avg: 0,
            },
            {
                code: 10006,
                name: "Market Elite",
                price: 20,
                is_sell: false,
                quantity: 0,
                buy_avg: 0,
            },
            {
                code: 10007,
                name: "Pinnacle of Wealth",
                price: 20,
                is_sell: false,
                quantity: 0,
                buy_avg: 0,
            },
            {
                code: 10008,
                name: "Market Mysteries",
                price: 20,
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
            //state.refresh_key += 1;
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
            state.refresh_key += 1;
        },
        stockNextDay(state) {
            for (const stock of state.stocks) {
                var random_num = Math.floor(Math.random() * 5);
                if (Math.floor(Math.random() * 2) === 0) {
                    stock.price -= random_num;
                    if (stock.price < 15) {
                        stock.price = 15;
                    }
                } else {
                    stock.price += random_num;
                    if (stock.price > 40) {
                        stock.price = 50;
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
            console.log("refresh");
            state.refresh_key += 1;
        }

    }
})

export default store