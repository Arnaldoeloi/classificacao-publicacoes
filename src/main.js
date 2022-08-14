import { createApp } from 'vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";



import App from './App.vue'

// import vSelect from 'vue-select'

const app = createApp(App)

app.use(Toast, []);
// app.component("v-select", vSelect);

app.mount('#app')
    // .component('v-select', vSelect);


