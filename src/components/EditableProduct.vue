<template>
    <div v-show="product.status !== 'removed'" class="product">
        <label>Name
            <input
                class="name"
                type="text"
                v-model="this.product.name"
                placeholder="NAME"
                @keydown="updateProduct"
            />
        </label>

        <label>Quantity
            <input
                type="number"
                v-model="this.product.quantity"
                min="0"
                step="0.01"
                @keydown="updateProduct"
            />
        </label>

        <label>Unit
            <input
                type="text"
                v-model="this.product.unit"
                placeholder="UNIT"
                @keydown="updateProduct"
            />
        </label>

        <svg @click="remove" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
            <path d="M8 12h8M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </div>
</template>

<script>
export default {
    props: ["product"],

    methods:{
        remove(){
            this.product.status = "removed";
        },
        updateProduct(){
            if(this.product.status !== "new") this.product.status = "updated";
        }
    }
}
</script>

<style scoped>
.product{
    display: flex;
    align-items: center;
    padding: 5px 15px;
    margin: 10px 0;
    background: var(--darkBrown);
    border-radius: 5px;
    width: 95%;
}

label{
    display: flex;
    flex-direction: column;
    color: var(--text);
    margin: 0 10px;
    font-size: 12px;
    padding-bottom: 10px;
}

input{
    font-size: 22px;
    width: 150px;
    border: none;
}

.name{
    width: 200px;
}

svg{
    margin-left: auto;
    cursor: pointer;
}
</style>