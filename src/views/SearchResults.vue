<template>
    <notification-banner
        v-show="banner.displayed"
        :type="banner.type"
        :message="banner.message"
    ></notification-banner>

    <div class="container">
        <h1>Vendors in your area</h1>

        <div class="vendors">
            <vendor-search-result
                v-for="(vendor, i) in vendors"
                :key="i"
                :vendor="vendor"
            ></vendor-search-result>
        </div>
    </div>
</template>

<script>
import VendorSearchResult from "../components/VendorSearchResult.vue";

export default{
    components: {VendorSearchResult},

    data(){
        return {
            banner: {
                displayed: false,
                type: "",
                message: ""
            },
            vendors: []
        }
    },

    created(){
        fetch(`http://localhost:8000/vendor/search?address=${this.$route.query.address}&distance=${this.$route.query.distance}`)
            .then(r=>r.json())
            .then((response)=>{
                if(typeof(response) === "string"){
                    this.showBanner("error", response);
                }else{
                    this.vendors = response;
                }
            })
            .catch((err)=>{
                this.showBanner("error", "Something went wrong. Try refreshing the page.");
            });
    },

    methods: {
        showBanner: function(type, message){
            this.banner.type = type;
            this.banner.message = message;
            this.banner.displayed = true;

            setTimeout(()=>{this.banner.displayed = false}, 5000);
        }
    }
}
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    padding-top: 35px;
    background: var(--primaryColor);
}

.container h1{
    margin-bottom: 35px;
    font-size: 35px;
}
</style>