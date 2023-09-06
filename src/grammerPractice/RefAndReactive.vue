<template>
    <p>{{num}}</p>
    <p>{{state.age}}</p>
    <p>{{address}}</p>
    <button @click="addNum">点击修改num</button>
    <p>将数据都定义到data中的展示</p>
    <div>{{data.state.age}}</div>
    <div>{{data.state.count}}</div>
    <div>{{data.gender}}</div>
    <div>{{data.weather}}</div>
    <p>使用toRefs将data中的数据解构出来，可以直接使用</p>
    <div>{{state.age}}</div>
    <div>{{state.count}}</div>
    <div>{{gender}}</div>
    <div>{{weather}}</div>
</template>

<script lang="ts" setup>
import {ref, reactive, toRef, toRefs} from 'vue';

let num = ref(0);
let address = ref('北京');
// let state = reactive({age: 0, count: 10,});
// 将变量都定义到data里面，然后再使用 toRefs 将它解构出来，可以直接使用
const data = reactive({
    state: {age: 0, count: 10},
    gender: '女',
    weather: '晴天',
})
const {state, gender, weather} = toRefs(data);
console.log('state.value', state.value);

/*
toRef的用法：使用 reactive 定义的对象，可以用 toRef 将对象中的某一个属性设置为响应式的变量。当使用这个 变量.value 修改这个值的时候，
对应 原本对象的属性的值也会响应的变化，保持对原来属性的 响应式连接
如果定义的是一个对象，那么在使用 toRefs 时，对象将解构成 objectRef 的格式，所有在更改数据时要使用 .value 来变更
*/
const countRef = toRef(state.value, 'count');
console.log('countRef', countRef.value)

function addNum() {
    num.value = 99;
    address.value = '上海';
    countRef.value++
    console.log('countRef', state.value.count);
    state.value.count++;
    console.log('state.count', state.value.count);
}

</script>

<style lang='less' scoped>
</style>