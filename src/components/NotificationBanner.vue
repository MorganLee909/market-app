<template>
    <div>
        <p :class="type">{{ message }}</p>
    </div>
</template>

<script>
export default {
    props: ["type", "message"]
}
</script>

<style scoped>
    div{
        display: flex;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 200;
        box-sizing: border-box;
        height: 50px;
        width: 100vw;
        margin: 15px 0;
    }

    p{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 750px;
        height: 100%;
        font-weight: bold;
        border-radius: 5px;
        color: var(--text);
    }

    .error{
        background: rgb(252, 80, 80);
    }

    .success{
        background: rgb(10, 158, 0);
    }
</style>