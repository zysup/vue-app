<template>
  <div></div>
</template>
<script>
export default {
  created() {
    console.log("%cstyleComponent==>created",'color:red;');
  },
  mounted () {
    console.log("%cstyleComponent==>mounted",'color:red;');
  },
  beforeDestroy () {
      console.log("%cstyleComponent==>beforedestoryed",'color:red;');
  },
  destroyed () {
    console.log("%cstyleComponent==>destoryed",'color:red;');
  },
};
</script>
<style>
@import url(../css/global.css);
</style>