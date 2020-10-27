<template>
  <div id="helloword">
    <child1
      :string1_.sync="string1"
      :string2_="string2"
      string3="鼠标"
      v-bind="benz_car"
      v-bind.sync="zhangsan"
      :zhangsan="zhangsan"
      v-on:test1="onTest1"
      v-on:test2="onTest2"
      :arr1="arr1"
    ></child1>
    <div :title="string1">string1==>{{ string1 }}</div>
    <div>string2==>{{ string2 }}</div>
    <div>string3==>{{ string3 }}</div>
    <div>zhangsan==>{{ zhangsan }}</div>
    <div>number1==>{{ number1 }}</div>
    <div>$data.string1==》{{ $data.string1 }}</div>
    <div>arr1==>{{ arr1 }}</div>
    <p class="child-1">
      <button @click="test('123')">测试</button>
      <button @click="change_arr">改变arr1</button>
      <input @keydown="submit($event)" id="keywords" v-if="showit" />
      <BUTTON @click="showsou">显示input</BUTTON>
    </p>
  </div>
</template>

<script>
/* eslint-disable */

import child1 from './child1.vue';
export default {
  name: 'hello_world',
  data() {
    return {
      string1: '电脑',
      string2: '手机',
      benz_car: {
        model: 'S600',
        price: 1000000,
        color: 'black',
      },
      zhangsan: {
        gender: 'male',
        age: 18,
        hobby: ['run', 'swiming'],
        assets: {
          car: 2,
          house: 1,
        },
      },
      number1: 4,
      showit: false,
      arr1: [1, 2, 3],
      match_type: window.matchMedia('(min-width:400px)'),
      // match_type: 999,
    };
  },
  components: { child1 },
  created() {
    this.string3 = '显示器';
    // this.zhangsan.language = "english";
    // console.log('helloword.vue==>created');

    this.match_type.addListener(this.mqCallback);
  },
  mounted() {
    console.log('helloword.vue==>mounted');

    this.string3 = '显示器2'; //在mounted里面定义数据会报错，但是也会生效，不会触发数据渲染
    if (this.string3 == '显示器2') {
      console.log('改变了string3');
    }
    // this.$forceUpdate();
    // this.zhangsan.language = "english";
    // console.log(this);
    // console.log(this.$data.string1);
    // console.log(this.$el.textContent);
    setTimeout(() => {
      // this.number1 = 3;
      this.string3 = "液晶显示器";  //未定义到data上，没法更新
      this.$forceUpdate()
      // this.zhangsan.age = 92; //可以用深度监听到对象变化，但是新旧值还是一样
      // this.zhangsan.assets.car = 1; //可以用深度监听到对象变化，但是新旧值还是一样
      // this.zhangsan.language = 'chinese';   //无法检测到对象新增的属性
      // this.$set(this.zhangsan,'language','chinese');  //可以检测到对象的新增属性，但是新旧值还是一样
      // this.$set(this.zhangsan,'age2',92);  //可以用深度监听到对象变化，但是新旧值还是一样
      // this.zhangsan.hobby.push('study') //可以监听数组的长度
      // this.zhangsan.hobby=[] //可以监听数组的长度
      // this.zhangsan = Object.assign({}, this.zhangsan, { age: 92 });
      // this.zhangsan={...this.zhangsan,age:30}
      // this.zhangsan = { ...this.zhangsan, hobby: [] };
      // this.$forceUpdate();
    }, 5000);
  },

  watch: {
    zhangsan(new_, old_) {
      console.log(JSON.stringify(new_), JSON.stringify(old_));
    },
    // zhangsan: {
    //   // 除非用 = 赋值，否则无法监听内部值的变化
    //   handler(newValue, oldValue) {
    //     console.log(
    //       JSON.stringify(newValue, null, 2),
    //       JSON.stringify(oldValue, null, 2)
    //     );
    //   },
    //   deep: true,
    // },
    'zhangsan.hobby.length'(new_, old_) {
      console.log(JSON.stringify(new_, null, 2), JSON.stringify(old_, null, 2));
    },
    'zhangsan.hobby'(new_, old_) {
      console.log(JSON.stringify(new_, null, 2), JSON.stringify(old_, null, 2));
    },
    'zhangsan.assets'(new_, old_) {
      console.log(JSON.stringify(new_, null, 2), JSON.stringify(old_, null, 2));
    },
    arr1: {
      //除非用 = 赋值，否则无法监听内部值的变化
      // handler(newValue, oldValue) {
      //   console.log(newValue, oldValue);
      // },
      // deep: true,
    },
    arr1(newValue, oldValue) {
      //除非用 = 赋值，否则无法监听内部值的变化
      console.log(newValue,oldValue);
    },
    // number1: "change_fn",
    number1: {
      handler: 'change_fn',
      immediate: true,
    },
  },
  methods: {
    mqCallback() {
      if (this.match_type.matches) {
        console.log('视口不小于400px');
      } else {
        console.log('视口小于400px');
      }
    },
    onTest1(value) {
      console.log('来自child1的事件==》%s', value);
    },
    onTest2(new_, old_) {
      console.log('来自child2的事件');
    },
    change_fn(new_, old_) {
      console.log(new_, old_);
    },
    submit(e) {
      console.log(e.target);
      console.dir(e.target);
      console.log(e.target.value);
    },
    showsou() {
      this.showit = true; //修改 v-show
      // console.log(document.getElementById("keywords"))
      // document.getElementById("keywords").focus(); //在第一个 tick 里，获取不到输入框，自然也获取不到焦点
      // document.getElementById("keywords").style.height = "35px"
      this.$nextTick(function () {
        // DOM 更新了
        document.getElementById('keywords').focus();
      });
    },
    change_arr() {
      this.arr1[2] = 4;  //错误写法,不会触发数据重新渲染
      // this.$forceUpdate()
      // this.arr1.pop()
      this.$set(this.arr1, 2, 4);
      // this.arr1.splice(2,1,4)
      // this.arr1 = Object.assign([], this.arr1, [1, 2, 4]); //会触发数据重新渲染,触发监听
      // this.arr1 = [1,2,4]  //会触发数据重新渲染,触发监听
      console.log(this.arr1);
    },
  },
  beforeDestroy() {
    this.match_type.removeListener(this.mqCallback);
    console.log('helloword.vue==>beforeDestroy');
  },
  destroyed() {
    console.log('helloword.vue==>destroyed');
  },
};
</script>



<style scoped>
#helloword {
  background-color: #f8f8f8;
}
</style>
