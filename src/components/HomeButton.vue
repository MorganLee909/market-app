<template>
    <a href="/">
        <svg class="one" width="30px" height="30px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
            <path d="M3 9.5L12 4l9 5.5M19 13v6.4a.6.6 0 01-.6.6H5.6a.6.6 0 01-.6-.6V13" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
</template>

<script>
export default {
    props: ["color"]
}
</script>

<style scoped>
    a{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 35px;
        left: 35px;
        cursor: pointer;
    }

    svg{
        position: absolute;
        top: 0;
        left: 0;
    }
</style>