<template>
    <notification-banner
        v-show="banner.displayed"
        :type="banner.type"
        :message="banner.message"
    ></notification-banner>

    <home-button id="homeButton"></home-button>

    <div class="container">
        <h1>Vendors in your area:</h1>

        <h3>{{address}}</h3>

        <div class="search">
            <search-bar
                id="searchBar"
                ref="searchBar"
                @search="search"
            ></search-bar>

            <button class="actionButton" @click="this.$refs.searchBar.search">Search Again</button>
        </div>

        <h2 v-if="vendors.length === 0">{{noVendorsText}}</h2>

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
            address: "",
            noVendorsText: "Searching..."
        }
    },

    created(){
        this.search(
            this.$route.query.address,
            this.$route.query.distance,
            null
        );
    },

    methods: {
        search: function(address, distance, unit){
            this.noVendorsText = "Searching..."
            if(address === ""){
                this.showBanner("error", "Address bar cannot be empty");
                return;
            }
            address = address.replaceAll(" ", "+");
            if(unit){
                switch(unit){
                    case "km": distance *= 1000; break;
                    case "mi": distance *= 1609.34; break;
                }
            }

            fetch(`http://localhost:8000/vendor/search?address=${address}&distance=${distance}`)
                .then(r=>r.json())
                .then((response)=>{
                    if(typeof(response) === "string"){
                        this.showBanner("error", response);
                    }else{
                        this.vendors = response.vendors;
                        this.address = response.address;
                        if(this.vendors.length === 0) this.noVendorsText = "Sorry, no vendors were located in your area. Try increasing search distance.";
                    }
                })
                .catch((err)=>{
                    this.showBanner("error", "Something went wrong. Try refreshing the page.");
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
    margin-top: 100px;
}

.container h3{
    margin-bottom: 35px;
    text-align: center;
}

.search{
    display: flex;
    align-items: center;
}

.vendors{
    min-width: 750px;
}

@media screen and (max-width: 850px){
    .vendors{
        width: 100%;
        min-width: 0;
    }

    .search{
        flex-direction: column;
    }

    .container h3{
        margin-bottom: 10px;
    }

    #searchBar{
        padding: 0;
    }
}

@media screen and (max-width: 550px){
    #homeButton{
        top: 15px;
        left: 15px;
    }
    .container h1{
        margin-top: 20px;
    }
}
</style>