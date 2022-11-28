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

        <div class="search">
            <search-bar
                @banner="showBanner"
            ></search-bar>

            <button class="actionButton" @click="searchAgain">Search Again</button>
        </div>


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
import SearchBar from "../components/SearchBar.vue";

export default{
    components: {
        VendorSearchResult,
        HomeButton,
        SearchBar
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
        fetch(`http://localhost:8000/vendor/search?address=${this.$route.query.address}&distance=${this.$route.query.distance}`)
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
    },

    methods: {
        searchAgain: function(){
            let address = this.$refs.address.value;
            let distance = this.$refs.distance.value;
            let unit = this.$refs.unit.value;

            if(address === ""){
                this.showBanner("error", "Address bar cannot be empty");
                return;
            }

            switch(unit){
                case "km": distance *= 1000; break;
                case "mi": distance *= 1609.34; break;
            }

            address = address.replaceAll(" ", "+");
            this.$router.push({
                path: "/search",
                query: {
                    address: address,
                    distance: distance
                }
            });
        },
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

.search{
    display: flex;
    align-items: center;
}

@media screen and (max-width: 800px){
    .vendors{
        width: 100%;
    }
}
</style>