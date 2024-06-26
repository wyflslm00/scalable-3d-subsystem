import Vue from "vue";
import App from "./App.vue";
import router from "../src/router/index";
import axios from "axios";

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
