<template>
  <div class="boss" ref="boss_app" :key="appkey">
    <h4 class="abc">
      我是最外层的App (紫色边)我的key是：{{appkey | foremat_key   }}key的双倍是：{{ double_key }}
    </h4>

    <img :src="imgurl_" style="width: 30px; height: 30px" @error="imgerror"/>
    <img src="../statics/b/animal03.jpg" style="width: 30px; height: 30px" />
    <img src="../statics/b/animal02.jpg" style="width: 30px; height: 30px" />
    
    <loding v-if="false"></loding>
    <dialog-box name_="lisi"></dialog-box>
    <button @click="appkey++">改变appkey</button>
    <button @click="shake">震动</button>
    <!-- <button @click="test_event(123)">触发监听的事件</button> -->
    <!-- <button @click="test_event2('abc')">触发EventBus监听的事件</button> -->
    <button @click="change_color">换肤-红色</button>
    <button @click="change_color2">换肤-正常</button>
    <BUTTON @click="change_style">换肤-切换</BUTTON>
    <HelloWorld msg="Welcome to Your Vue.js App" :random="random"/>

    <style-component v-if="style_normal"></style-component>
    <!-- <style-component v-show="style_normal"></style-component> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import styleComponent from "./components/StyleComponemt.vue";

export default {
  name: "app",
  components: {
    styleComponent,
    HelloWorld,
  },
  data() {
    return {
      style_normal: false,
      appkey: 0,
      random:0
    };
  },
  computed: {
    double_key() {
      console.log("appkey的计算属性触发");
      return this.appkey * 2;
    },
  },
  created() {
    console.log("app.vue==>created");
    setInterval(() => {
      // this.random=Math.floor(Math.random()*100)
    }, 2000);
  },
  mounted() {
    console.log("app.vue==>mounted");
    //监听断网
    window.addEventListener("offline", this.offlineHandler);
    this.$root.$on("event_change", (value) => {
      alert("监听的事件被触发" + value);
    });

    console.log("qwe", sessionStorage.name);
    sessionStorage.name = "zhangsan";
  },
  methods: {
    imgerror(){
      console.log('img加载失败！');
    },
    imgurl_() {
      // return "../statics/b/animal02.jpg?timestemp=" + Math.random();
      return "../statics/b/animal02.jpg";
    },
    offlineHandler(vd) {
      navigator.vibrate(1000);
      alert("断网了");
    },
    shake() {
      navigator.vibrate(1000);
    },
    test_event(value) {
      this.$root.$emit("event_change", value);
    },
    change_color() {
      //不生效？？？
      let mysty = document.getElementById("red_sty");
      if (!mysty) {
        let sty = document.createElement("link");
        sty.href = "./css/global.css";
        sty.id = "red_sty";
        sty.rel = "stylesheet";
        sty.type = "text/css";
        document.head.appendChild(sty);
      }
    },
    change_color2() {
      //不生效？？？
      let sty = document.getElementById("red_sty");
      sty && sty.remove();
    },
    change_style() {
      this.style_normal = !this.style_normal;
      // this.$refs.boss_app.classList.toggle("boss");
    },
  },
  filters: {
    foremat_key(value) {
      console.log("我是计算key的filter");
      return value;
    },
  },
  beforeDestroy() {
    
    console.log("%capp.vue将要销毁", "color:red;");
  },
};
</script>

<style>
/* @import url(./css/global.css); */
</style>
<style>
:root {
  --main-color: red;
}
.boss {
  border: 5px dotted indigo;
}
.boss /deep/ #app {
  color: var(--main-color);
}
</style>
