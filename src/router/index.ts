import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';

const LayoutView = () => import('../LayoutView.vue');

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'layoutView',
        component: LayoutView,
        children: []
    },
]

// 创建vuerouter实例
const router = createRouter({
    // history的实现模式，这里使用hash模式
    history: createWebHashHistory(),
    routes,
})

export default router;