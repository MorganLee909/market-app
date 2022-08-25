<template>

</template>

<script>
export default {
    created(){
        fetch("http://localhost:8000/vendor/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: "me@leemorgan.io",
                password: "leerobertmorgan"
            })
        })
            .then(r=>r.json())
            .then((r)=>{
            })
            .catch((err)=>{
                console.error(err);
            })
    }
}
</script>