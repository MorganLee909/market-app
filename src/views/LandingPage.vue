<template>
    <div class="landingPage">
        <vendor-register v-if="modals.vendorReg" @closeModal="closeModal"></vendor-register>

        <button class="loginReg" @click="displayRegister">Register</button>

        <h1>Local Market</h1>

        <p>Find Local</p>

        <p>Shop Local</p>

        <p>Buy Local</p>

        <RouterLink class="actionButton" to="/second">Search Locally</RouterLink>
    </div>
</template>

<script>
export default {
    data(){
        return {
            modals: {
                vendorReg: false
            }
        }
    },
    methods: {
        displayRegister: function(){
            this.modals.vendorReg = !this.modals.vendorReg;
        },
        closeModal: function(){
            this.modals.vendorReg = false
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

    .loginReg{
        color: var(--text);
        position: fixed;
        top: 35px;
        right: 35px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        font-weight: bold;
    }
</style>