<template>
    <div class="child">
        child
        <p>{{props.msg}}</p>
        <p>子组件修改的数据内容：{{childData}}</p>
        <button @click="postParentData">点击listenChild</button>
        <Son @listen-child-change="getChildData"/>
        {{age}}
    </div>
</template>

<script setup lang="ts">
import Son from './GrandSon.vue';
import {ref, reactive, onMounted} from 'vue';
// 可以不用引入直接使用 defineProps 和 defineEmits 来接受 属性和事件
const props = defineProps({
    msg: String
})

const emit = defineEmits(['listenChild']);
const address = '北京疫情'
const personNum = 5000
let age: number|string = 22323;
age = '222'

// 当通过$refs获取实例时，子组件要使用 defineExpose 明确出暴露的属性
defineExpose({
    address,
    personNum
})

let childData = ref<string>('子组件修改');

onMounted(() => {
    // console.log('获取app实例', app)
})

function getChildData(data: string) {
    console.log('从子组件中获取的值', data);
    childData = ref(data);
    console.log(childData)
}

function postParentData() {
    emit('listenChild', '使用defineEmits暴露的方法')
}
</script>

<style lang="less" scoped>

.child {
    padding: 20px;
    background-color: aquamarine;
}
</style>
