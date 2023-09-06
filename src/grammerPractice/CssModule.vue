<template>
<!-- <style scoped module> 默认$style的变量-->
    <!-- <p :class="$style.success">css样式的特性</p> -->

    <!-- <style scoped module="customStyle"> 自定义注入类对象，所有的style的属性都绑定到自定义名字的变量上面 -->
    <p :class="customStyle.error">使用自定义命名的class的名字</p>
</template>

<script>
import {h, useCssModule, reactive} from 'vue';
import {useRoute} from 'vue-router';
export default {
    name: 'CssModule',
    setup() {
        // 使用渲染函数 使用css模块
        const style = useCssModule();
        const $route = useRoute();
        console.log('接收的路由参数', $route.query);

        const theme = reactive({
            fontSize: '25px',
            color: 'green',
        })

        return {
            theme
        }
        // 使用 h 函数
        // return () => {
        //     return h('div', [
        //         h('p', {class: style.success}, '渲染第一个元素'),
        //         h('p', {class: style. error}, '渲染第二个元素')
        //     ])
        // }
    }
}
</script>

<!-- 使用 v-bind(xx.yy)直接可以使用 -->
<!-- <style lang="less" scoped > -->
<!-- 如果使用 css module形式 动态绑定就不生效， module是默认一个$style的变量 -->
<!-- <style lang="less" scoped module> -->
<style lang="less" scoped module="customStyle">
// 通过 :global设置全局样式
:global(p) {
    color: black;
}
:global(div) {
    color: black;
}
// css-style使用v-bind动态的绑定样式
.css_style {
    color: v-bind('theme.color');
    font-size: v-bind('theme.fontSize');
}
.success{
    color: green;
    font-size: 20px;
}
.error {
    color: red;
}
</style>