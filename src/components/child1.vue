<template>
  <div class="child-1">
    <h3>我是child1组件</h3>
    <p class="blue_">
      props:<br />
      {{ 'string1_==>' + string1_ }}<br />
      {{ 'arr1==>' + arr1 }}
    </p>
    <p class="blue_ fontSize12">$attrs==>{{ $attrs }}</p>
    <hr />
    <ul>
      <!-- <li v-for="item in arr1" :key="item" v-once>{{item}}</li>
      <li v-for="item in arr1" :key="item" v-pre>{{item}}</li> -->
      <!-- <li v-for="item in arr1" :key="item">{{item}}</li> -->
      <li v-for="item in arr2" :key="item">{{ item }}</li>
    </ul>
    <hr />
    <child2
      v-bind="$attrs"
      v-on="$listeners"
      v-on:test2="onTest2"
      v-if="show"
      :class="'child_2box'"
      @hook:mounted="child2_m"
    ></child2>
    <button @click="show = !show">{{ show_text }}</button>
    <button @click="test_event(456)">触发根实例上监听的事件</button>
  </div>
</template>
<script>
/* eslint-disable */

import child2 from './child2.vue';
export default {
  name: 'child1',
  props: {
    arr1: {
      type: Array,
    },
    string1_: {
      type: String,
      default: '我是string1_的默认值',
    },
    zhangsan:{
      type:Object,
    }
  },
  data() {
    return {
      show: false,
      arr2: this.arr1,
    };
  },
  // inheritAttrs: false,
  computed: {
    show_text() {
      return this.show ? '关闭child2' : '打开child2';
    },
    arr1_2() {
      return this.arr1[2];
    },
  },
  components: { child2 },
  created() {
    console.log('child1.vue==>created');
  },
  mounted() {
    console.log('child1.vue==>mounted');
    this.$emit('test1', '啦啦啦···');
    setTimeout(() => {
      // this.string1_=30000;  //报错
      // this.$emit("update:string1_", "白色的电脑");
      // this.$set(this.arr1,3,5)
      this.$attrs.string2_ = '大手机'; //无效，不报错
    }, 5000);
  },
  watch: {
    arr1: {
      //除非用 = 赋值，否则无法监听内部值的变化
      handler(newValue, oldValue) {
        console.log(JSON.stringify(newValue), JSON.stringify(oldValue));
      },
      deep: true,
    },
    // arr1(newValue,oldValue){   //除非用 = 赋值，否则无法监听内部值的变化
    //   console.log(newValue,oldValue);
    // }
    'arr1.length'(newValue, oldValue) {
      //监听数组长度变化
      console.log(newValue, oldValue);
    },
    // "arr1[2]"(newValue, oldValue) {    //错误写法
    //   console.log(newValue, oldValue);
    // },
    arr1_2(newValue, oldValue) {
      //映射成计算属性，再监听
      console.log(newValue, oldValue);
    },
    zhangsan(){
      console.log('qwe张三改变了');
    }
  },
  methods: {
    onTest2() {
      console.log('来自child2的事件');
    },
    test_event(value) {
      this.$root.$emit('event_change', value);
    },
    child2_m() {
      // console.log('child2挂载！');
    },
  },
  beforeDestroy() {
    console.log('child1.vue==>beforedestory');
  },
  destroyed() {
    console.log('child1.vue==>destory');
  },
};
</script>
<style scoped>
[age='18'] {
  color: #666;
}
.child-1 {
  border: 1px solid green;
  margin: 5px;
}
</style>
<style scoped>
.child-1 {
  font-style: italic;
  /* text-shadow: 0 0 5px #000; */
}

.child-1 /deep/ .child-2 {
  font-style: italic;
  color: green;
}
</style>
<style>
ul,
p,
li {
  margin: 0;
}
body {
  border: 1px solid red;
}
</style>
