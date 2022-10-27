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
            path: "/search",
            name: "results",
            query: {
                address: "address",
                distance: "distance"
            },
            component: ()=>import("./views/SearchResults.vue")
        },
        {
            path: "/:pathMatch(.*)*",
            name:"vendor",
            component: ()=>import("./views/VendorPage.vue")
        }
    ]
});

export default router;