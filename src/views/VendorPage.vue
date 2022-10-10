<template>
    <h1>{{vendor.name}}</h1>

    <!-- <h2>{{vendor.address.full}}</h2> -->
</template>

<script>
export default {
    data(){
        return {
            vendor: {}
        }
    },

    created(){
        let token = localStorage.getItem("jwt");
        let headers = {"Content-Type": "application/json"};
        if(token !== null) headers["Authorization"] = `Bearer ${token}`;

        fetch(`http://localhost:8000/vendor${document.location.pathname}`, {
            method: "get",
            headers: headers,
        })
            .then(r=>r.json())
            .then((vendor)=>{
                this.vendor = vendor;
            })
            .catch((err)=>{
                console.error(err);
            });
    }
}
</script>