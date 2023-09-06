<template>
    <h2>num:{{num}}</h2>
    <button @click="addNum">点击num++</button>
    <hr>
    <h2>
        人物的基本信息： {{person.name}} - {{person.age}} -- {{person.address.area}}
    </h2>
    <div>
        <button @click="changePersonMsg">修改人物信息</button>
    </div>
    <hr>
    <h2>组合名字：{{firstName}} --- {{lastName}}</h2>
    <button @click="changeComName">点击更改组合名</button>
    <hr>
    <h2>数组的值：{{arr.list}}</h2>
    <button @click="changeArrValue">更改数组的值</button>
</template>

<script lang="ts" setup>
import {ref, watchEffect, reactive, watch} from 'vue';
// import cloneDeep from 'lodash/cloneDeep';
let num = ref(0);
let person = reactive({
    age: 10,
    name: 'tom',
    address: {
        area: '北京'
    }
})
let firstName = ref('小')
let lastName = ref('明')
// 如果使用的是ref设置数据，更改数组可以更新视图
// 如果使用reactive设置数组，更改数据会变，但是视图不更新
let arr = reactive({list: [1, 2, 3]});

// watchEffect初始化时就会自调用一次，之后会监听里面函数的值，会监听里面所有的值，只要其中有一个变化了，就会执行这个函数
/* watchEffect(() => {
    console.log('watchEffect,num', num.value);
    console.log('watchEffect', person, person.age)
}) */

// 监听 ref 定义的数据，单个数据源
watch(num, (value, newValue) => {
    console.log('value,newValue', value, newValue);
})

// 监听 reactive 定义的数据，单个数据源。存在问题：监听reactive定义的对象时，新老value值是一样的，都是最新的值，没办法获取到上一次的值
/* watch(person, (value, newValue) => {
    console.log('person', value, newValue);
}) */

// 监听 ref 定义数据，多个数据源；多个ref组成的数据，要将他们组合成数组，进行监听
watch([firstName, lastName], (val, newVal) => {
    console.log('ref定义的多个数据源', val, newVal);
})
/*
监听对象 如果是多层嵌套关系的对象需要深度监听，则必须使用 deep: true,返回的值还是只会返回新的值
监听对象或是数组时，为了得到一个新的值和上一个状态值的引用，我们可以创建一个新的副本，我们监听这个副本就可以得到新旧两个值。数组用解构 [...arr]， 对象可以使用cloneDeep克隆一个对象副本
*/
// watch(() => [...arr.list], (val, newVal) => {
// watch(() => person, (val, newVal) => {
/* watch(() => cloneDeep(person), (val, newVal) => {
    // console.log('arr.address', val.address, newVal.address);
    console.log('person.list', val, newVal);
}, {deep: true}) */

function changeArrValue() {
    // arr.list = [];
    // arr.list.push(999);
    // person.name = '我更改对象';
    person.address.area = '河南';
}

function addNum() {
    num.value = num.value + 1;
}

function changePersonMsg() {
    person.age = person.age + 5;
    person.name = person.name + '!';
}

function changeComName() {
    firstName.value = '更改';
    lastName.value = '名字';
}
</script>

<style lang='less' scoped>
</style>