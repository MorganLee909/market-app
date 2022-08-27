import {createApp} from "vue";
import App from "./App.vue";
import router from "./router.js";

import VendorRegister from "./components/VendorRegister.vue";
import VendorLogin from "./components/VendorLogin.vue";
import NotificationBanner from "./components/NotificationBanner.vue";

const app = createApp(App);

app.use(router);

app.component("vendor-register", VendorRegister);
app.component("vendor-login", VendorLogin);
app.component("notification-banner", NotificationBanner);

app.mount("#app");