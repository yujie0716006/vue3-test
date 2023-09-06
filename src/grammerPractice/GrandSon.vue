<template>
    <div class="grand_son">
        son
        <h4>通过inject获取的数据：{{sum}}</h4>
        <button @click="sum++">son组件点击+1</button>
        <button @click="postParentParams">点击传递向父组件传参数</button>
        <modal-comp/>
    </div>
</template>

<script lang="ts">
import {inject, ref} from 'vue';
import ModalComp from './ModalComp.vue';
export default {
    name: "GrandSon",
    // props: {
    //     listenChildChange: Function,
    // },
    components: {
        ModalComp,
    },
    setup(prop, context) {
        console.log('context', context);
        // 后代组件通过inject获取到上代的数据
        let sum = inject('sum');

        function postParentParams() {
            context.emit('listenChildChange', '我是从孙子组件传过来的参数');
        }
        return {
            sum,
            postParentParams,
        }
    }
};
</script>

<style lang="less" scoped>
.grand_son {
    padding: 20px;
    background-color: blueviolet;
}
</style>