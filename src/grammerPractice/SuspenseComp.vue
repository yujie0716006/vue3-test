<template>
    <div>
        使用supspense异步语法的内容
        <p>suspense中包含的是需要异步加载的内容</p>
        <p>#default里是需要展示的内容；#fallback是如果异步的组件还没有加载完成的提示。当异步组件加载完成时，就会展示出default中的内容</p>
        <suspense>
            <template #default>
                <async-comp />
            </template>
            <template #fallback>
                <div>
                    正在加载中，，，，
                </div>
            </template>
        </suspense>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
// 被引入的组件是异步组件，使用defineAsyncComponent来引入，只有在需要时才会异步加载的组件
const AsyncComp = defineAsyncComponent(() => import('@/components/AsyncComp.vue'))
export default {
    name: 'SuspenseComp',
    components: {
        AsyncComp,
    }
}
</script>

<style scoped>
</style>