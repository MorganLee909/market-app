<template>
    <RouterView/>
</template>

<script setup>
import {RouterView} from "vue-router";
</script>

<style>
:root{
    --text: rgb(247, 244, 239);
    --textOnWhite: rgb(48, 66, 96);
    --yellow: rgb(254, 170, 0); /* highlited text and buttons*/
    --alteredYellow: rgb(225, 150, 0); /* for hovering buttons */
    --green: rgb(120, 132, 2);
    --darkBrown: rgb(52, 38, 40); /* usually the background */
}

*{
    margin: 0;
    padding: 0;
}

#app{
    background: var(--darkBrown);
    color: var(--text);
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
}

.pageLink{
    background: none;
    border: 3px solid var(--yellow);
    border-radius: 5px;
    padding: 15px;
    color: var(--yellow);
    text-decoration: none;
    font-size: 25px;
}

.pageLink:hover{
    border: 3px solid var(--alteredYellow);
    color: var(--alteredYellow);
}

.actionButton{
    font-size: 20px;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 5px;
    padding: 15px 0;
    width: 200px;
    margin: 15px;
    cursor: pointer;
    color: var(--text);
    background: var(--yellow);
    font-weight: bold;
    text-align: center;
    text-decoration: none;
}

.actionButton:hover{
    background: var(--alteredYellow);
}

.actionButton:active{
    background: none;
    color: var(--yellow);
    border: 1px solid var(--yellow);
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
</style>