<template>
    App
    <p id="teleportWrap">
        使用teleport内置属性，将内容插入到这里
    </p>
    <div>app中sum的值：{{ sum }}</div>
    <Child ref="childRef" :msg="msg" @listen-child="getChildData" />
    <hr>
    <p>获取多个refs对象</p>
    <div v-for="item in itemRefs" :ref="setItemRef" :key="item"></div>
</template>

<script setup lang="ts">
import Child from './components/ChildComp.vue';
import { provide, ref, getCurrentInstance, onMounted, reactive} from 'vue';

let msg = '我是app传递的参数';
let sum = ref(0);
const itemRefs = reactive([] as any[]);

// 祖先组件注册provide向外暴露数据
provide('sum', sum);
function getChildData(data) {
    console.log('children', data)
}

onMounted(() => {
    // getCurrentInstance：该方法是获取当前组件的实例
    // const instance = getCurrentInstance();
    const { ctx } = getCurrentInstance() as any;
    console.log('ctx', ctx.$refs.childRef, ctx.$refs.childRef.address);
    // getCurrentInstance获取的实例中，有一个appContext属性，他表示的是 根app实例
    const appInstance = getCurrentInstance()?.appContext;
    const weather = appInstance?.config.globalProperties.weather;
    console.log('weather', weather);
})

function setItemRef(event) {
    if (event) {
        itemRefs.push(event);
    }
}
</script>

<style lang="less">
#app {
    padding: 20px;
}
</style>
