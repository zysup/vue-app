<template>
  <div>
      我是全局组件--你好 {{name_}}
  </div>
</template>

<script>
export default {
    props:{
        name_:{
            type:String,
            default:'zhangsan'
        }
    }

}
</script>

<style>

</style>