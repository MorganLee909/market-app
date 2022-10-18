<template>
    <notification-banner
        v-show="banner.displayed"
        :type="banner.type"
        :message="banner.message"
    ></notification-banner>

    <div class="header">
        <h1>Your Products</h1>

        <div class="actions">
            <button class="actionButton newProductBtn" @click="newProduct">New</button>

            <button class="actionButton" @click="submit">Save</button>
        </div>
    </div>

    <form @submit="submit">    
        <editable-product
            v-for="product in products"
            :product="product"
        ></editable-product>
    </form>
</template>

<script>
import EditableProduct from "./EditableProduct.vue";

export default {
    components: {
        EditableProduct
    },

    props: ["products"],

    data(){
        return {
            banner: {
                displayed: false,
                type: "",
                message: ""
            }
        }
    },

    methods: {
        submit(){
            event.preventDefault();

            let created = [];
            let updated = [];
            let removed = [];

            for(let i = 0; i < this.products.length; i++){
                if(this.products[i].status === "new"){
                    created.push(this.products[i]);
                }else if(this.products[i].status === "updated"){
                    updated.push(this.products[i]);
                }else if(this.products[i].status === "removed"){
                    removed.push(this.products[i]._id);
                }
            }

            let headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            };

            let create = fetch("http://localhost:8000/product", {
                method: "post",
                headers: headers,
                body: JSON.stringify({products: created})
            });
            let remove = fetch("http://localhost:8000/product", {
                method: "delete",
                headers: headers,
                body: JSON.stringify({products: removed})
            });

            Promise.all([create, remove])
                .then(r=>r.map(r=>r.json()))
                .then((response)=>{
                    if(typeof(response) === "string"){
                        this.showBanner("error", response);
                    }else{                        
                        return fetch("http://localhost:8000/product", {
                            method: "put",
                            headers: headers,
                            body: JSON.stringify({products: updated})
                        });
                    }
                })
                .then((response)=>{
                    if(typeof(response) === "string"){
                        this.showBanner("error", response);
                    }else{

                    }
                })
                .catch((err)=>{
                    this.showBanner("error", "Something went Wrong. Please try refreshing the page.");
                });
        },
        newProduct(){
            this.products.unshift({
                name: "",
                unit: "",
                quantity: 0,
                status: "new"
            });
        },
        showBanner(type, message){
            this.banner.type = type;
            this.banner.message = message;
            this.banner.displayed = true;

            setTimeout(()=>{this.banner.displayed = false}, 5000);
        }
    }
}
</script>

<style scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10%;
}

.newProductBtn{
    background: var(--green);
}

.newProductBtn:hover{
    background: var(--alteredGreen);
}

.newProductBtn:active{
    background: none;
    color: var(--green);
    border: 1px solid var(--green);
}

.actionButton{
    padding: 5px;
    width: 125px;
}

form{
    height: 90%;
    overflow-y: auto;
}
</style>