<template>
    <a class="vendor" :href="'/' + vendor.url">
        <h2>{{vendor.name}}</h2>
        <p v-if="vendor.email">{{vendor.email}}</p>

        <div class="address">
            <p v-if="vendor.address?.streetNumber">{{vendor.address.streetNumber}}</p>

            <p v-if="vendor.address?.road">{{vendor.address.road}},</p>

            <p v-if="vendor.address?.city">{{vendor.address.city}},</p>

            <p v-if="vendor.address?.state">{{vendor.address.state}}</p>
        </div>
    </a>
</template>

<script>
export default {
    props: ["vendor"]
}
</script>

<style scoped>
.vendor{
    display: flex;
    align-items: center;
    background: var(--secondaryColor);
    color: var(--text);
    text-decoration: none;
    margin: 35px 0;
    padding: 15px;
    width: 100%;
}

.vendor:hover{
    box-shadow: 0 0 5px white;
}

.vendor > *{
    margin: 15px;
}

.address{
    display: flex;
}

.address > *{
    margin-left: 5px;
}

@media screen and (max-width: 800px){
    .vendor{
        flex-direction: column;
        min-width: 500px;
        box-sizing: border-box;
    }

    .vendor > *{
        margin: 5px 0;
    }
}

@media screen and (max-width: 500px){
    .vendor{
        min-width: 0;
        width: 100%;
    }
}
</style>