import { createApp } from 'vue'
import App from './App.vue'

import "reset.css";
import "tdesign-vue-next/es/style/index.css";
import "./styles/global.scss";

const app = createApp(App);
app.mount("#app");