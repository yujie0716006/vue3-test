<template>
    <div>
        我是返回内容为异步的组件
    </div>
</template>

<script>
export default {
    name: 'AsyncComp',
    async setup() {
        const timer = await setTimeout(() => {
            console.log('等待一秒后返回');
        }, 1000)
        return {
            timer,
        }
    },
}
</script>

<style lang='stylus' scoped>
</style>