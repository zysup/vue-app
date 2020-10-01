export default {
    install(Vue) {
        Vue.component('loding', () => import('./loding.vue'));
        Vue.component('dialogBox', () => import('./dialogBox.vue'));
    }
};