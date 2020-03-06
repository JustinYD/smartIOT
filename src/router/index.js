import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "@/components/Main";
import HelloWorld from "@/components/HelloWorld";
import Any from "@/components/Any";
import Setting from "@/components/Setting";
import Setyuzhi from "@/components/Setyuzhi";
import Setphone from "@/components/Setphone";
import Login from "@/components/Login"
import Home from "@/components/Home"
import History from "@/components/History"
import Analysis from "@/components/Analysis";
import Usermanage from "@/components/Usermanage";
import Operation from "@/components/Operation";
import ExportExcel from '../ExportExcel'
import BackToTop from '../BackToTop'
Vue.use(VueRouter)
    /*引入Vue框架*/
    /*引入资源请求插件*/
import VueResource from 'vue-resource'

/*使用VueResource插件*/
Vue.use(VueResource)
const routes = [{
        path: '/',
        name: 'login',
        component: Login,
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        // eslint-disable-next-line no-undef
        component: Login
    },
    {
        path: '/home',
        name: 'home',
        // eslint-disable-next-line no-undef
        component: Home
    },
    {
        path: '/export-excel',
        name: 'export-excel',
        // eslint-disable-next-line no-undef
        component: ExportExcel
    },
    {
        path: '/back-to-top',
        name: 'back-to-top',
        // eslint-disable-next-line no-undef
        component: BackToTop
    },

    {
        path: '/main',
        name: 'main',
        // eslint-disable-next-line no-undef
        component: Main
    }, {
        path: '/history',
        name: 'history',
        // eslint-disable-next-line no-undef
        component: History
    },
    {
        path: '/analysis',
        name: 'analysis',
        // eslint-disable-next-line no-undef
        component: Analysis
    },
    {
        path: '/setyuzhi',
        name: 'setyuzhi',
        // eslint-disable-next-line no-undef
        component: Setyuzhi
    },
    {
        path: '/setphone',
        name: 'setphone',
        // eslint-disable-next-line no-undef
        component: Setphone
    },
    {
        path: '/setting',
        name: 'setting',
        // eslint-disable-next-line no-undef
        component: Setting
    },
    {
        path: '/any',
        name: 'any',
        // eslint-disable-next-line no-undef
        component: Any
    },
    {
        path: '/usermanage',
        name: 'usermanage',
        // eslint-disable-next-line no-undef
        component: Usermanage
    },
    {
        path: '/helloworld',
        name: 'helloworld',
        // eslint-disable-next-line no-undef
        component: HelloWorld
    },
    {
        path: '/operation',
        name: 'operation',
        // eslint-disable-next-line no-undef
        component: Operation
    }
]

const router = new VueRouter({
    mode: 'history',
    routes

})

export default router