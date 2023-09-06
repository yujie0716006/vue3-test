<template>
    App
    <p id="teleportWrap">
        使用teleport内置属性，将内容插入到这里
    </p>
    <div>app中sum的值：{{sum}}</div>
    <Child :msg="msg" />
    </template>

    <script lang="ts">
    import Child from './components/ChildComp.vue';
    import {provide, ref} from 'vue';

    export default {
    name: 'App',
    components: {
        Child,
    },
    setup() {
        let msg = '我是传递的参数';
        let sum = ref(0);
        // 祖先组件注册provide向外暴露数据
        provide('sum', sum);
        return {
        msg,
        sum,
        }
    }
}
</script>

<style lang="less">
#app {
    padding: 20px;
}
</style>
