<template>
    <div class="productComp" :style="{background: style.secondaryColor, color: style.textColor}">
        <h2>{{product.name}}</h2>

        <div class="quantityDetails">
            <p class="quantity">{{product.quantity}}</p>

            <p class="unit">{{product.unit}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ["product", "style"]
}
</script>

<style scoped>
.productComp{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: var(--green);
    width: 100%;
    border-radius: 5px;
    margin: 15px 0;
    padding: 10px;
}

h2{
    font-weight: normal;
    width: 50%;
}

.quantityDetails{
    display: flex;
}

.quantityDetails p{
    font-size: 20px;
    margin: 0 3px;
}
</style>