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

        <form class="searchBar" @submit.prevent="search()">
            <input type="text" ref="address" placeholder="ADDRESS" required/>

            <div class="distanceContainer">
                <input type="number" min="1" step="1" ref="distance" value="25" required/>

                <select ref="unit" required>
                    <option value="mi" default>Miles</option>
                    <option value="km">Kilometers</option>
                </select>
            </div>
                
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
            console.log("something");
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
        search(){
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

.searchBar{
    display: flex;
    background: white;
    padding: 15px;
    border: 2px solid var(--secondaryColor);
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

    .searchBar{
        display: flex;
        flex-direction: column;
        align-items: center;
        background: none;
        border: none;
    }

    .searchBar > *{
        margin: 15px 0;
    }
}

@media screen and (max-width: 450px){
    h1{
        margin: 5px;
        font-size: 30px;
    }

    input, select{
        font-size: 20px;
        height: 50px;
    }

    input[type="text"]{
        padding: 5px 10px;
        box-sizing: border-box;
    }

    .vendEnter{
        font-size: 16px;
        font-weight: normal;
    }
}
</style>