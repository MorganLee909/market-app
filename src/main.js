import {createApp} from "vue";
import App from "./App.vue";
import router from "./router.js";

import VendorRegister from "./components/VendorRegister.vue";

const app = createApp(App);

app.use(router);

app.component("vendor-register", VendorRegister);

app.mount("#app");