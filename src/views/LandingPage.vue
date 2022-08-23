<template>
    <div class="landingPage">
        <RouterLink class="vendorLogin" to='/vendor'>Login</RouterLink>

        <h1>Local Market</h1>

        <p>Find Local</p>

        <p>Shop Local</p>

        <p>Buy Local</p>

        <RouterLink class="pageLink" to="/second">Search Locally</RouterLink>
    </div>
</template>

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
        color: #d05663;
        font-size: 75px;
        margin: 35px;
    }

    p{
        font-size: 35px;
        margin: 15px;
    }

    .vendorLogin{
        color: #c3cbd6;
        text-decoration: none;
        position: fixed;
        top: 35px;
        right: 35px;
    }
</style>