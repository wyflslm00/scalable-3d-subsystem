import Vue from "vue";
import App from "./App.vue";
import router from "../src/router/index";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import "@/styles/index.scss"; // global css

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
