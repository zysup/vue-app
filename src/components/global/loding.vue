<template>
    <div>
        我是全局组件--加载中···
    </div>
</template>

<script>
    export default {
        name:'loding',
        created () {
            console.log('全局组件loding.vue加载 ');;
        },
        
    }
</script>

<style lang="scss" scoped>

</style>