<template>
    <notification-banner
        v-show="banner.displayed"
        :type="banner.type"
        :message="banner.message"
    ></notification-banner>
    <h1>Search Results</h1>

    <div class="vendors">
        <h1 v-for="(vendor, i) in vendors" :key="i">{{vendor.name}}</h1>
    </div>
</template>

<script>
export default{
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
body{
    background: var(--darkBrown);
}
</style>