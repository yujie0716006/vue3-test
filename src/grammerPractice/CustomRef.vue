<template>
<!-- input框下面显示，处理输入框数据后的内容 -->
    <input type="text" v-model="search">
    <h2>{{search}}</h2>
    <button @click="changeSearchVal">改变输入框的值</button>
</template>

<script lang="ts" setup>
import {ref, customRef} from 'vue';

// let search = ref('');
// 自定义数据的处理函数，调用这个函数返回一个自定义的数据
function customRefFun(value, delay = 500) {
    let timer = 0;
    // 返回一个自定义customRef数据
    // return customRef((track, trigger) => {
    return customRef((track, trigger) => {
        // customRef内部返回一个对象，里面有get,set属性
        return {
            get() {
            // 告诉vue追踪数据
            track();
            return value;
            },
            set(newValue) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    value = newValue;
                    // 告诉vue更新模版
                    trigger();
                }, delay)
            }
        }
    })
}

let search = customRefFun('init', 1000);

function changeSearchVal() {
    search.value = '更改的值';
}
</script>

<style lang='less' scoped>
</style>