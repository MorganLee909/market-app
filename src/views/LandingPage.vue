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

        <form class="searchBar" @submit.prevent="search()">
            <input type="text" ref="address" placeholder="ADDRESS" required/>

            <input type="number" min="1" step="1" ref="distance" value="25" required/>

            <select ref="unit" required>
                <option value="mi" default>Miles</option>
                <option value="km">Kilometers</option>
            </select>

            <input type="submit" style="display:none"/>
        </form>

        <button class="actionButton" @click="search">FIND LOCAL</button>

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

    mounted(){
        this.$refs.address.focus();
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
        search(){
            let address = this.$refs.address.value;
            let distance = this.$refs.distance.value;
            let unit = this.$refs.unit.value;

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

    .searchBar{
        background: white;
        padding: 15px;
    }

    input, select{
        font-size: 24px;
        background: white;
        border: none;
        outline: none;
    }

    input[type="number"]{
        width: 75px;
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

    .actionButton{
        font-size: 35px;
        width: initial;
        padding: 5px;
    }
</style>