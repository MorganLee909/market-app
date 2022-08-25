import {createApp} from "vue";
import App from "./App.vue";
import router from "./router.js";

import VendorRegister from "./components/VendorRegister.vue";
import NotificationBanner from "./components/NotificationBanner.vue";

const app = createApp(App);

app.use(router);

app.component("vendor-register", VendorRegister);
app.component("notification-banner", NotificationBanner);

app.mount("#app");