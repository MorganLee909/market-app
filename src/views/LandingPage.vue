<template>
    <div class="landingPage">
        <vendor-register
            v-if="modals.vendorReg"
            @closeModal="closeModal"
            @banner="showBanner"
        ></vendor-register>

        <vendor-login
            v-if="modals.vendorLogin"
            @closeModal="closeModal"
            @banner="showBanner"
            @register="displayRegister"
        ></vendor-login>

        <notification-banner
            v-show="banner.displayed"
            :type="banner.type"
            :message="banner.message"
        ></notification-banner>

        <button class="vendEnter login" @click="displayLogin">Vendor Access</button>

        <h1>My Village Market</h1>

        <search-bar
            @banner="showBanner"
        ></search-bar>

        <button class="actionButton" @click="search">FIND LOCAL</button>

        <p>Shop Local</p>

        <p>Buy Local</p>
    </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";

export default {
    data(){
        return {
            modals: {
                vendorReg: false,
                vendorLogin: false
            },
            banner: {
                displayed: false,
                type: "",
                message: ""
            }
        }
    },

    components: {SearchBar},

    methods: {
        displayRegister: function(){
            this.modals.vendorLogin = false;
            this.modals.vendorReg = !this.modals.vendorReg;
        },
        displayLogin: function(){
            let vendorRoute = localStorage.getItem("vendorUrl");
            if(vendorRoute){
                this.$router.push(`/${vendorRoute}`);
            }else{
                this.modals.vendorLogin = !this.modals.vendorLogin;
            }
        },
        closeModal: function(){
            this.modals.vendorReg = false;
            this.modals.vendorLogin = false;
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
.landingPage{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

h1{
    color: var(--text);
    font-size: 75px;
    margin: 35px;
}

p{
    font-size: 35px;
    margin: 15px;
    color: var(--text);
}

.vendEnter{
    color: var(--text);
    position: fixed;
    top: 35px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    right: 35px;
}

.actionButton{
    font-size: 35px;
    width: initial;
    padding: 5px;
}

@media screen and (max-width: 800px){
    h1{
        font-size: 45px;
        margin: 0 15px;
    }
}

@media screen and (max-width: 450px){
    h1{
        margin: 5px;
        font-size: 30px;
    }

    .vendEnter{
        font-size: 16px;
        font-weight: normal;
    }
}
</style>