<script setup>
import {RouterView} from "vue-router";
</script>

<template>
    <RouterView/>
</template>

<style>
    *{
        margin: 0;
        padding: 0;
    }

    #app{
        background: #2a403d;
        color: #c3cbd6;
        height: 100vh;
        width: 100vw;
        box-sizing: border-box;
    }

    .pageLink{
        background: #d05663;
        border: none;
        border-radius: 5px;
        padding: 15px;
        color: #c3cbd6;
        text-decoration: none;
        font-size: 25px;
        box-shadow: 0 3px 3px black;
    }

    .pageLink:hover{
        background: #eb5663;
    }

    .pageLink:active{
        box-shadow: 0 0 0 black;
        transform: translate(-1px, 2px);
    }
</style>