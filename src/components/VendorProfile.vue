<template>
    <notification-banner
        v-show="banner.displayed"
        :type="banner.type"
        :message="banner.message"
    ></notification-banner>

    <div class="header">
        <h1>Your Profile</h1>

        <button class="actionButton">Save</button>
    </div>

    <form @submit.prevent="submit">
        <label>Name of Business/Owner
            <input type="text" v-model="compVendor.name"/>
        </label>

        <label>Email
            <input type="email" v-model="compVendor.email"/>
        </label>

        <label>Description
            <textarea v-model="compVendor.description"></textarea>
        </label>

        <label>Address
            <input type="text" v-model="compVendor.address.full"/>
        </label>

        <label>Your URL
            <input type="text" v-model="compVendor.url"/>
        </label>

        <label>Photos
            <input type="file"/>
        </label>

        <label>Business hours
            <input type="text"/>
        </label>
    </form>
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
    },

    methods: {
        submit(){
            fetch("/vendor", {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                },
                body: JSON.stringify({
                    name: this.compVendor.name,
                    email: this.compVendor.email,
                    url: this.compVendor.url,
                    description: this.compVendor.description,
                    address: this.compVendor.address
                })
            })
                .then(r=>r.json())
                .then((response)=>{
                    if(typeof(response) === "string"){
                        this.showBanner("error", response);
                    }else{
                        this.showBanner("success", "Profile data saved");
                    }
                })
                .catch((err)=>{
                    this.showBanner("error", "Something went wrong. Try refreshing the page");
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

.actionButton{
    padding: 5px;
    width: 125px;
}

form{
    display: flex;
    flex-direction: column;
    height: 90%;
    overflow-y: auto;
}

label{
    display: flex;
    flex-direction: column;
    margin: 10px;
    font-size: 12px;
}

input, textarea{
    font-size: 22px;
    width: 50%;
}
</style>