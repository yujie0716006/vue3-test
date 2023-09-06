<template>
    <p>
        <button @click="modalShow = true">点击显示弹窗</button>
    </p>
    <teleport to="#teleportWrap">
        <div class="modal" v-if="modalShow">
        <div>我是弹窗要显示的内容</div>
        <button @click="modalShow = false">关闭弹框</button>
    </div>
    </teleport>
</template>

<script lang="ts">
import {ref} from 'vue';
export default {
    name: 'ModalComp',
    setup() {
        let modalShow = ref(false);
        return {
            modalShow,
        }
    }
}
</script>

<style lang="less" scoped>
.modal {
    margin-top: 30px;
    width: 300px;
    height: 200px;
    background-color: darkslategray;
    padding: 30px;
    text-align: center;
    button {
        margin-top: 30px;
    }
}
</style>