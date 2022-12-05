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

    <form ref="products" @submit="submit">
        <editable-product
            v-for="product in compProducts"
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

    emits: ["updateProducts"],

    props: ["products"],

    data(){
        return {
            banner: {
                displayed: false,
                type: "",
                message: ""
            },
            compProducts: JSON.parse(JSON.stringify(this.products))
        }
    },

    methods: {
        submit(){
            event.preventDefault();

            let created = [];
            let updated = [];
            let removed = [];

            for(let i = 0; i < this.compProducts.length; i++){
                if(this.compProducts[i].status === "new"){
                    created.push(this.compProducts[i]);
                }else if(this.compProducts[i].status === "updated"){
                    updated.push(this.compProducts[i]);
                }else if(this.compProducts[i].status === "removed"){
                    removed.push(this.compProducts[i]._id);
                }
            }

            fetch(`${this.$apiRoute}/vendor/product`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                },
                body: JSON.stringify({
                    create: created,
                    update: updated,
                    remove: removed
                })
            })
                .then(r=>r.json())
                .then((response)=>{
                    if(typeof(response) === "string"){
                        this.showBanner("error", response);
                    }else{
                        this.$emit("updateProducts", response);
                        this.showBanner("success", "Products saved");
                    }
                })
                .catch((err)=>{
                    this.showBanner("error", "Something went wrong. Try refreshing the page");
                });
        },
        newProduct(){
            this.compProducts.unshift({
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
    background: var(--secondaryColor);
}

.newProductBtn:hover{
    background: none;
    color: var(--secondaryColor);
    border: 2px solid var(--secondaryColor);
}

.newProductBtn:active{
    border: 1px solid var(--secondaryColor);
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