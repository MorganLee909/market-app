<template>
    <notification-banner
        v-show="banner.displayed"
        :type="banner.type"
        :message="banner.message"
    ></notification-banner>

    <home-button></home-button>

    <div class="container">
        <h1>Vendors in your area:</h1>

        <h3>{{address}}</h3>

        <h2 v-if="vendors.length === 0">Sorry, no vendors were located in your area. Try increasing search distance.</h2>

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
import HomeButton from "../components/HomeButton.vue";

export default{
    components: {
        VendorSearchResult,
        HomeButton
    },

    data(){
        return {
            banner: {
                displayed: false,
                type: "",
                message: ""
            },
            vendors: [],
            address: ""
        }
    },

    created(){
        let address = this.$route.query.address.replaceAll("+", " ");
        this.searchVendors(address, this.$route.query.distance);
    },

    methods: {
        showBanner: function(type, message){
            this.banner.type = type;
            this.banner.message = message;
            this.banner.displayed = true;

            setTimeout(()=>{this.banner.displayed = false}, 5000);
        },
        searchVendors: function(address, distance){
            let formattedAddress = address.replaceAll(" ", "+");
            fetch(`http://localhost:8000/vendor/search?address=${formattedAddress}&distance=${distance}`)
                .then(r=>r.json())
                .then((response)=>{
                    if(typeof(response) === "string"){
                        this.showBanner("error", response);
                    }else{
                        this.vendors = response.vendors;
                        this.address = response.address;
                    }
                })
                .catch((err)=>{
                    this.showBanner("error", "Something went wrong. Try refreshing the page.");
                });
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
    font-size: 35px;
    text-align: center;
}

.container h2{
    font-size: 35px;
    color: red;
}

.container h3{
    margin-bottom: 35px;
}

@media screen and (max-width: 800px){
    .vendors{
        width: 100%;
    }
}
</style>