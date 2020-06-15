import Vue from 'vue';
import 'src/styles/main.scss';
import App from 'src/components/App.vue';
import TSelect from 'src/components/t-select/TSelect.vue';
import TSwitch from 'src/components/t-switch/TSwitch.vue';

Vue.component('t-select', TSelect);
Vue.component('t-switch', TSwitch);

new Vue({
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    render: h => h(App),
}).$mount('#app');
