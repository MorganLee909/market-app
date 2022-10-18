<template>
    <div class="background">
        <div class="container">
            <svg @click="$emit('closeSettings')" class="closeSettings" width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM15 16L9 8M9 16l6-8" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>

            <div class="optionPanel">
                <button class="option chosen">
                    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                        <path d="M4.508 20h14.984a.6.6 0 00.592-.501l1.8-10.8A.6.6 0 0021.292 8H2.708a.6.6 0 00-.592.699l1.8 10.8a.6.6 0 00.592.501z" stroke-width="1.5"></path>
                        <path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2" stroke-width="1.5"></path>
                    </svg>

                    <p>Edit Products</p>
                </button>
            </div>

            <div class="settingsDisplayBlock">
                <edit-products
                    v-if="currentSetting === 'editProducts'"
                    :products="this.compVendor.products"
                    @updateProducts="updateProducts"
                ></edit-products>
            </div>
        </div>
    </div>
</template>

<script>
import EditProducts from "./EditProducts.vue";

export default {
    components: {
        EditProducts
    },

    props: ["vendor"],

    emits: ["updateVendor"],

    data(){
        return {
            currentSetting: "editProducts",
            compVendor: this.vendor
        }
    },
    
    methods: {
        updateProducts(products){
            this.compVendor.products = products;
            this.$emit("updateVendor", this.compVendor);
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