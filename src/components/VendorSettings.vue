<template>
    <div class="background">
        <div class="container">
            <svg @click="$emit('closeSettings')" class="closeSettings" width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM15 16L9 8M9 16l6-8" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>

            <div class="optionPanel">
                <button 
                    @click="settingsOption('products')"
                    class="option"
                    ref="productsButton"
                    :class="currentSetting === 'products' ? 'chosen' : ''"
                >
                    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                        <path d="M4.508 20h14.984a.6.6 0 00.592-.501l1.8-10.8A.6.6 0 0021.292 8H2.708a.6.6 0 00-.592.699l1.8 10.8a.6.6 0 00.592.501z" stroke-width="1.5"></path>
                        <path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" stroke-width="1.5"></path>
                    </svg>

                    <p>Products</p>
                </button>

                <button
                    @click="settingsOption('profile')"
                    class="option"
                    ref="profileButton"
                    :class="currentSetting === 'profile' ? 'chosen' : ''"
                >
                    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 100-6 3 3 0 000 6z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>

                    <p>Profile</p>
                </button>

                <button
                    @click="settingsOption('privacy')"
                    class="option"
                    ref="privacyButton"
                    :class="currentSetting === 'privacy' ? 'chosen' : ''"
                >
                    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                        <path d="M16 12h1.4a.6.6 0 01.6.6v6.8a.6.6 0 01-.6.6H6.6a.6.6 0 01-.6-.6v-6.8a.6.6 0 01.6-.6H8m8 0V8c0-1.333-.8-4-4-4S8 6.667 8 8v4m8 0H8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                
                    <p>Privacy</p>
                </button>

                <button
                    @click="settingsOption('style')"
                    class="option"
                    ref="styleButton"
                    :class="currentSetting === 'style' ? 'chosen' : ''"
                >
                    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                        <path d="M4 4v16h16M20.01 16l-.011.01M20.01 12l-.011.01M20.01 8l-.011.01M20.01 4l-.011.01M8.01 4l-.011.01M12.01 4l-.011.01M16.01 4l-.011.01" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>

                    <p>Style</p>
                </button>

                <button
                    @click="logout"
                    class="option"
                >
                    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                        <path d="M12 12h7m0 0l-3 3m3-3l-3-3M19 6V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>

                    <p>Logout</p>
                </button>
            </div>

            <div class="settingsDisplayBlock">
                <edit-products
                    v-if="currentSetting === 'products'"
                    :products="this.compVendor.products"
                    @updateProducts="updateProducts"
                ></edit-products>

                <vendor-profile
                    v-if="currentSetting === 'profile'"
                    :vendor="this.compVendor"
                ></vendor-profile>

                <vendor-privacy
                    v-if="currentSetting === 'privacy'"
                    :vendor="this.compVendor"
                    @updateVendor="this.updateVendor"
                ></vendor-privacy>

                <vendor-style
                    v-if="currentSetting === 'style'"
                    :style="this.vendor.style"
                    @updateStyle="this.updateStyle"
                ></vendor-style>
            </div>
        </div>
    </div>
</template>

<script>
import EditProducts from "./EditProducts.vue";
import VendorProfile from "./VendorProfile.vue";
import VendorPrivacy from "./VendorPrivacy.vue";
import VendorStyle from "./VendorStyle.vue";

export default {
    components: {
        EditProducts,
        VendorProfile,
        VendorPrivacy,
        VendorStyle
    },

    props: ["vendor"],

    emits: ["updateVendor", "closeSettings"],

    data(){
        return {
            currentSetting: "products",
            compVendor: this.vendor
        }
    },
    
    methods: {
        updateProducts(products){
            this.compVendor.products = products;
            this.$emit("updateVendor", this.compVendor);
        },
        updateStyle(style){
            this.compVendor.style = style;
            this.$emit("updateVendor", this.compVendor);
        },
        updateVendor(vendor){
            this.compVendor = vendor;
            this.$emit("updateVendor", this.compVendor);
        },
        settingsOption(setting){
            this.currentSetting = setting;
        },
        logout(){
            localStorage.setItem("jwt", "");
            this.$router.push("/");
        }
    }
}
</script>

<style scoped>
.background{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.75);
    z-index: 50;
}

.container{
    display: flex;
    background: white;
    position: relative;
    height: 75%;
    width: 75%;
    padding: 35px 35px 35px 0;
    color: black;
}

.closeSettings{
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
}

.optionPanel{
    flex-basis: 200px;
    flex-grow: 0;
    margin-top: -35px;
}

.option{
    display: flex;
    align-items: center;
    height: 50px;
    border: 1px solid black;
    background: none;
    width: 100%;
    font-weight: bold;
    font-size: 20px;
    transition: background-color 0.3s;
    cursor: pointer;
}

.option path{
    stroke: rgb(0, 0, 0);
}

.option:hover{
    background-color: rgb(225, 225, 225);
}

.option.chosen{
    background: black;
    color: white;
    cursor: default;
}

.option.chosen path{
    stroke: rgb(255, 255, 255);
}

.option svg{
    margin: 15px;
}

.settingsDisplayBlock{
    flex-basis: 200px;
    flex-grow: 1;
    padding: 35px;
    box-sizing: border-box;
}
</style>