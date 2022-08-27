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
        ></vendor-login>

        <notification-banner
            v-show="banner.displayed"
            :type="banner.type"
            :message="banner.message"
        ></notification-banner>

        <button class="vendEnter login" @click="displayLogin">Login</button>
        <button class="vendEnter reg" @click="displayRegister">Register</button>

        <h1>Local Market</h1>

        <p>Find Local</p>

        <p>Shop Local</p>

        <p>Buy Local</p>
    </div>
</template>

<script>
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
    methods: {
        displayRegister: function(){
            this.modals.vendorReg = !this.modals.vendorReg;
        },
        displayLogin: function(){
            this.modals.vendorLogin = !this.modals.vendorLogin;
        },
        closeModal: function(){
            this.modals.vendorReg = false;
            this.modals.vendorLogin = false;
        },
        showBanner: function(type, message){
            this.banner.type = type;
            this.banner.message = message;
            this.banner.displayed = true;

            setTimeout(this.hideBanner, 5000);
        },
        hideBanner: function(){
            this.banner.displayed = false;
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
        color: var(--yellow);
        font-size: 75px;
        margin: 35px;
    }

    p{
        font-size: 35px;
        margin: 15px;
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
    }

    .login{
        right: 135px;
    }

    .reg{
        right: 35px;
    }
</style>