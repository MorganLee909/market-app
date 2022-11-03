<template>
    <RouterView/>
</template>

<script setup>
import {RouterView} from "vue-router";
</script>

<style>
:root{
    --primaryColor: #d6d6d6;
    --secondaryColor: #8c8c8c;
    --text: #0b0909;
    --accent: #44444c;
    --alteredAccent: #707070;
}

*{
    margin: 0;
    padding: 0;
}

#app{
    background: var(--primaryColor);
    color: var(--text);
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
}

.pageLink{
    background: none;
    border: 3px solid var(--accent);
    border-radius: 5px;
    padding: 15px;
    color: var(--accent);
    text-decoration: none;
    font-size: 25px;
}

.pageLink:hover{
    border: 3px solid var(--alteredAccent);
    color: var(--alteredAccent);
}

.actionButton{
    font-size: 20px;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 5px;
    padding: 15px 0;
    width: 200px;
    margin: 15px;
    cursor: pointer;
    color: white;
    background: var(--accent);
    font-weight: bold;
    text-align: center;
    text-decoration: none;
}

.actionButton:hover{
    background: var(--alteredAccent);
}

.actionButton:active{
    background: none;
    color: var(--accent);
    border: 1px solid var(--accent);
}

.modal{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    z-index: 100;
    background: rgba(0, 0, 0, 0.35);
    position: fixed;
    top: 0;
    left: 0;
}

@media screen and (max-width: 800px){
    .actionButton{
        font-size: 16px;
        padding: 10px 0;
        box-shadow: 0 0 5px black;
    }
}
</style>