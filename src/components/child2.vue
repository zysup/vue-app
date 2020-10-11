<template>
    <div class="child-2">
        <h2>我是child2组件</h2>
        <p class="boss">$attrs==>{{$attrs}}</p>
        <p>$attrs.string2_==>{{$attrs.string2_}}</p>
        <p>$attrs.string3==>{{$attrs.string3}}</p>
        <loding></loding>
        <img src="../../statics/b/animal02.jpg" alt="" srcset="" style="width:30px;">
        <img src="../../statics/b/animal03.jpg" alt="" srcset="" style="width:30px;">
        <dialog-box name_="lisi"></dialog-box>
    </div>
</template>
<script>
/* eslint-disable */

export default {
    name:'child2',
    props: [],
    data() {
        return {};
    },
    // inheritAttrs: false,
    mounted() {
        this.$emit('test2');
    },
    watch: {
        "$attrs.name2"(){
        }
    },
    destroyed() {
    },
};
</script>
<style scoped>
    .child-2{
        border:1px solid blue;
        margin: 5px;
    }
</style>
