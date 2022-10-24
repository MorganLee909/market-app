<template>
    <notification-banner
        v-show="banner.displayed"
        :type="banner.type"
        :message="banner.message"
    ></notification-banner>

    <div class="header">
        <h1>Privacy Settings</h1>

        <button class="actionButton" @click="submit">Save</button>
    </div>

    <h2>Checked items will be publicly displayed to users</h2>

    <label>
        <input type="checkbox" v-model="this.compVendor.publicData.email"/>
        Email
    </label>

    <label>
        <input type="checkbox" v-model="this.compVendor.publicData.searchable"/>
        Searchable
        <span class="explain"> *Determines whether users can find your link through search. Does not share address.</span>
    </label>

    <h3>Address <span class="explain">*Determines whether address components are displayed on your main page.</span></h3>

    <label>
        <input type="checkbox" v-model="this.compVendor.publicData.state"/>
        State
    </label>

    <label>
        <input type="checkbox" v-model="this.compVendor.publicData.country"/>
        County
    </label>

    <label>
        <input type="checkbox" v-model="this.compVendor.publicData.city"/>
        City
    </label>

    <label>
        <input type="checkbox" v-model="this.compVendor.publicData.road"/>
        Road
    </label>

    <label>
        <input type="checkbox" v-model="this.compVendor.publicData.streetNumber"/>
        Street Number
    </label>
</template>

<script>
export default {
    props: ["vendor"],

    data(){
        return {
            banner: {
                displayed: false,
                type: "",
                message: ""
            },
            compVendor: this.vendor
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

.actionButton{
    padding: 5px;
    width: 125px;
}

h2{
    margin-bottom: 35px;
}

label{
    display: flex;
    align-items: center;
    font-size: 24px;
    margin: 15px;
}

.explain{
    font-size: 14px;
    padding-left: 5px;
    font-weight: normal;
}
</style>