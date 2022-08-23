<template>
    
</template>

<script>
export default {
    created(){
        fetch("localhost:8000/api/vendor/630377215ea36953f62f8091")
            .then(r=>r.json())
            .then((vendor)=>{
                console.log(vendor);
            })
            .catch((err)=>{
                console.error(err);
            });
    }
}
</script>