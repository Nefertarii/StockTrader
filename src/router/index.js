//导入模块
import Vue from "vue";
import VueRouter from 'vue-router';
import HomePage from "../components/mainpage/HomePage.vue";
import Portfolio from "../components/mainpage/Portfolio.vue";
import StockTrade from "../components/mainpage/StockTrade.vue";
import End from "../components/mainpage/End.vue";

//注册路由组件
Vue.use(VueRouter);
//编写路由规则
const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage
    },
    {
        path: "/portfolio",
        name: "Portfolio",
        component: Portfolio
    },
    {
        path: "/trade",
        name: "Trade",
        component: StockTrade
    },
    {
        path: "/end",
        name: "End",
        component: End
    }
]
//创建路由
const router = new VueRouter({
    mode: 'history',
    routes
})
//导出
export default router;