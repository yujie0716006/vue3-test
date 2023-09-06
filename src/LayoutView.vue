<template>
    <el-button type="primary">Primary</el-button>
    <el-switch v-model="switchVal" />
    <el-checkbox v-model="switchVal" label="Option 1" size="large" />
    <div>num: {{num}}</div>
    <div v-for="item in list.arr" :key="item">{{item}}</div>
    <button @click="changeArr">修改数组</button>
</template>

<script lang="ts" setup>
// import {$ref} from 'vue/macros';
import add from 'lodash/add'
console.log('lodash add', add(5, 6))
let num = $ref(5);
let age = ref(10);
let switchVal = ref(true);
let list = reactive({
    arr: [1, 2, 3, 4]
})

onMounted(() => {
    console.log('app.context是根实例', getCurrentInstance())
    console.log('num', num);
    console.log('$num', $$(num));
    console.log('age', age);
});

// 数组使用副本，才可触发
/* watch(() => [...list.arr], (val, newVal) => {
    console.log('list,arr', val, newVal);
}) */
// ref定义的值是RefImpl类型的，如果使用的 $ref定义的值，输出的是value的值，所以可以直接修改。但是在使用watch等需要监听的数据时，只监听value是不生效的，所以要使用 $$ 他是ref转换宏，将变量转换成底层ref
watch($$(num), (val, newVal) => {
    console.log(val, newVal);
})

function changeArr() {
    num++
    // list.arr.push(999);
}
</script>

<style lang='less' scoped>
</style>