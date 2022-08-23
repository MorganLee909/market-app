import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "landing",
            component: ()=>import("./views/LandingPage.vue")
        },
        {
            path: "/second",
            name: "second",
            component: ()=>import("./views/SecondPage.vue")
        },
        {
            path: "/vendor",
            name: "vendor",
            component: ()=>import("./views/VendorPage.vue")
        }
    ]
});

export default router;