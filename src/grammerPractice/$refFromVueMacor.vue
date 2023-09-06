<template>
    <div>
        <h2>ref定义num: {{num}}</h2>
        <h2>$ref定义age: {{age}}</h2>
        <h2>ref定义数组: {{arr}}</h2>
        <h2>$ref定义数组: {{arr2}}</h2>
        <button @click="addNum">num++</button>
    </div>
</template>

<!-- 可以多些一个script标签用来写name -->
<script>
export default {
    name: 'RefFormVueMacor'
}
</script>
<!-- 直接使用setup语法糖，是没有办法设置组件的name的 -->
<script lang="ts" setup>
import {ref} from 'vue';
import {$ref} from 'vue/macros';
let num = ref(0);
let age = $ref(0);
let arr = ref([1, 3, 4]);
let arr2 = $ref([1, 3, 4]);
function addNum() {
    num.value = num.value + 1;
    age = age + 10;
    // arr.value.push(5);
    arr2 = [];
    console.log('arr.value', arr);
}

</script>

<style lang='less' scoped>
</style>